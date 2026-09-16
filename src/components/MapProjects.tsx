import React, { useEffect, useState, useRef } from 'react';

const PROJECTS_CONFIG = [
  { state: "Rajasthan", stateId: "Rajasthan", mw: "526 MWh", projectType: "Storage", labelSide: "left", labelOffsetX: -90, labelOffsetY: -50 },
  { state: "Rajasthan", stateId: "Rajasthan", mw: "1,700 MW", projectType: "Solar", labelSide: "left", labelOffsetX: -80, labelOffsetY: 10 },
  { state: "Uttar Pradesh", stateId: "Uttar_Pradesh", mw: "570 MWh", projectType: "Storage", labelSide: "right", labelOffsetX: 80, labelOffsetY: -60 },
  { state: "Uttar Pradesh", stateId: "Uttar_Pradesh", mw: "500 MW", projectType: "Solar", labelSide: "right", labelOffsetX: 90, labelOffsetY: -10 },
  { state: "Gujarat", stateId: "Gujarat", mw: "1,050 MW", projectType: "Solar & Wind", labelSide: "left", labelOffsetX: -90, labelOffsetY: 40 },
  { state: "Maharashtra", stateId: "Maharashtra", mw: "830 MW", projectType: "Solar", labelSide: "left", labelOffsetX: -100, labelOffsetY: 60 },
  { state: "Karnataka", stateId: "Karnataka", mw: "830 MW", projectType: "Solar", labelSide: "left", labelOffsetX: -90, labelOffsetY: 90 },
  { state: "Telangana", stateId: "Telangana", mw: "950 MW", projectType: "Solar", labelSide: "right", labelOffsetX: 80, labelOffsetY: 30 },
  { state: "Tamil Nadu", stateId: "Tamil_Nadu", mw: "950 MW", projectType: "Wind & Solar", labelSide: "right", labelOffsetX: 80, labelOffsetY: 90 },
];

const AnimatedNumber: React.FC<{ value: number; decimals?: number; suffix?: string; duration?: number }> = ({ value, decimals = 0, suffix = '', duration = 2000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(easeProgress * value);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <>{current.toFixed(decimals)}{suffix}</>;
};

export const MapProjects: React.FC<{ scrollProgress: number; isPaused: boolean; setIsPaused: (val: boolean) => void }> = ({ scrollProgress, isPaused, setIsPaused }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [centroids, setCentroids] = useState<Record<string, { x: number, y: number }>>({});
  const [activeStep, setActiveStep] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Load SVG
  useEffect(() => {
    fetch('/india_states_tagged.svg')
      .then(r => r.text())
      .then(text => {
        // Prepare SVG for insertion
        let modified = text.replace(/<svg /, '<svg class="w-full h-full max-h-[70vh] object-contain drop-shadow-xl map-svg-root" preserveAspectRatio="xMidYMid meet" ');
        // Remove any white background rects
        modified = modified.replace(/<rect[^>]*>/g, '');
        // We will manage fill colors via CSS classes instead of inline fills to allow transitions
        modified = modified.replace(/fill="[^"]*"/g, '');
        setSvgContent(modified);
      });
  }, []);

  // Calculate Centroids once SVG is in DOM
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    // Slight delay to ensure DOM has rendered the SVG so getBBox works
    const timer = setTimeout(() => {
      const svgEl = containerRef.current?.querySelector('svg.map-svg-root') as SVGSVGElement;
      if (svgEl) {
        svgRef.current = svgEl;
        const newCentroids: Record<string, { x: number, y: number }> = {};

        PROJECTS_CONFIG.forEach(project => {
          const path = svgEl.querySelector(`#${project.stateId}`) as SVGGraphicsElement;
          if (path) {
            const bbox = path.getBBox();
            // Centroid relative to SVG viewBox
            newCentroids[project.stateId] = {
              x: bbox.x + bbox.width / 2,
              y: bbox.y + bbox.height / 2
            };
          }
        });
        setCentroids(newCentroids);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [svgContent]);



  // Compute active step based on scroll progress
  useEffect(() => {
    // There are config.length (9) + 1 (aggregate) = 10 states. 
    // State 0 to 9.
    const computedStep = Math.min(Math.floor(scrollProgress * (PROJECTS_CONFIG.length + 1)), PROJECTS_CONFIG.length);
    setActiveStep(computedStep);
  }, [scrollProgress]);

  // Update SVG Path classes based on active state
  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll('path');

    // Reset all
    paths.forEach(p => {
      p.classList.remove('state-active');
      p.classList.add('state-default');
    });

    if (activeStep < PROJECTS_CONFIG.length) {
      const activeId = PROJECTS_CONFIG[activeStep].stateId;
      const path = svgRef.current.querySelector(`#${activeId}`) as SVGPathElement;
      if (path) {
        path.classList.remove('state-default');
        path.classList.add('state-active');
      }
    } else {
      // Aggregate frame: all 16 highlighted
      PROJECTS_CONFIG.forEach(project => {
        const path = svgRef.current?.querySelector(`#${project.stateId}`) as SVGPathElement;
        if (path) {
          path.classList.remove('state-default');
          path.classList.add('state-active');
        }
      });
    }
  }, [activeStep, svgContent]);

  const isAggregate = activeStep === PROJECTS_CONFIG.length;

  return (
    <div ref={containerRef} className="relative z-10 w-[95%] md:w-[90%] max-w-[1400px] h-[90vh] md:h-[85vh] bg-[#1e2320]/55 border border-white/20 backdrop-blur-[12px] rounded-[32px] overflow-hidden flex flex-col pt-10 md:pt-16 pb-8 md:pb-12 px-4 md:px-12 shadow-2xl mx-auto my-auto">

      {/* Styles for Map & Animations */}
      <style>{`
        .state-default {
          fill: #4f6653;
          transition: fill 0.9s ease;
          stroke: rgba(255, 255, 255, 0.4);
          stroke-width: 1px;
        }
        .state-active {
          fill: #8faf86;
          transition: fill 0.9s ease;
          stroke: #ffffff;
          stroke-width: 1.5px;
        }
        .state-hoverable:hover {
          fill: #8faf86 !important;
          cursor: pointer;
        }
        
        @keyframes pinPulse {
          0% { transform: scale(0.4); opacity: 1; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .pin-ring {
          animation: pinPulse 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        .leader-line {
          stroke: rgba(255,255,255,0.6);
          stroke-width: 1.5px;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
        }
        .leader-line.drawn {
          stroke-dashoffset: 0;
        }

        .project-label {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease 0.6s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s;
        }
        .project-label.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="flex flex-col items-center text-center mb-8 flex-shrink-0">
        <span className="bg-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-6 border border-white/20">
          Our Projects
        </span>
        <h2 className="text-3xl md:text-5xl text-white font-medium tracking-tight text-center drop-shadow-md">
          Portfolio of distributed renewable energy assets
        </h2>
      </div>

      {/* Split Layout */}
      <div className="relative w-full flex-grow flex flex-col md:flex-row items-stretch overflow-hidden">

        {/* LEFT: Statistics (Fades in mostly during Aggregate Frame) */}
        <div className="w-full md:w-1/3 p-10 md:p-14 flex flex-col justify-center relative z-20 bg-gradient-to-r from-black/20 to-transparent">

          <div className={`transition-opacity duration-1000 flex flex-col h-full justify-center opacity-100`}>
            <div className="flex items-start gap-8 mb-10">
              <div>
                <h3 className="text-6xl font-semibold text-white mb-2 tracking-tighter">
                  <AnimatedNumber value={8.3} decimals={1} suffix="+" />
                </h3>
                <p className="text-white text-lg font-medium">GW Pipeline</p>
              </div>
              <div className="w-px h-16 bg-white/20 mt-2"></div>
              <div>
                <h3 className="text-6xl font-semibold text-white mb-2 tracking-tighter">
                  <AnimatedNumber value={16} suffix="+" />
                </h3>
                <p className="text-white text-lg font-medium">Indian States<br />Covered</p>
              </div>
            </div>

            <p className="text-white text-base leading-relaxed mb-10 max-w-sm">
              Sunsure Energy's commercial, industrial, and institutional customers have improved their bottom line by transitioning to renewable energy.
            </p>

            <button className="self-start bg-[#2A4838] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#1d3227] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Explore More
            </button>
          </div>

        </div>

        {/* RIGHT: Interactive SVG Map */}
        <div
          className="w-full md:w-2/3 relative p-4 md:p-8 flex items-center justify-center min-h-[400px]"
        >
          {/* Map SVG injection */}
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            className="w-full h-full relative z-10"
          />

          {/* Dynamic Overlays: Pins, Lines, Labels */}
          {svgRef.current && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 2000 2000" // Must match the India SVG viewBox! Assuming 2000x2000 as per prompt
              preserveAspectRatio="xMidYMid meet"
            >
              {PROJECTS_CONFIG.map((project, index) => {
                const isActive = activeStep === index || isAggregate;
                const centroid = centroids[project.stateId];

                if (!centroid) return null;

                // Leader line endpoints
                const endX = centroid.x + project.labelOffsetX * 2.5; // Scale offset to viewBox space roughly
                const endY = centroid.y + project.labelOffsetY * 2.5;

                return (
                  <g key={`${project.stateId}-${index}`} className={isActive ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 0.3s' }}>

                    {/* Leader Line */}
                    <line
                      x1={centroid.x} y1={centroid.y}
                      x2={endX} y2={endY}
                      className={`leader-line ${isActive ? 'drawn' : ''}`}
                    />

                    {/* Pin outer pulse */}
                    {isActive && !isAggregate && (
                      <circle
                        cx={centroid.x} cy={centroid.y} r="20"
                        fill="none" stroke="#ffffff" strokeWidth="2"
                        className="pin-ring"
                        style={{ transformOrigin: `${centroid.x}px ${centroid.y}px` }}
                      />
                    )}

                    {/* Pin center dot */}
                    <circle
                      cx={centroid.x} cy={centroid.y} r="8"
                      fill="#ffffff"
                      className="drop-shadow-md"
                    />

                    {/* SVG Text Label (using foreignObject for clean HTML formatting) */}
                      <foreignObject
                        x={project.labelSide === 'left' ? endX - 220 : endX + 10}
                        y={endY - 60}
                        width="200" height="150"
                        className={`project-label ${isActive ? 'visible' : ''}`}
                      >
                        <div className={`flex flex-col ${project.labelSide === 'left' ? 'items-end text-right' : 'items-start text-left'}`}>
                          {(() => {
                            const [powerVal, ...unitParts] = project.mw.split(' ');
                            const powerUnit = unitParts.join(' ');
                            return (
                              <>
                                <span className="text-6xl font-bold tracking-tight text-white drop-shadow-md leading-none">{powerVal}</span>
                                <span className="text-4xl font-black text-white drop-shadow-md tracking-wider mt-1">{powerUnit}</span>
                              </>
                            );
                          })()}
                        </div>
                      </foreignObject>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Bottom Progress Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
          {PROJECTS_CONFIG.map((project, i) => (
            <button
              key={i}
              onClick={() => { setActiveStep(i); setIsPaused(true); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === i ? 'bg-[#8faf86] scale-125' : 'bg-white/30 hover:bg-white/50'}`}
              aria-label={`Show ${project.state}`}
            />
          ))}
          <button
            onClick={() => { setActiveStep(PROJECTS_CONFIG.length); setIsPaused(true); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${isAggregate ? 'bg-[#8faf86] scale-125' : 'bg-white/30 hover:bg-white/50'}`}
            aria-label="Show All Projects"
          />
        </div>

      </div>

    </div>
  );
};
