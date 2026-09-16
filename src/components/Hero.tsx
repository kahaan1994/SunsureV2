import React, { useState, useEffect } from 'react';
import { HeroPuzzleAnimation } from './HeroPuzzleAnimation';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const industries = [
  "Data Centres",
  "Pharmaceuticals",
  "Cement",
  "FMCG",
  "Consumer Goods",
];

const IndustryTicker: React.FC<{ index: number }> = ({ index }) => {
  return (
    <span className="inline-flex items-center text-white font-semibold uppercase" style={{ perspective: '1000px' }}>
      <span className="relative inline-grid overflow-hidden align-baseline" style={{ width: 'max-content' }}>
        <span className="invisible whitespace-nowrap px-1">CONSUMABLE GOODS</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: "0%", opacity: 1, scale: 1 }}
            exit={{ y: "-100%", opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 flex items-center justify-center w-full h-full whitespace-nowrap origin-center px-1"
          >
            {industries[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

export const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // start ticker after initial load
    const startDelay = setTimeout(() => {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % industries.length);
      }, 3000);
      return () => clearInterval(timer);
    }, 2000);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] flex items-center justify-center bg-white overflow-hidden">

      {/* Background Puzzle Animation / Synced Videos */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-[2%] md:px-[4%]">
        <div className="w-full max-w-[1920px] relative opacity-90">
          <HeroPuzzleAnimation activeIndex={activeIndex} />
        </div>
      </div>

      {/* Foreground Typography */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="container relative z-10 mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center h-full max-w-6xl"
      >

        <h1 className="text-4xl lg:text-7xl lg:text-[5rem] tracking-tight leading-[1.1] mb-6 drop-shadow-xl px-6 py-2 rounded-2xl flex flex-col items-center justify-center gap-2 lg:gap-4">
          <span className="font-semibold text-white uppercase">LET'S BUILD CLEAN</span>
          <IndustryTicker index={activeIndex} />
        </h1>

        <p className="text-lg lg:text-2xl text-white font-medium mb-7 max-w-4xl leading-relaxed drop-shadow-lg px-6 py-3 rounded-2xl">
          For the visionaries re-architecting the nation's industrial landscape. We construct the giga-scale renewable infrastructure that makes your expansion completely sustainable.
        </p>

        <button className="group inline-flex items-center gap-4 bg-[#2A4838] text-white px-10 py-5 rounded-full text-base font-medium hover:bg-[#1d3227] transition-colors duration-300 shadow-xl pointer-events-auto">
          Explore the Network
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

    </section>
  );
};
