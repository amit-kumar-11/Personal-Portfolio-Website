import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface DarkModeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, toggle }) => {
  return (
    <motion.button
      onClick={toggle}
      className="relative w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className="w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: isDark ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          animate={{
            rotate: isDark ? 180 : 0,
            scale: isDark ? 0.8 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon size={14} className="text-gray-700" />
          ) : (
            <Sun size={14} className="text-yellow-500" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};