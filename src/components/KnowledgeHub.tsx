import React, { useEffect, useRef } from 'react';

const KNOWLEDGE_HUB_ARTICLES = [
  {
    id: "green-energy-india",
    title: "Green Energy in India: How Companies Choosing Green Power are Becoming Profitable",
    date: "23rd June, 2025",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ebd9ea5?q=80&w=600&auto=format&fit=crop",
    url: "#"
  },
  {
    id: "solar-panel-types",
    title: "Types of Solar Panel – What's Best for Rooftop or Commercial Use?",
    date: "25th Jan, 2025",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
    url: "#"
  },
  {
    id: "bess-india",
    title: "Understanding battery energy storage systems (BESS) in India",
    date: "24th Jan, 2025",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=600&auto=format&fit=crop",
    url: "#"
  },
  {
    id: "solar-subsidy-up",
    title: "Solar Panel Subsidy in Uttar Pradesh 2024",
    date: "12th Jan, 2025",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop",
    url: "#"
  }
];

export const KnowledgeHub: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = React.useState(false);
  
  // Drag to scroll states
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const draggedDistance = useRef(0);

  // Entrance Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Optional Auto-Scroll
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const startScroll = () => {
      interval = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const scrollLeft = container.scrollLeft;
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (scrollLeft >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: 340, behavior: 'smooth' });
          }
        }
      }, 6000);
    };

    startScroll();

    const handleInteraction = () => {
      clearInterval(interval);
      // Restart after 10s of inactivity
      setTimeout(() => {
        clearInterval(interval);
        startScroll();
      }, 10000);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleInteraction);
      container.addEventListener('touchstart', handleInteraction, { passive: true });
      container.addEventListener('wheel', handleInteraction, { passive: true });
    }

    return () => {
      clearInterval(interval);
      if (container) {
        container.removeEventListener('mouseenter', handleInteraction);
        container.removeEventListener('touchstart', handleInteraction);
        container.removeEventListener('wheel', handleInteraction);
      }
    };
  }, []);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    draggedDistance.current = 0;
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    draggedDistance.current = Math.abs(walk);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent link click if we were dragging
    if (draggedDistance.current > 10) {
      e.preventDefault();
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[100vh] py-24 flex items-center justify-center overflow-hidden font-sans"
    >
      {/* Removed Invisible SVG Clip Path Definition */}

      {/* Full Bleed Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1548611716-302a4664a852?q=80&w=2070&auto=format&fit=crop" 
          alt="Solar Landscape" 
          className="w-full h-full object-cover"
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-[#0a0d0a]/50" />
      </div>

      {/* Large Translucent Panel */}
      <div className={`relative z-10 w-full md:w-[90%] max-w-[1500px] bg-[#1e2320]/55 border border-white/20 backdrop-blur-[12px] rounded-[32px] overflow-hidden flex flex-col py-16 px-6 md:px-12 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <span className="bg-[#e4ebdd] text-[#4f6653] px-5 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 shadow-sm">
            Knowledge Hub
          </span>
          <h2 className="text-3xl md:text-5xl text-white font-medium tracking-tight text-center max-w-3xl leading-tight drop-shadow-md">
            Explore Industry-Specific Case Studies and Blogs
          </h2>
        </div>

        {/* Intro Row */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1300px] mx-auto mb-10 gap-4">
          <p className="text-white/80 text-lg">
            Quickly and easily generate Lorem Ipsum
          </p>
          <a href="#" className="text-white font-medium hover:text-white/70 transition-colors border-b border-transparent hover:border-white/70 pb-0.5">
            See All Blogs
          </a>
        </div>

        {/* Article Carousel */}
        <div className="relative w-full max-w-[1300px] mx-auto">
          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex overflow-x-auto gap-6 md:gap-8 pb-12 pt-4 hide-scrollbar select-none ${
              isDragging ? 'cursor-grabbing' : 'snap-x snap-mandatory cursor-grab'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {KNOWLEDGE_HUB_ARTICLES.map((article, index) => (
              <a
                href={article.url}
                key={article.id}
                draggable={false}
                onClick={handleCardClick}
                className="group relative flex-shrink-0 w-[280px] md:w-[320px] aspect-square md:h-[320px] snap-start outline-none block rounded-[24px] overflow-hidden"
              >
                {/* Image Background */}
                <img 
                  src={article.image} 
                  alt={article.title}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105 pointer-events-none"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-[600ms] group-hover:opacity-100" />
                
                {/* Date Pill */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 transition-transform duration-[600ms]">
                  {article.date}
                </div>

                {/* Article Title */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10 transition-transform duration-[600ms] ease-out group-hover:-translate-y-1.5">
                  <h3 className="text-white text-lg md:text-xl font-medium leading-snug line-clamp-3 drop-shadow-md">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Global Style to hide scrollbar for webkit (Chrome/Safari) */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};
