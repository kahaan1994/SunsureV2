import React, { useEffect } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { VIEWBOX_WIDTH, VIEWBOX_HEIGHT, OVERLAY_OPACITY } from './PuzzlePaths';

interface VideoPieceProps {
  piece: {
    id: string;
    path: string;
    clipPolygon: string;
    videoUrl: string;
    initialOffset: { x: number; y: number; rotate: number };
    color?: string;
    bbox: { x: number; y: number; w: number; h: number };
  };
  index: number;
}

export const VideoPiece: React.FC<VideoPieceProps> = ({ piece, index }) => {
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      if (shouldReduceMotion) {
        controls.set({ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' });
        return;
      }

      // Initial state - start dramatically further out with blur
      controls.set({
        opacity: 0,
        scale: 0.7,
        x: piece.initialOffset.x * 3, // Multiply offset for more drama
        y: piece.initialOffset.y * 3,
        rotate: piece.initialOffset.rotate * 2,
        filter: 'blur(10px)',
      });

      // Dramatic assembly: stagger slightly, but move fast with a bouncy spring
      await new Promise((r) => setTimeout(r, 100 + index * 80));
      if (!isMounted) return;

      controls.start({
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
        filter: 'blur(0px)',
        transition: {
          opacity: { duration: 0.6, ease: "easeOut" },
          filter: { duration: 0.6, ease: "easeOut" },
          default: {
            type: 'spring',
            stiffness: 70,
            damping: 14,
            mass: 1.2,
            restDelta: 0.001,
          }
        },
      });
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, [controls, index, piece.initialOffset, shouldReduceMotion]);

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      initial={false}
      animate={controls}
      style={{
        clipPath: `polygon(${piece.clipPolygon})`,
        WebkitClipPath: `polygon(${piece.clipPolygon})`,
        transformOrigin: 'center center',
        backgroundColor: piece.color || '#e5e7eb',
      }}
    >
      <video
        className="absolute object-cover"
        src={piece.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        style={{
          left: `${(piece.bbox.x / VIEWBOX_WIDTH) * 100}%`,
          top: `${(piece.bbox.y / VIEWBOX_HEIGHT) * 100}%`,
          width: `${(piece.bbox.w / VIEWBOX_WIDTH) * 100}%`,
          height: `${(piece.bbox.h / VIEWBOX_HEIGHT) * 100}%`,
          objectFit: 'cover',
        }}
      />
      {/* Dynamic Black Overlay for Contrast */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: OVERLAY_OPACITY }}
      />
      {/* Subtle inner shadow/depth for the piece */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] mix-blend-multiply" />
    </motion.div>
  );
};
