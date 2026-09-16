import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const SOLUTIONS = {
  rtc: {
    label: "RE RTC Solutions",
    heroImage: "https://images.unsplash.com/photo-1509391366360-1e97d5261852?auto=format&fit=crop&q=80&w=2000",
    description: "Achieve your goals of powering with 100% renewable energy. We offer a customised suite of renewable energy solutions tailored to your industry and help you switch to green energy.",
    cta: "See all Projects",
    cards: [
      {
        title: "RTC Power",
        description: "We combine customised solar, wind, and battery storage solutions with strategic energy trading to deliver 24/7 clean power.",
        visual: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=400"
      },
      {
        title: "Energy Storage",
        description: "Our advanced Battery Energy Storage Systems (BESS) ensure uninterrupted clean energy supply when you need it.",
        visual: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400"
      },
      {
        title: "Renewable energy certificates",
        description: "We help you seamlessly procure I-RECs to meet your sustainability targets and offset carbon footprint.",
        visual: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  openAccess: {
    label: "Green Energy Open Access",
    heroImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=2000",
    description: "Access large-scale off-site solar and wind farms through the national grid. Benefit from significant cost savings and green credentials.",
    cta: "See all Projects",
    cards: [
      {
        title: "Solar Open Access",
        description: "Source power directly from our massive utility-scale solar parks with long-term price certainty.",
        visual: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400"
      },
      {
        title: "Wind Open Access",
        description: "Harness high-capacity wind energy delivered directly to your manufacturing facilities via the grid.",
        visual: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=400"
      },
      {
        title: "Hybrid Open Access",
        description: "Combine solar and wind generation profiles for a more consistent and optimized energy curve.",
        visual: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400"
      }
    ]
  }
};

type TabKey = keyof typeof SOLUTIONS;

export const OurSolutions: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [inView, setInView] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('openAccess');
  const [displayData, setDisplayData] = useState(SOLUTIONS.openAccess);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Intersection Observer for scroll entrance and video pausing
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTabSwitch = (tab: TabKey) => {
    if (tab === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Halfway through the transition, swap the content
    setTimeout(() => {
      setActiveTab(tab);
      setDisplayData(SOLUTIONS[tab]);
      
      // Let React render, then fade back in
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }, 350); // 350ms out of a ~700ms total transition
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-12 lg:py-16 flex items-center justify-center overflow-hidden"
    >
      {/* Full Bleed Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          src="https://cdn.pixabay.com/video/2020/06/23/42797-432859940_large.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#0a0d0a]/60" />
      </div>

      {/* Large Translucent Panel */}
      <div 
        className={`relative z-10 w-[92%] max-w-[1400px] bg-[#1a1f1d]/55 backdrop-blur-[12px] border border-white/10 rounded-3xl p-6 md:p-10 lg:p-12 flex flex-col items-center transition-all duration-[1000ms] ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        
        {/* Top Pill */}
        <div className={`mb-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-[#e4ebdd] text-[#2A4838] px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
            Our Solutions
          </div>
        </div>

        {/* Main Heading */}
        <h2 className={`text-3xl md:text-4xl lg:text-5xl text-white font-medium text-center max-w-4xl tracking-tight mb-8 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Portfolio of distributed renewable energy assets
        </h2>

        {/* Segmented Control / Tabs */}
        <div 
          className={`flex items-center bg-black/20 backdrop-blur-md rounded-full p-1.5 mb-10 border border-white/5 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          role="tablist"
        >
          {(Object.keys(SOLUTIONS) as TabKey[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={activeTab === key}
              onClick={() => handleTabSwitch(key)}
              className={`px-6 md:px-10 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-500 ease-out ${
                activeTab === key 
                  ? 'bg-[#e4ebdd] text-[#2A4838] shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {SOLUTIONS[key].label}
            </button>
          ))}
        </div>

        {/* Content Area wrapped in transition */}
        <div 
          className={`w-full flex flex-col gap-8 transition-all duration-500 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {/* Main Feature Area */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full mb-6">
            {/* Left Image */}
            <div className="w-full lg:w-[55%] h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shrink-0 shadow-2xl relative group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={displayData.heroImage} 
                alt={displayData.label}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            
            {/* Right Text */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center py-6">
              <p className="text-white text-xl lg:text-2xl leading-relaxed mb-10 font-medium">
                {displayData.description}
              </p>
              <a href="#" className="group inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-[#e4ebdd] transition-colors">
                {displayData.cta}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Three Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {displayData.cards.map((card) => (
              <div 
                key={card.title}
                className="group flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-black/30 hover:border-white/20 transition-all duration-500"
              >
                <div className="w-full h-32 md:h-40 mb-6 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img 
                    src={card.visual} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-white font-bold text-xl mb-3 transition-transform duration-500 group-hover:-translate-y-1">
                  {card.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed transition-transform duration-500 group-hover:-translate-y-1">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
