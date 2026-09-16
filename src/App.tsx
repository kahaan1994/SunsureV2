import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './components/Hero';
import { AdminUpload } from './components/AdminUpload';

import { CommissionedProjects } from './components/CommissionedProjects';
import { Navbar } from './components/Navbar';
import { Metrics } from './components/Metrics';
import { SunsureAdvantage } from './components/SunsureAdvantage';
import { EnergyToImpact } from './components/EnergyToImpact';
import { OurSolutions } from './components/OurSolutions';
import { PipelineAndMapSection } from './components/PipelineAndMapSection';
import { Testimonials } from './components/Testimonials';
import { KnowledgeHub } from './components/KnowledgeHub';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const BaseScrollVideo = () => (
  <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
     <video 
       className="w-full h-full object-cover"
       src="/videos/1789376226005-330391_Lids Screwing Assembling Factory_By_The_Stock_Studio_Artlist_HD.mp4"
       autoPlay loop muted playsInline
     />
     <div className="absolute inset-0 bg-black/40 pointer-events-none" />
  </div>
);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Create subtle parallax/opacity effects on translucent sections
      const sections = gsap.utils.toArray('.translucent-window');
      sections.forEach((section: any) => {
        gsap.fromTo(section, 
          { backgroundColor: 'rgba(255,255,255,0)' },
          { 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              scrub: true
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Base Layer */}
      <BaseScrollVideo />
      
      <Navbar isAdminOpen={showAdmin} onToggleAdmin={() => setShowAdmin(!showAdmin)} />

      {/* Admin Panel Modal */}
      {showAdmin && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative">
            <button 
              onClick={() => setShowAdmin(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-[60]"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-2">
              <AdminUpload />
            </div>
          </div>
        </div>
      )}

      {/* Content Layer Stack */}
      <main className="w-full min-h-screen flex flex-col relative z-10 font-sans pt-[64px] md:pt-[72px]">
        
        {/* S1: Hero (Opaque) */}
        <div className="bg-white relative z-20 shadow-2xl">
          <Hero />
        </div>
        
        {/* S2: Metrics */}
        <div className="bg-white relative z-20">
          <Metrics />
        </div>

        {/* S3 & S4: Unified Pipeline and Map Projects */}
        <div className="relative z-10 w-full">
           <PipelineAndMapSection />
        </div>

        {/* S5: Commissioned Projects (Opaque) */}
        <div className="bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <CommissionedProjects />
        </div>

        {/* S6: Our Solutions */}
        <div className="relative z-20">
           <OurSolutions />
        </div>

        {/* S7: Sunsure Advantage */}
        <div className="bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
           <SunsureAdvantage />
        </div>

        {/* S7.5: Energy To Impact */}
        <div className="bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
           <EnergyToImpact />
        </div>

        {/* S8: Testimonial */}
        <div className="relative z-20">
           <Testimonials />
        </div>

        {/* S9: Knowledge Hub */}
        <div className="relative z-20">
           <KnowledgeHub />
        </div>
        
        {/* S10: Footer */}
        <div className="relative z-20">
           <Footer />
        </div>

      </main>
    </div>
  );
}

export default App;
