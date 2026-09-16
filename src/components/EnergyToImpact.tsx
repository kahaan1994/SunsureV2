import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const CONTENT_STATES = [
  {
    id: 'clean-energy',
    eyebrow: 'We Generate',
    title: 'Clean Energy',
    description: 'We turn the abundance of sun and wind into clean energy that powers businesses and industries. Every project is built to deliver dependable renewable power while contributing to a more sustainable and resilient energy system.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop', // wind
  },
  {
    id: 'green-infrastructure',
    eyebrow: 'We Build',
    title: 'Green Infrastructure',
    description: 'We develop infrastructure designed to support a cleaner and more resilient future, connecting sustainable technology with the places and industries that need it.',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop', // modern infrastructure
  },
  {
    id: 'smarter-industries',
    eyebrow: 'We Power',
    title: 'Smarter Industries',
    description: 'We help businesses transition toward cleaner energy systems through dependable infrastructure, thoughtful planning and technology-led solutions.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop', // industrial
  },
  {
    id: 'sustainable-impact',
    eyebrow: 'We Create',
    title: 'Sustainable Impact',
    description: 'We combine renewable energy, infrastructure and innovation to create measurable long-term impact for businesses, communities and the environment.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=2000&auto=format&fit=crop', // solar landscape
  }
];

const AUTOPLAY_INTERVAL = 5500;
const TRANSITION_DURATION = 0.65;

export const EnergyToImpact: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Drag and swipe states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const prefersReducedMotion = useReducedMotion();

  // Autoplay Timer
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CONTENT_STATES.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Touch & Drag Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) setCurrentIndex((prev) => (prev + 1) % CONTENT_STATES.length);
    else if (diff < -50) setCurrentIndex((prev) => (prev - 1 + CONTENT_STATES.length) % CONTENT_STATES.length);
    setTouchStart(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (wheelTimeout.current) return;
      if (e.deltaX > 20) {
        setCurrentIndex((prev) => (prev + 1) % CONTENT_STATES.length);
        wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 600);
      } else if (e.deltaX < -20) {
        setCurrentIndex((prev) => (prev - 1 + CONTENT_STATES.length) % CONTENT_STATES.length);
        wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 600);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUpOrLeave = (e: React.MouseEvent) => {
    if (!isDragging || touchStart === null) {
      setIsDragging(false);
      return;
    }
    const diff = touchStart - e.clientX;
    if (diff > 50) setCurrentIndex((prev) => (prev + 1) % CONTENT_STATES.length);
    else if (diff < -50) setCurrentIndex((prev) => (prev - 1 + CONTENT_STATES.length) % CONTENT_STATES.length);
    
    setIsDragging(false);
    setTouchStart(null);
  };

  const currentState = CONTENT_STATES[currentIndex];

  // Motion Variants
  const textVariants = {
    initial: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 12 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: TRANSITION_DURATION,
        ease: [0.16, 1, 0.3, 1] as any // Premium ease-out
      }
    },
    exit: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : -12,
      transition: {
        duration: TRANSITION_DURATION * 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  const imageVariants = {
    initial: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 1.02 
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: TRANSITION_DURATION,
        ease: 'easeOut' as any
      }
    },
    exit: { 
      opacity: 0,
      scale: 1,
      transition: {
        duration: TRANSITION_DURATION,
        ease: 'easeOut' as any
      }
    }
  };

  return (
    <section 
      className={`w-full bg-white py-20 lg:py-28 font-sans overflow-hidden ${isDragging ? 'cursor-grabbing' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={(e) => {
        setIsHovered(false);
        handleMouseUpOrLeave(e);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Pill Label */}
        <div className="flex justify-center mb-16 lg:mb-24">
          <span className="bg-[#e4ebdd] text-[#4f6653] px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
            From energy to <span className="font-bold text-[#2A4838]">impact</span>
          </span>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Typography (approx 45%) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentState.id}
                className="flex flex-col items-start"
              >
                <motion.span 
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-lg md:text-xl text-zinc-500 font-medium mb-2 tracking-tight"
                >
                  {currentState.eyebrow}
                </motion.span>
                
                <motion.h2 
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: 0.05 }}
                  className="text-[32px] md:text-[40px] text-[#4f6653] font-medium mb-6 tracking-tight leading-[1.1]"
                >
                  {currentState.title}
                </motion.h2>
                
                <motion.p 
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: 0.1 }}
                  className="text-[15px] md:text-[17px] text-zinc-700 leading-[1.6] max-w-lg font-medium"
                >
                  {currentState.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Indicators */}
            <div className="flex items-center gap-3 mt-12">
              {CONTENT_STATES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="group py-2 focus:outline-none"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${
                    idx === currentIndex 
                      ? 'w-8 bg-[#2A4838]' 
                      : 'w-2 bg-zinc-300 group-hover:bg-zinc-400'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Image (approx 55%) */}
          <div className="w-full lg:w-[55%] relative rounded-[24px] overflow-hidden bg-zinc-100 aspect-[4/3.5] lg:aspect-[5.5/4.7] shadow-xl">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentState.id}
                src={currentState.image}
                alt={currentState.title}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {/* Very subtle inner shadow for depth */}
            <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
