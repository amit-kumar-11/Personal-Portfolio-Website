import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CustomCursor } from './components/CustomCursor';
import { MagneticButton } from './components/MagneticButton';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useDarkMode } from './hooks/useDarkMode';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Download,
  ArrowDown,
  Code,
  Palette,
  Zap,
  Coffee,
  MapPin,
  Calendar
} from 'lucide-react';

// Rotating Text Component
const RotatingText = ({ phrases }: { phrases: string[] }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <div className="h-12 sm:h-16 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhrase}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-gray-600 dark:text-gray-400 transition-colors"
        >
          {phrases[currentPhrase]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Scroll Indicator Component
const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center text-gray-400 dark:text-gray-500"
      >
        <span className="text-xs sm:text-sm mb-2">Scroll to explore</span>
        <ArrowDown size={16} className="sm:w-5 sm:h-5" />
      </motion.div>
    </motion.div>
  );
};

// Section Wrapper with Animation
const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 group"
      data-cursor="project"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base transition-colors">{project.subtitle}</p>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full transition-colors flex-shrink-0">
          {project.year}
        </span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base transition-colors">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {project.techStack.map((tech: string) => (
          <span 
            key={tech}
            className="px-2 sm:px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs sm:text-sm font-medium transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-3 sm:gap-4">
        <MagneticButton
          href={project.links.github}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm sm:text-base"
        >
          <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Code</span>
        </MagneticButton>
        <MagneticButton
          href={project.links.live}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm sm:text-base"
        >
          <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden xs:inline">Live Demo</span>
          <span className="xs:hidden">Demo</span>
        </MagneticButton>
      </div>
    </motion.div>
  );
};

// Skill Category Component
const SkillCategory = ({ category, index }: { category: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl dark:shadow-gray-900/50 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">{category.icon}</span>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white transition-colors">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill: string) => (
          <motion.span
            key={skill}
            whileHover={{ scale: 1.05 }}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium cursor-pointer transition-all
              ${category.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50' :
                category.color === 'green' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50' :
                'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50'}`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

// Experience Item Component
const ExperienceItem = ({ experience, index }: { experience: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative pl-6 sm:pl-8 pb-8 sm:pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-2 w-3 sm:w-4 h-3 sm:h-4 bg-green-500 dark:bg-green-400 rounded-full"></div>
      <div className="absolute left-1.5 sm:left-2 top-5 sm:top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 last:hidden"></div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl dark:shadow-gray-900/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white transition-colors">{experience.role}</h3>
            <p className="text-green-600 dark:text-green-400 font-medium text-sm sm:text-base transition-colors">{experience.company}</p>
          </div>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full transition-colors flex-shrink-0 ml-2">
            {experience.period}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base transition-colors">{experience.description}</p>
      </div>
    </motion.div>
  );
};

// Main App Component
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    setIsLoaded(true);
    
    // Console message for developers
    console.log(`
🚀 Hey fellow developer! 
👀 Checking out the code? I like your style!
💼 Want to work together? 
📧 Drop me a line: imamit0311@gmail.com
⭐ Star this project: github.com/amit-kumar-11/portfolio
    `);
  }, []);

  const heroTaglines = [
    "I build React apps and enjoy solving complex problems",
    "Thought I'd be debugging forever, now I architect solutions", 
    "Frontend developer, coffee enthusiast, and optimization geek"
  ];

  const projects = [
    {
      title: "AI Resume Builder",
      subtitle: "Intelligent Resume Generation",
      description: "AI-powered resume creation with real-time preview and ATS optimization. Features include intelligent suggestions, multiple templates, and professional formatting.",
      techStack: ["React", "Vite", "CSS", "AI API"],
      year: "2024",
      links: {
        github: "https://github.com/amit-kumar-11/AIRESUMEBuilder",
        live: "https://ai-resume-builder-one-neon.vercel.app/"
      }
    },
    {
      title: "E-Commerce Platform",
      subtitle: "Full-Stack Shopping Experience", 
      description: "Complete e-commerce solution with user authentication, product management, shopping cart, and payment integration.",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      year: "2024",
      links: {
        github: "https://github.com/amit-kumar-11/E-commerce-Store",
        live: "https://e-commerce-store-nu-red.vercel.app/"
      }
    },
    {
      title: "Smart Home Dashboard",
      subtitle: "IoT Control Interface",
      description: "Intuitive dashboard for controlling smart home devices with real-time status updates and automation rules.",
      techStack: ["React", "TypeScript", "IoT APIs", "Chart.js"],
      year: "2024",
      links: {
        github: "https://github.com/amit-kumar-11/Smart-Home-Dashboard",
        live: "https://smart-home-dashboard-beta.vercel.app/"
      }
    },
    {
      title: "Weather App",
      subtitle: "Real-Time Climate Insights",
      description: "Beautiful weather application with detailed forecasts, interactive maps, and location-based recommendations.",
      techStack: ["React", "Weather API", "CSS", "Geolocation"],
      year: "2024",
      links: {
        github: "https://github.com/amit-kumar-11/Weather-App",
        live: "https://weather-app-ten-pi-11.vercel.app/"
      }
    },
    {
      title: "Trip Planner",
      subtitle: "Adventure Organization Tool",
      description: "Comprehensive trip planning application with itinerary management, budget tracking, and collaboration features.",
      techStack: ["React", "Firebase", "Maps API", "Tailwind"],
      year: "2024",
      links: {
        github: "https://github.com/amit-kumar-11/Trip-Planner",
        live: "https://trip-planner-orcin-beta.vercel.app/"
      }
    },
    {
      title: "Quiz Platform",
      subtitle: "Interactive Learning System",
      description: "Educational quiz platform with real-time scoring, progress tracking, and adaptive difficulty adjustment.",
      techStack: ["React", "Python", "PostgreSQL", "WebSocket"],
      year: "2024",
      links: {
        github: "https://github.com/amit-kumar-11/online-quiz-platform",
        live: "https://online-quiz-platform-mu.vercel.app/"
      }
    },
    {
      title: "100 Years Calendar", 
      subtitle: "Time Navigation Interface",
      description: "Unique calendar application spanning 100 years with event management and historical date exploration.",
      techStack: ["React", "Date-fns", "CSS Grid", "Local Storage"],
      year: "2023",
      links: {
        github: "https://github.com/amit-kumar-11/100_Year-s_calander",
        live: "https://100-year-s-calander.vercel.app/"
      }
    },
    {
      title: "Historical Timeline",
      subtitle: "Interactive History Explorer",
      description: "Visual timeline of historical events with interactive exploration and detailed event information.",
      techStack: ["React", "D3.js", "API Integration", "Animation"],
      year: "2023",
      links: {
        github: "https://github.com/amit-kumar-11/MileStones-That_Made_History",
        live: "https://mile-stones-that-made-history.vercel.app/"
      }
    }
  ];

  const skillCategories = [
    {
      title: "Frontend Mastery",
      skills: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "Next.js", "Framer Motion"],
      icon: "⚛️",
      color: "blue"
    },
    {
      title: "Backend Expertise", 
      skills: ["Python", "Java", "Node.js", "REST APIs", "Database Design"],
      icon: "🔧",
      color: "green"
    },
    {
      title: "Development Tools",
      skills: ["Git", "Vite", "VS Code", "Figma", "Chrome DevTools"],
      icon: "🛠️",
      color: "purple"
    }
  ];

  const experiences = [
    {
      role: "Frontend Developer",
      company: "Nexforge Studio", 
      period: "Feb 2025 – Present",
      description: "Contributing to digital craftsmanship agency, creating web applications and social media tools with end-to-end full-stack development."
    },
    {
      role: "Full Stack Developer",
      company: "Byteforge Titans",
      period: "Jan 2025 – Present", 
      description: "Working on impactful projects across AI, Web3, IoT, and full-stack innovations with a dynamic tech team."
    },
    {
      role: "Java Developer Intern",
      company: "Codec Technologies",
      period: "June – July 2024",
      description: "Built backend modules and systems using Java and JDBC during intensive one-month hands-on internship program."
    },
    {
      role: "Frontend Developer Intern",
      company: "CodeAlpha",
      period: "July – August 2024",
      description: "Specialized in responsive UI development with React and Tailwind CSS. Received Letter of Recommendation and certificate for outstanding contribution."
    }
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full dark:border-green-400"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
          >
            <span className="text-gray-900 dark:text-white transition-colors">Amit</span>
            <span className="text-green-500 dark:text-green-400">.</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
              <MagneticButton
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors font-medium text-sm lg:text-base"
              >
                {item}
              </MagneticButton>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <DarkModeToggle isDark={isDark} toggle={toggle} />
            <MagneticButton
              href="mailto:imamit0311@gmail.com"
              className="bg-green-500 dark:bg-green-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-green-600 dark:hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Let's Talk</span>
              <span className="sm:hidden">Talk</span>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.span 
                className="block text-gray-900 dark:text-white transition-colors"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Hi, I'm
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-green-500 via-green-400 to-blue-500 dark:from-green-400 dark:via-green-300 dark:to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Amit
              </motion.span>
            </motion.h1>
            
            <motion.div 
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl mt-6 sm:mt-8 max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <RotatingText phrases={heroTaglines} />
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <MagneticButton
                href="#projects"
                className="bg-green-500 dark:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-green-600 dark:hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-center"
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                href="/resume.pdf"
                className="border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-all flex items-center justify-center gap-2"
              >
                <Download size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Download Resume</span>
                <span className="xs:hidden">Resume</span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
        
        <ScrollIndicator />
        
        {/* Background Elements */}
        <motion.div
          className="absolute top-1/2 right-4 sm:right-10 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-green-500 dark:bg-green-400 rounded-full opacity-10 dark:opacity-20"
          animate={{ y: [0, -20, 0], rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-4 sm:left-10 w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-blue-500 dark:bg-blue-400 rounded-full opacity-10 dark:opacity-20"
          animate={{ y: [0, 20, 0], rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </section>

      {/* About Section */}
      <Section id="about" className="bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 transition-colors leading-tight">
              DEVELOPER
              <br />
              <span className="text-green-500 dark:text-green-400">&</span> INNOVATOR
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              data-cursor="text"
            >
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 transition-colors">
                From Computer Science student to Full-Stack innovator, I'm passionate about creating 
                digital experiences that users love. Currently exploring AI integration, advanced 
                React patterns, and Web3 technologies.
              </p>
              
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 sm:mb-8 transition-colors">
                I believe in writing clean, maintainable code and creating interfaces that are both 
                beautiful and functional. When I'm not coding, you'll find me exploring new technologies, 
                contributing to open source, or enjoying a perfect cup of coffee and more important sleeping also.
              </p>
              
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4 xs:gap-6 text-gray-600 dark:text-gray-400 transition-colors">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>West Bengal, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee size={18} />
                  <span>Coffee Enthusiast</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 sm:p-8 transition-colors duration-300"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 transition-colors">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-500 dark:text-green-400">15+</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-colors">Projects Built</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-500 dark:text-green-400">2+</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-colors">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-500 dark:text-green-400">5+</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-colors">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-500 dark:text-green-400">∞</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-colors">Cups of Coffee</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 transition-colors leading-tight">
              DIGITAL
              <br />
              <span className="text-green-500 dark:text-green-400">CREATIONS</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors">
              A selection of projects that showcase my passion for creating exceptional user experiences
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section className="bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 transition-colors leading-tight">
              TECHNICAL
              <br />
              <span className="text-green-500 dark:text-green-400">ARSENAL</span>
            </h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((category, index) => (
              <SkillCategory key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 transition-colors leading-tight">
              PROFESSIONAL
              <br />
              <span className="text-green-500 dark:text-green-400">JOURNEY</span>
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto px-2 sm:px-0">
            {experiences.map((experience, index) => (
              <ExperienceItem key={experience.company} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-gray-900 dark:bg-black text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight">
              LET'S BUILD
              <br />
              <span className="text-green-500 dark:text-green-400">TOGETHER</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 max-w-3xl mx-auto">
              Ready to turn your ideas into reality? Let's create something amazing together.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800 dark:bg-gray-800 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send a Message</h3>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors"
                    data-cursor="text"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors"
                    data-cursor="text"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Project Type"
                  className="w-full bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors"
                  data-cursor="text"
                />
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-colors resize-none"
                  data-cursor="text"
                />
                <MagneticButton
                  type="submit"
                  className="w-full bg-green-500 dark:bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                >
                  Send Message
                </MagneticButton>
              </form>
            </motion.div>
            
            {/* Contact Info & Spotify */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Contact Links */}
              <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <MagneticButton
                    href="mailto:imamit0311@gmail.com"
                    className="flex items-center gap-3 sm:gap-4 text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-all text-sm sm:text-base"
                  >
                    <Mail size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>imamit0311@gmail.com</span>
                  </MagneticButton>
                  <MagneticButton
                    href="tel:+919523690955"
                    className="flex items-center gap-3 sm:gap-4 text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-all text-sm sm:text-base"
                  >
                    <Phone size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>+91 9523690955</span>
                  </MagneticButton>
                  <MagneticButton
                    href="https://github.com/amit-kumar-11"
                    className="flex items-center gap-3 sm:gap-4 text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-all text-sm sm:text-base"
                  >
                    <Github size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>GitHub Profile</span>
                  </MagneticButton>
                  <MagneticButton
                    href="https://www.linkedin.com/in/amitkumarfd03"
                    className="flex items-center gap-3 sm:gap-4 text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-all text-sm sm:text-base"
                  >
                    <Linkedin size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>LinkedIn Profile</span>
                  </MagneticButton>
                </div>
              </div>
              
              {/* Spotify Embed - Personal Touch */}
              <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Currently Vibing To</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Music fuels my creativity. Here's what I'm listening to while coding:
                </p>
                <div className="rounded-xl overflow-hidden">
                  <iframe 
                    data-testid="embed-iframe" 
                    style={{ borderRadius: '12px' }} 
                    src="https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v?utm_source=generator" 
                    width="100%" 
                    height="300"
                    className="sm:h-[352px]"
                    frameBorder="0" 
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Availability Status */}
              <div className="bg-gray-800 dark:bg-gray-800 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-sm sm:text-base">Available for Projects</span>
                </div>
                <p className="text-gray-400 text-sm">
                  I'm currently accepting new projects and collaborations. Let's create something amazing together!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-950 text-gray-400 py-8 sm:py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center md:text-left"
            >
              <p className="text-sm sm:text-base">&copy; 2025 Amit Kumar. Built with React & Framer Motion.</p>
              <p className="text-xs sm:text-sm mt-1">Crafted with ❤️ and lots of ☕</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex gap-4 sm:gap-6 mt-4 md:mt-0"
            >
              <MagneticButton
                href="https://github.com/amit-kumar-11"
                className="text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
              >
                <Github size={20} className="sm:w-6 sm:h-6" />
              </MagneticButton>
              <MagneticButton
                href="https://www.linkedin.com/in/amitkumarfd03"
                className="text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
              >
                <Linkedin size={20} className="sm:w-6 sm:h-6" />
              </MagneticButton>
              <MagneticButton
                href="mailto:imamit0311@gmail.com"
                className="text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
              >
                <Mail size={20} className="sm:w-6 sm:h-6" />
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </footer>
      
      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
}

export default App;
