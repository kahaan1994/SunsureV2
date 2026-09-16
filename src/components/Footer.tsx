import React, { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  {
    category: "COMPANY",
    links: ["About Us", "Our Projects", "Careers", "Contact"]
  },
  {
    category: "SOLUTIONS",
    links: ["Commercial & Industrial", "Renewable Energy", "Energy Storage", "Open Access", "Group Captive"]
  },
  {
    category: "KNOWLEDGE",
    links: ["Knowledge Hub", "Case Studies", "Blogs", "Insights"]
  },
  {
    category: "CONNECT",
    links: ["LinkedIn", "Twitter", "Contact Us"]
  }
];

export const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={sectionRef}
      className="relative w-full bg-[#2A4838] flex flex-col justify-between overflow-hidden font-sans pt-24 pb-8 px-6 md:px-16"
    >


      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full flex-grow">
        
        {/* Top: CTA Section & Navigation */}
        <div className="flex flex-col xl:flex-row justify-between gap-20 xl:gap-32 w-full mb-16 mt-8">
          
          {/* Left: CTA */}
          <div className="flex flex-col items-start max-w-xl">
            <h2 
              className={`text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight mb-6 transition-all duration-[800ms] ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Let's build a cleaner future.
            </h2>
            <p 
              className={`text-lg md:text-xl text-white/70 mb-10 transition-all duration-[800ms] delay-[150ms] ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Partner with us to accelerate your transition to renewable energy.
            </p>
            <button 
              className={`group flex items-center gap-4 bg-white text-[#2A4838] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-[300ms]`}
            >
              Talk to us
              <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </button>
          </div>

          {/* Right: Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 flex-grow">
            {NAV_LINKS.map((col, colIndex) => (
              <div 
                key={col.category}
                className={`flex flex-col transition-all duration-[800ms] ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${400 + (colIndex * 100)}ms` }}
              >
                <h4 className="text-[#8a9990] text-xs font-semibold tracking-widest uppercase mb-6">
                  {col.category}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-white/90 text-[15px] hover:text-[#a3e670] transition-colors duration-300 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#a3e670] hover:after:w-full after:transition-all after:duration-300 pb-1"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Logo & Utility Bar */}
        <div className="mt-auto w-full flex flex-col">
          


          {/* Divider */}
          <div className={`w-full h-px bg-white/10 mb-6 transition-all duration-1000 delay-[900ms] ${inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transformOrigin: 'left' }} />

          {/* Utility Bar */}
          <div className={`flex flex-col md:flex-row justify-between items-center gap-6 transition-all duration-1000 delay-[1000ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            <p className="text-white/40 text-sm">
              © 2026 Sunsure Energy
            </p>
            
            <div className="flex items-center gap-6 text-white/50 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>

            <button 
              onClick={scrollToTop}
              className="group w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
              aria-label="Back to top"
            >
              <svg 
                className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-y-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
};
