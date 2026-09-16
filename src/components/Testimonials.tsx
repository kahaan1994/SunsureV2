import React, { useState, useEffect, useRef } from 'react';

const TESTIMONIAL_INTERVAL = 10000;

const TESTIMONIALS = [
  {
    id: "lupin",
    client: "Lupin",
    logo: "LUPIN", // Text placeholder for logo
    metric1: { value: "80x", label: "Lorem ipsum dolor sit amet" },
    metric2: { value: "90x", label: "Lorem ipsum dolor sit amet" },
    quote: "Our partnership with Sunsure Energy is part of our comprehensive decarbonization strategy and furthering our commitment to sustainability and reducing our environmental impact.",
    person: "Ramesh Swaminathan",
    designation: "ED, Global CFO and Head API Plus SBU, Lupin"
  },
  {
    id: "sandoz",
    client: "Sandoz",
    logo: "SANDOZ",
    metric1: { value: "100x", label: "Renewable transition" },
    metric2: { value: "50%", label: "Emissions reduction" },
    quote: "The efficient use of resources and the reduction of greenhouse gas emissions are key issues for Sandoz. The supply of renewable energy through this project therefore fits perfectly with our sustainability ambitions.",
    person: "Mr. Sudhir Bhandare",
    designation: "Executive Director of Sandoz India"
  },
  {
    id: "emcure",
    client: "Emcure",
    logo: "Emcure",
    metric1: { value: "95x", label: "Green energy impact" },
    metric2: { value: "30%", label: "Cost savings" },
    quote: "We look forward to continuing our collaboration with Sunsure Energy to achieve new milestones in our green energy journey.",
    person: "Mr. Sunil Mehta",
    designation: "Whole-time Director of Emcure Pharmaceuticals Ltd."
  },
  {
    id: "dabur",
    client: "Dabur",
    logo: "Dabur",
    metric1: { value: "70x", label: "Carbon offset" },
    metric2: { value: "40%", label: "Sustainable power" },
    quote: "We are proud to sign this Green Energy PPA agreement with Sunsure Energy which would offset a significant amount of our carbon emissions and contribute towards a cleaner and greener future.",
    person: "Mr. Rahul Awasthi",
    designation: "Head of Manufacturing, Dabur India Limited"
  },
  {
    id: "kajaria",
    client: "Kajaria",
    logo: "Kajaria",
    metric1: { value: "100%", label: "RE power target" },
    metric2: { value: "60x", label: "Business growth" },
    quote: "Our switch to RE power with Sunsure Energy is our attempt to conduct our business in the most responsible and sustainable manner. We are delighted to have Sunsure Energy as our partner in our route to decarbonization.",
    person: "Mr. R.C. Rawat",
    designation: "COO (A&T) and Company Secretary, Kajaria Ceramics"
  }
];

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Drag and swipe states
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  // Intersection Observer to start timer when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 15-second Auto-Switching Timer
  useEffect(() => {
    if (!inView || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, TESTIMONIAL_INTERVAL);

    return () => clearInterval(timer);
  }, [inView, isHovered, activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const getCardPosition = (index: number) => {
    const total = TESTIMONIALS.length;
    if (index === activeIndex) return 'center';
    
    // In mobile, we only want the center card to really show prominently, but on desktop we show 3
    // We'll handle responsive hiding in CSS, but the logic assigns left/right here
    if (index === (activeIndex - 1 + total) % total) return 'left';
    if (index === (activeIndex + 1) % total) return 'right';
    
    return 'hidden';
  };

  // Drag & Trackpad Handlers
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (wheelTimeout.current) return;
      if (e.deltaX > 20) {
        handleNext();
        wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 600);
      } else if (e.deltaX < -20) {
        handlePrev();
        wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 600);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUpOrLeave = (e: React.MouseEvent) => {
    if (!isDragging || touchStartX === null) {
      setIsDragging(false);
      return;
    }
    const diff = touchStartX - e.clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    
    setIsDragging(false);
    setTouchStartX(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStartX(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[100vh] py-24 md:py-32 flex flex-col items-center overflow-hidden bg-black font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop" 
          alt="Solar field"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[#0d1210]/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center px-4">
        
        {/* Header */}
        <div className={`flex flex-col items-center text-center transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <span className="bg-white text-zinc-900 px-5 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 shadow-md">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl text-white font-medium tracking-tight drop-shadow-md">
            Our clients and their experience
          </h2>
        </div>

        {/* Client Logo Row (Rotating so active is always center) */}
        <div className={`flex justify-center items-center gap-8 md:gap-16 mt-16 mb-16 max-w-6xl transition-all duration-1000 delay-300 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const total = TESTIMONIALS.length;
            const index = (activeIndex + offset + total) % total;
            const t = TESTIMONIALS[index];
            const isActive = offset === 0;

            return (
              <div 
                key={t.id} 
                className="relative flex items-center justify-center cursor-pointer transition-all duration-700"
                onClick={() => setActiveIndex(index)}
              >
                {isActive ? (
                  <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-500 scale-100 opacity-100">
                    <span className="text-white font-bold text-xl drop-shadow-md">{t.logo}</span>
                  </div>
                ) : (
                  <span className="text-xl md:text-3xl font-bold text-white/40 hover:text-white/70 transition-colors duration-500">
                    {t.logo}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Carousel Container */}
        <div className={`relative w-full max-w-[1200px] h-[500px] md:h-[550px] flex items-center justify-center transition-all duration-1000 delay-500 transform ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          
          {/* Navigation Arrows moved to bottom */}

          {/* Testimonial Cards */}
          <div 
            className={`relative w-full h-full flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {TESTIMONIALS.map((t, i) => {
              const pos = getCardPosition(i);
              
              // Base Card Styles
              let cardStyles = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[480px] rounded-[24px] overflow-hidden transition-all duration-[1000ms] ease-[0.16,1,0.3,1] p-8 md:p-12";
              
              // Positional Dynamic Styles
              if (pos === 'center') {
                cardStyles += " z-30 scale-100 opacity-100 bg-white text-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.4)] h-auto md:h-[420px]";
              } else if (pos === 'left') {
                cardStyles += " z-20 scale-[0.85] -translate-x-[75%] md:-translate-x-[155%] opacity-0 md:opacity-100 bg-[#141916]/55 backdrop-blur-[12px] border border-white/25 text-white shadow-xl h-auto md:h-[350px] cursor-pointer hover:bg-[#141916]/75";
              } else if (pos === 'right') {
                cardStyles += " z-20 scale-[0.85] -translate-x-[25%] md:translate-x-[55%] opacity-0 md:opacity-100 bg-[#141916]/55 backdrop-blur-[12px] border border-white/25 text-white shadow-xl h-auto md:h-[350px] cursor-pointer hover:bg-[#141916]/75";
              } else {
                cardStyles += " z-10 scale-50 opacity-0 pointer-events-none";
              }

              // Text color logic for active vs side cards
              const headingColor = pos === 'center' ? 'text-zinc-900' : 'text-white';
              const bodyColor = pos === 'center' ? 'text-zinc-600' : 'text-white/80';
              const dividerColor = pos === 'center' ? 'bg-zinc-200' : 'bg-white/20';

              return (
                <div 
                  key={t.id} 
                  className={cardStyles}
                  onClick={() => {
                    if (pos === 'left' || pos === 'right') setActiveIndex(i);
                  }}
                >
                  {/* Top Metrics Area */}
                  <div className="flex gap-8 md:gap-12 mb-8">
                    <div className="flex flex-col">
                      <h4 className={`text-3xl md:text-4xl font-bold mb-2 tracking-tight ${headingColor}`}>{t.metric1.value}</h4>
                      <p className={`text-xs md:text-sm font-medium ${bodyColor} max-w-[120px] leading-tight`}>{t.metric1.label}</p>
                    </div>
                    {pos === 'center' && (
                      <div className="flex flex-col">
                        <h4 className={`text-3xl md:text-4xl font-bold mb-2 tracking-tight ${headingColor}`}>{t.metric2.value}</h4>
                        <p className={`text-xs md:text-sm font-medium ${bodyColor} max-w-[120px] leading-tight`}>{t.metric2.label}</p>
                      </div>
                    )}
                  </div>

                  <div className={`w-full h-px ${dividerColor} mb-8`} />

                  {/* Quote Area */}
                  <div className="flex flex-col">
                    <p className={`text-sm md:text-base leading-relaxed ${pos === 'center' ? 'font-medium' : 'font-normal'} ${headingColor} mb-6 line-clamp-4 md:line-clamp-none`}>
                      {t.quote}
                    </p>
                    {pos === 'center' && (
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${headingColor}`}>{t.person}</span>
                        <span className={`text-xs font-medium ${bodyColor} mt-1`}>{t.designation}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>



        </div>

        {/* Controls: Arrows & Progress Indicator */}
        <div className={`flex items-center gap-6 md:gap-8 mt-12 transition-opacity duration-1000 delay-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};
