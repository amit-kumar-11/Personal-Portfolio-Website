import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      setIsVisible(true);
    };

    const mouseLeave = () => setIsVisible(false);
    const mouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mouseenter', mouseEnter);

    // Add cursor variant listeners
    const addCursorListeners = () => {
      // Hover effects for interactive elements
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]');
      const textElements = document.querySelectorAll('h1, h2, h3, p, span, [data-cursor="text"]');
      const projectCards = document.querySelectorAll('[data-cursor="project"]');

      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('hover'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      textElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('text'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      projectCards.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('project'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    // Delay to ensure DOM is ready
    setTimeout(addCursorListeners, 100);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseenter', mouseEnter);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'rgba(0, 255, 65, 0.1)',
      border: '2px solid rgba(0, 255, 65, 0.5)',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(0, 255, 65, 0.2)',
      border: '2px solid rgba(0, 255, 65, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    text: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 16,
      scaleX: 0.1,
      scaleY: 1,
      backgroundColor: 'rgba(0, 255, 65, 0.8)',
      border: 'none',
      mixBlendMode: 'difference' as const,
    },
    project: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2,
      backgroundColor: 'rgba(0, 255, 65, 0.1)',
      border: '3px solid rgba(0, 255, 65, 1)',
      mixBlendMode: 'difference' as const,
    }
  };

  // Hide on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
      
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden md:block"
        variants={variants}
        animate={cursorVariant}
        initial="default"
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Cursor trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
        style={{
          opacity: isVisible ? 0.6 : 0,
        }}
      />
    </>
  );
};