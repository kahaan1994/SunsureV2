import React, { useEffect, useRef, useState } from 'react';

const STAGES = [
  {
    id: "generate",
    title: "Generate",
    description: "Solar + Wind",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=400&auto=format&fit=crop",
    threshold: 0.12, // Active when progress reaches X=250 on the line
    desktopPos: { left: '250px', top: '250px' },
    mobilePos: { left: '150px', top: '200px' }
  },
  {
    id: "store",
    title: "Store",
    description: "Energy Storage",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=400&auto=format&fit=crop",
    threshold: 0.37, // Active when progress reaches X=480
    desktopPos: { left: '480px', top: '250px' },
    mobilePos: { left: '150px', top: '400px' }
  },
  {
    id: "deliver",
    title: "Deliver",
    description: "Reliable Renewable Power",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=400&auto=format&fit=crop",
    threshold: 0.63, // Active when progress reaches X=710
    desktopPos: { left: '710px', top: '250px' },
    mobilePos: { left: '150px', top: '600px' }
  },
  {
    id: "impact",
    title: "Impact",
    description: "Lower Emissions + Resilience",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=400&auto=format&fit=crop",
    threshold: 0.88, // Active when progress reaches X=940
    desktopPos: { left: '940px', top: '250px' },
    mobilePos: { left: '150px', top: '800px' }
  }
];

export const DevelopmentPipeline: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="relative z-10 w-[95%] md:w-[90%] max-w-[1400px] h-[90vh] md:h-[85vh] bg-[#1e2320]/55 border border-white/20 backdrop-blur-[12px] rounded-[32px] overflow-hidden flex flex-col pt-10 md:pt-16 pb-8 md:pb-12 px-4 md:px-12 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 flex-shrink-0">
        <span className="bg-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-6 border border-white/20">
          Development Pipeline
        </span>
        <h2 className="text-3xl md:text-5xl text-white font-medium tracking-tight drop-shadow-md">
          From renewable generation to business impact
        </h2>
      </div>

      {/* Pipeline Visualization Area */}
      <div className="relative w-full flex-grow flex items-center justify-center">
        
        {/* Desktop SVG Path */}
        <div className="hidden md:block absolute w-[1190px] h-[550px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 1190 550" className="w-full h-full overflow-visible">
            {/* Base Faint Path */}
            <path 
              d="M 150 250 L 1040 250"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            {/* Active Drawing Path */}
            <path 
              d="M 150 250 L 1040 250"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="3"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - (progress * 100)}
              className="transition-all duration-300 ease-linear"
            />
          </svg>

          {/* Desktop Stages */}
          {STAGES.map((stage, i) => {
            const isActive = progress >= stage.threshold;
            
            return (
              <div 
                key={stage.id}
                className="absolute w-[240px] flex flex-col items-center text-center -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                style={{ left: stage.desktopPos.left, top: stage.desktopPos.top }}
              >
                <div className={`relative w-[200px] h-[200px] rounded-[32px] overflow-hidden mb-6 border transition-all duration-700 ${isActive ? 'border-white/50 scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'border-white/10 scale-100'}`}>
                  <img 
                    src={stage.image} 
                    alt={stage.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'opacity-100 scale-100 filter-none' : 'opacity-40 scale-110 grayscale'}`}
                  />
                  {/* Dark overlay when not active */}
                  <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-60'}`} />
                </div>
                
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-700 ${isActive ? 'text-white' : 'text-white/40'}`}>
                  {stage.title}
                </h3>
                <p className={`text-sm font-medium transition-colors duration-700 ${isActive ? 'text-white/80' : 'text-transparent'}`}>
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile SVG Path & Stages (simplified vertical stack) */}
        <div className="md:hidden absolute inset-0 w-full h-[800px] mt-10">
          <svg viewBox="0 0 300 850" className="w-full h-full overflow-visible absolute top-0 left-0">
             {/* Faint base path */}
             <path 
              d="M 150 100 L 150 900"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            {/* Active drawing path */}
            <path 
              d="M 150 100 L 150 900"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="3"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - (progress * 100)}
              className="transition-all duration-300 ease-linear"
            />
          </svg>

          {STAGES.map((stage) => {
            const isActive = progress >= stage.threshold;
            return (
              <div 
                key={stage.id}
                className="absolute w-full flex items-center gap-6 px-8 transition-all duration-700"
                style={{ top: stage.mobilePos.top, left: 0 }}
              >
                {/* The image sits on the left, centered over x=150 in the SVG space */}
                <div className="w-[120px] flex-shrink-0 flex justify-center ml-[70px]">
                  <div className={`relative w-[100px] h-[100px] rounded-[24px] overflow-hidden border transition-all duration-700 ${isActive ? 'border-white/50 scale-105' : 'border-white/10 scale-100'}`}>
                    <img 
                      src={stage.image} 
                      alt={stage.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'opacity-100 filter-none' : 'opacity-40 grayscale'}`}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <h3 className={`text-xl font-bold mb-1 transition-colors duration-700 ${isActive ? 'text-white' : 'text-white/40'}`}>
                    {stage.title}
                  </h3>
                  <p className={`text-xs font-medium transition-colors duration-700 ${isActive ? 'text-white/80' : 'text-transparent'}`}>
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
