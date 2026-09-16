import React, { useEffect, useRef, useState } from 'react';
import { DevelopmentPipeline } from './DevelopmentPipeline';
import { MapProjects } from './MapProjects';
import { PIPELINE_VIDEO } from './PuzzlePaths';

export const PipelineAndMapSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [, setIsMapPaused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = rect.height - windowHeight;
      const scrolled = -rect.top;

      let p = scrolled / scrollableDistance;
      p = Math.max(0, Math.min(1, p));

      setProgress(p);

      if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
        // Use requestAnimationFrame for smoother updates if needed, but direct assignment is often sufficient
        videoRef.current.currentTime = p * videoRef.current.duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute local progress for each section
  // Pipeline: 0 to 0.4 maps to 0 to 1
  const pipelineProgress = Math.min(Math.max(progress / 0.4, 0), 1);
  
  // Map: 0.5 to 1.0 maps to 0 to 1
  const mapProgress = Math.min(Math.max((progress - 0.5) / 0.5, 0), 1);

  // Transition Opacity
  // Pipeline finishes at 0.4 (Impact card highlights).
  // Hold for a moment, then fade out pipeline and fade in map between 0.4 and 0.5
  let pipelineOpacity = 1;
  let mapOpacity = 0;

  if (progress > 0.4 && progress < 0.5) {
    const t = (progress - 0.4) / 0.1;
    pipelineOpacity = 1 - t;
    mapOpacity = t;
  } else if (progress >= 0.5) {
    pipelineOpacity = 0;
    mapOpacity = 1;
  }

  return (
    <section ref={containerRef} className="relative w-full h-[600vh] bg-black">

      {/* Sticky Frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">

        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            ref={videoRef}
            src={PIPELINE_VIDEO.videoUrl}
            className="w-full h-full object-cover opacity-100"
            muted
            playsInline
            preload="auto"
          />
          {/* Translucent Dark Layer */}
          <div className="absolute inset-0 bg-[#1a1f1d]/40 backdrop-blur-[2px]" />
        </div>

        {/* Development Pipeline Wrapper */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-75 pt-[72px]"
          style={{ opacity: pipelineOpacity, pointerEvents: pipelineOpacity > 0 ? 'auto' : 'none', zIndex: pipelineOpacity > 0 ? 20 : 10 }}
        >
          <DevelopmentPipeline progress={pipelineProgress} />
        </div>

        {/* Map Projects Wrapper */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-75 pt-[72px]"
          style={{ opacity: mapOpacity, pointerEvents: mapOpacity > 0 ? 'auto' : 'none', zIndex: mapOpacity > 0 ? 20 : 10 }}
        >
          <MapProjects
            scrollProgress={mapProgress}

            setIsPaused={setIsMapPaused}
          />
        </div>

      </div>
    </section>
  );
};
