import React, { useState, useEffect, useRef } from 'react';

const CAROUSEL_DATA = [
  {
    state: "Maharashtra",
    year: "2025",
    city: "Dhule",
    mw: "120",
    description: "Commissioned in early 2025, this Open Access Solar project supplies clean energy to top-tier manufacturing units.",
    videoSrc: "/videos/1789375893411-6497867_Warehouse Rack Shelf Aisle_By_Nazarii_Ortynskyi_Artlist_HD.mp4",
    poster: ""
  },
  {
    state: "Rajasthan",
    year: "2024",
    city: "Bikaner",
    mw: "200",
    description: "A flagship captive solar farm commissioned in 2024, powering critical data center infrastructure across North India.",
    videoSrc: "/videos/1789375842748-366311_Servers Programmer Computer Server Farm_By_Frame_Stock_Footage_Artlist_HD.mp4",
    poster: ""
  },
  {
    state: "Gujarat",
    year: "2023",
    city: "Kutch",
    mw: "350",
    description: "Large scale hybrid wind-solar park serving heavy industries and cement manufacturing facilities.",
    videoSrc: "/videos/1789375928783-323399_Quarry Machine Vest Worker_By_Frame_Stock_Footage_Artlist_HD.mp4",
    poster: ""
  },
  {
    state: "Tamil Nadu",
    year: "2025",
    city: "Coimbatore",
    mw: "150",
    description: "Providing consistent renewable power to FMCG production hubs through interstate transmission.",
    videoSrc: "/videos/1789376226005-330391_Lids Screwing Assembling Factory_By_The_Stock_Studio_Artlist_HD.mp4",
    poster: ""
  },
  {
    state: "Karnataka",
    year: "2024",
    city: "Tumkur",
    mw: "180",
    description: "Dedicated solar asset reducing the carbon footprint of regional consumer durables manufacturing.",
    videoSrc: "/videos/1789376010676-30844_Cans fall onto conveyor belt through separate pathways _By_The_Stock_Studio_Artlist_HD.mp4",
    poster: ""
  }
];

export const CommissionedProjects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Pause all, then play active
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.play().catch(e => console.log('Autoplay prevented:', e));
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % CAROUSEL_DATA.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const goToSlide = (index: number) => setActiveIndex(index);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length);

  return (
    <section className="w-full bg-white py-24 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-10">
        <span className="bg-[#e4ebdd] text-[#4f6653] px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
          <span className="font-bold">Commissioned</span> Projects
        </span>
        <h2 className="text-3xl md:text-[34px] text-zinc-900 mb-2 font-normal tracking-tight text-center">
          Portfolio of distributed renewable energy assets
        </h2>
      </div>

      <div className="w-full max-w-[1280px] px-6">
        <div className="relative w-full aspect-[2340/980] rounded-[24px] overflow-hidden shadow-2xl bg-zinc-100 group">
          
          {CAROUSEL_DATA.map((slide, index) => (
            <div 
              key={index} 
              className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
              style={{ opacity: activeIndex === index ? 1 : 0, zIndex: activeIndex === index ? 10 : 0 }}
            >
              <video 
                ref={el => videoRefs.current[index] = el}
                src={slide.videoSrc}
                poster={slide.poster}
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
              
              {/* Top Right Badge */}
              <div className="absolute top-8 right-8 flex items-center gap-3">
                <div className="flex items-center gap-1 text-white bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">{slide.state}</span>
                </div>
                <div className="text-white bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full font-bold text-sm">
                  {slide.year}
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-24 left-0 w-full flex flex-col items-center text-center px-4">
                <h3 className="text-white font-bold text-4xl mb-4">{slide.city} – {slide.mw} MWp</h3>
                <p className="text-white/80 font-normal max-w-[640px] text-lg leading-snug">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div className="absolute bottom-8 left-0 w-full flex items-center justify-center gap-8 z-20">
            <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-black/50 transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
              {CAROUSEL_DATA.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-white scale-125' : 'bg-white/40'}`}
                />
              ))}
            </div>

            <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-black/50 transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mute Toggle */}
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-black/50 transition z-20"
          >
            {isMuted ? (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
               </svg>
            ) : (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
               </svg>
            )}
          </button>
          
        </div>
      </div>
    </section>
  );
};
