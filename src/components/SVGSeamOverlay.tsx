import React from 'react';
import { puzzlePieces, VIEWBOX_WIDTH, VIEWBOX_HEIGHT } from './PuzzlePaths';

export const SVGSeamOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {puzzlePieces.map((piece) => (
          <path
            key={piece.id}
            d={piece.path}
            fill="none"
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
};
