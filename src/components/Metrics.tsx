import React from 'react';
import { METRICS_CONFIG } from './PuzzlePaths';

export const Metrics: React.FC = () => {
  return (
    <section className="w-full bg-white py-24 flex flex-col items-center justify-center font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Pill at the top */}
        <div className="flex justify-center mb-16 md:mb-24">
          <span className="bg-[#e4ebdd] text-[#4f6653] px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
            <span className="font-bold">About</span> Sunsure
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-16 lg:gap-24">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center items-start">
            <h2 className="text-[32px] md:text-[40px] text-[#4f6653] font-medium mb-6 leading-[1.1] tracking-tight">
              Powering India's energy independence
            </h2>
            <p className="text-zinc-800 text-[17px] leading-[1.6] mb-10 font-medium">
              As a leading Independent Power Producer (IPP), Sunsure enables businesses across India to embrace clean energy with ease and confidence through long-term Power Purchase Agreements (PPAs) that offset up to 100% of power use to renewable energy through a mix of solar, wind, and battery storage technologies.
            </p>
            <button className="bg-[#2A4838] hover:bg-[#1d3227] text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm shadow-md hover:shadow-lg">
              <span className="font-bold">See</span> all Projects
            </button>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-7/12 flex flex-col gap-4">
            
            {/* Top Full Width Card */}
            <div className="relative w-full h-[260px] md:h-[280px] rounded-[20px] overflow-hidden group bg-zinc-200">
              <img 
                src={METRICS_CONFIG[0].imageUrl} 
                alt="Solar field" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white z-10">
                <h3 className="text-5xl font-medium mb-1 tracking-tight">800+</h3>
                <p className="text-sm font-medium opacity-90 tracking-wide">MW Commissioned</p>
              </div>
            </div>

            {/* Bottom Two Cards */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:h-[260px]">
              
              <div className="relative w-full md:w-1/2 h-[260px] md:h-full rounded-[20px] overflow-hidden group bg-zinc-200">
                <img 
                  src={METRICS_CONFIG[1].imageUrl} 
                  alt="Money and Capital" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white z-10">
                  <h3 className="text-4xl font-medium mb-1 tracking-tight">400+</h3>
                  <p className="text-sm font-medium opacity-90 max-w-[160px] leading-snug tracking-wide">Million USD Raised in Equity Capital</p>
                </div>
              </div>

              <div className="relative w-full md:w-1/2 h-[260px] md:h-full rounded-[20px] overflow-hidden group bg-zinc-200">
                <img 
                  src={METRICS_CONFIG[2].imageUrl} 
                  alt="Happy Industrial Customer" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white z-10">
                  <h3 className="text-4xl font-medium mb-1 tracking-tight">80+</h3>
                  <p className="text-sm font-medium opacity-90 leading-snug tracking-wide">Happy Industrial<br/>Customers</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
