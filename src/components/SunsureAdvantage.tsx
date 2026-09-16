import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

const SUNSURE_ADVANTAGES = [
  {
    id: "delivery",
    title: "Fastest Power Delivery",
    description: "Accelerate your transition to clean energy with our rapid deployment and execution timelines.",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=2000",
    marginTop: "md:mt-0",
  },
  {
    id: "pan-india",
    title: "Pan India Power Delivery & 24/7 Energy",
    description: "Dependable round-the-clock renewable power accessible across the nation, ensuring your operations never stop.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
    marginTop: "md:mt-[140px]",
  },
  {
    id: "capabilities",
    title: "In-House Capabilities",
    description: "End-to-end expertise spanning development, engineering, and execution without relying on third parties.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000",
    marginTop: "md:mt-[280px]",
  },
  {
    id: "centricity",
    title: "Customer Centricity",
    description: "Tailored energy solutions designed to seamlessly integrate with your unique business goals and operations.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=2000",
    marginTop: "md:mt-[180px]",
  }
];

type Rect = { top: number; left: number; width: number; height: number };

export const SunsureAdvantage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cardRects, setCardRects] = useState<Rect[]>(Array(4).fill({ top: 0, left: 0, width: 0, height: 0 }));

  // Calculate the absolute position and dimensions of each card wrapper relative to the sticky container
  const updateRects = useCallback(() => {
    if (!stickyRef.current) return;
    const stickyContainerRect = stickyRef.current.getBoundingClientRect();
    
    const newRects = SUNSURE_ADVANTAGES.map((_, i) => {
      const wrapper = wrapperRefs.current[i];
      if (!wrapper) return { top: 0, left: 0, width: 0, height: 0 };
      
      const rect = wrapper.getBoundingClientRect();
      return {
        top: rect.top - stickyContainerRect.top,
        left: rect.left - stickyContainerRect.left,
        width: rect.width,
        height: rect.height
      };
    });
    
    setCardRects(newRects);
  }, []);

  // Handle Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Total scrollable distance inside the 500vh section
      const scrollableDistance = height - windowHeight;
      // Current scroll amount into the section
      const scrolled = -top;
      
      if (scrolled < 0 || scrollableDistance <= 0) {
        setActiveIndex(null);
        return;
      }

      let progress = scrolled / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      // Map progress to active card
      if (progress < 0.10) {
        setActiveIndex(null);
      } else if (progress < 0.30) {
        setActiveIndex(0);
      } else if (progress < 0.55) {
        setActiveIndex(1);
      } else if (progress < 0.80) {
        setActiveIndex(2);
      } else {
        setActiveIndex(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial measurement after mount
    const timer = setTimeout(updateRects, 100);
    window.addEventListener('resize', updateRects);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRects);
    };
  }, [updateRects]);

  const handleCardClick = (index: number) => {
    if (!sectionRef.current) return;
    const { top, height } = sectionRef.current.getBoundingClientRect();
    const scrollableDistance = height - window.innerHeight;
    const absoluteSectionTop = window.scrollY + top;
    const targetProgress = [0.20, 0.42, 0.67, 0.90][index];
    window.scrollTo({ top: absoluteSectionTop + scrollableDistance * targetProgress, behavior: 'smooth' });
  };

  return (
    // 500vh ensures a long scroll area for scrubbing through the 4 states
    <section ref={sectionRef} className="relative w-full h-[450vh] bg-white">
      
      {/* Sticky Container - Pins to screen while scrolling */}
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-700">
        
        {/* Absolute Background Images Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {SUNSURE_ADVANTAGES.map((adv, i) => {
            const isActive = activeIndex === i;
            const rect = cardRects[i];
            
            // Default: Image container perfectly matches the wrapper bounds (ignoring entrance animation translations)
            // Active: Image container expands to fill the entire screen (inset 0)
            const style: React.CSSProperties = isActive
              ? { top: '0px', left: '0px', width: '100%', height: '100%', borderRadius: '0px', opacity: 1, zIndex: 10 }
              : { top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px`, borderRadius: '24px', opacity: activeIndex !== null ? 0 : 1, zIndex: 1 };

            return (
              <div 
                key={`bg-${adv.id}`}
                className="absolute overflow-hidden"
                style={{
                  ...style,
                  transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms ease'
                }}
              >
                {/* Overlay to ensure text readability when expanded */}
                <div 
                  className={`absolute inset-0 bg-black/50 transition-opacity duration-800 z-10 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
                <img 
                  src={adv.image} 
                  alt={adv.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out"
                  style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
                />
              </div>
            );
          })}
        </div>

        {/* Foreground Content Container */}
        <div className="relative z-20 w-full flex flex-col items-center h-full justify-center">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-16 px-6">
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6 shadow-sm transition-colors duration-700 ${
              activeIndex !== null 
                ? 'bg-white/20 text-white backdrop-blur-md border border-white/30' 
                : 'bg-[#e4ebdd] text-[#4f6653]'
            }`}>
              <span className="font-bold">The Sunsure</span> Advantage
            </span>
            <h2 className={`text-3xl md:text-5xl font-medium tracking-tight text-center transition-colors duration-700 ${
              activeIndex !== null ? 'text-white drop-shadow-md' : 'text-zinc-900'
            }`}>
              Invest in a sustainable future
            </h2>
          </div>

          {/* Cards Flex Container */}
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-8 w-full max-w-[1400px] px-6">
            {SUNSURE_ADVANTAGES.map((card, index) => {
              const isActive = activeIndex === index;
              const isOtherActive = activeIndex !== null && activeIndex !== index;
              
              return (
                // Static wrapper to measure precise grid layout bounds without transform interference
                <div 
                  key={card.id}
                  ref={(el) => { wrapperRefs.current[index] = el; }}
                  className={`relative w-full md:w-[280px] lg:w-[320px] h-[400px] md:h-[480px] ${card.marginTop} cursor-pointer`}
                  onClick={() => handleCardClick(index)}
                >
                  {/* The actual translucent foreground card */}
                  <div
                    className={`
                      absolute inset-0 w-full h-full rounded-[24px] outline-none
                      transition-all duration-700 ease-[0.16,1,0.3,1]
                      ${isOtherActive ? 'opacity-40 grayscale-[30%]' : ''}
                      ${isActive ? 'bg-[#141e19]/40 backdrop-blur-md border border-white/30 shadow-2xl scale-[1.02]' : 'bg-transparent border border-transparent scale-100'}
                    `}
                  >
                    
                    {/* Default state dark overlay gradient for readability over the cropped image */}
                    <div 
                      className={`absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none transition-opacity duration-700 ${
                        isActive ? 'opacity-0' : 'opacity-100'
                      }`}
                    />

                    {/* Card Content */}
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end overflow-hidden z-10">
                      <div 
                        className="flex flex-col gap-3 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                        style={{ transform: isActive ? 'translateY(0)' : 'translateY(16px)' }}
                      >
                        <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-white drop-shadow-sm">
                          {card.title}
                        </h3>
                        
                        {/* Description Box */}
                        <div 
                          className="overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1]"
                          style={{
                            maxHeight: isActive ? '120px' : '0px',
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                            transitionDelay: isActive ? '150ms' : '0ms'
                          }}
                        >
                          <p className="text-[15px] lg:text-base leading-relaxed text-white/95">
                            {card.description}
                          </p>
                          
                          {/* Micro CTA Arrow */}
                          <ArrowRight className={`mt-3 w-5 h-5 text-white transition-all duration-700 delay-300 ${
                            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          }`} />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
