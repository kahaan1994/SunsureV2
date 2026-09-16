import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useReducedMotion, AnimatePresence } from 'framer-motion';
import { puzzlePieces, VIEWBOX_WIDTH, VIEWBOX_HEIGHT } from './PuzzlePaths';
import { VideoPiece } from './VideoPiece';
import { SVGSeamOverlay } from './SVGSeamOverlay';

export const HeroPuzzleAnimation: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const containerControls = useAnimation();
  const shouldReduceMotion = useReducedMotion();
  const [isAssembled, setIsAssembled] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const startIdle = async () => {
      if (shouldReduceMotion) return;
      
      // Wait for immediate dramatic assembly to complete (~2 seconds)
      await new Promise((r) => setTimeout(r, 2000));
      if (!isMounted) return;

      setIsAssembled(true);

      // Living Hero State (6.8s onward) - subtle breathing
      containerControls.start({
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        transition: {
          duration: 6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    };

    startIdle();

    return () => {
      isMounted = false;
    };
  }, [containerControls, shouldReduceMotion]);

  return (
    <motion.div
      animate={containerControls}
      className="relative w-full mx-auto drop-shadow-xl overflow-hidden rounded-3xl"
      style={{ aspectRatio: `${VIEWBOX_WIDTH}/${VIEWBOX_HEIGHT}` }}
    >
      <AnimatePresence>
        {!isAssembled && (
          <motion.div 
            className="absolute inset-0 z-10"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {puzzlePieces.map((piece, index) => (
              <VideoPiece key={piece.id} piece={piece} index={index} />
            ))}
            <SVGSeamOverlay />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="absolute inset-0 bg-zinc-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: isAssembled ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence mode="popLayout">
          <motion.video
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            src={puzzlePieces[activeIndex].videoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        </AnimatePresence>
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};
