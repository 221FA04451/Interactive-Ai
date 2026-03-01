"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NeuralNetworkProps {
  loss: number;
  isTraining: boolean;
}

// Config for layers: matching reference image (7, 5, 5)
const layers = [3, 4, 5, 4, 3];

const layerColors = [
  { main: '#00d2ff', glow: 'rgba(0, 210, 255, 0.8)', label: 'INPUT LAYER' },
  { main: '#ffaa00', glow: 'rgba(255, 170, 0, 0.8)', label: 'HIDDEN' },
  { main: '#00d2ff', glow: 'rgba(0, 210, 255, 0.8)', label: 'HIDDEN' },
  { main: '#aa00ff', glow: 'rgba(170, 0, 255, 0.8)', label: 'HIDDEN' },
  { main: '#aa00ff', glow: 'rgba(170, 0, 255, 0.8)', label: 'OUTPUT LAYER' },
];

const NeuralNetwork = React.memo(({ loss, isTraining }: NeuralNetworkProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const glowIntensity = useMemo(() => {
    return Math.max(0.4, Math.min(1.5, 1.8 - (loss / 1.5)));
  }, [loss]);

  if (!mounted) {
    return <div className="relative w-full h-full bg-[#050510]" />;
  }

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden group min-h-[300px] lg:min-h-0 pt-16 pb-10">
      {/* Multi-Layered Horizontal Lighting Flares & Volumetric Rays */}
      <div className="absolute bottom-4 left-0 w-full h-56 pointer-events-none overflow-hidden">
        {/* Intense Deep Atmosphere Glows */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-transparent via-[#ffaa00]/30 via-[#00d2ff]/30 via-[#aa00ff]/30 to-transparent blur-[80px] opacity-90" />
        
        {/* Cinematic Lens Flare Core */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full bg-white opacity-40 blur-2xl" />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-96 h-4 rounded-full bg-white/20 blur-xl" />
        
        {/* Primary Flare Lines - Ultra Intense */}
        <motion.div 
          className="absolute bottom-18 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#ffaa00] via-[#00d2ff] via-[#aa00ff] to-transparent blur-[1px]"
          animate={{ opacity: [0.6, 1, 0.6], scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute bottom-16 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm" />
        
        {/* Volumetric Light Rays */}
        {layers.map((_, i) => (
          <div 
            key={i} 
            className="absolute bottom-0 w-32 h-64 blur-3xl opacity-20"
            style={{ 
              left: `${15 + (i * (70 / (layers.length - 1)))}%`,
              transform: 'translateX(-50%)',
              background: `radial-gradient(ellipse at bottom, ${layerColors[i].main}, transparent 70%)`
            }}
          />
        ))}

        {/* Hotspots beneath each layer */}
        {layers.map((_, i) => (
          <motion.div 
            key={`hotspot-${i}`}
            className="absolute bottom-14 w-8 h-2 rounded-full blur-lg"
            style={{ 
              left: `${15 + (i * (70 / (layers.length - 1)))}%`,
              transform: 'translateX(-50%)',
              backgroundColor: layerColors[i].main,
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
        
        {/* Bokeh Particles / Sparkles - Ultra High Density */}
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 5 + 1,
              height: Math.random() * 5 + 1,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 80}px`,
              background: i % 4 === 0 ? '#ffaa00' : i % 4 === 1 ? '#00d2ff' : i % 4 === 2 ? '#aa00ff' : '#ffffff',
              boxShadow: `0 0 15px ${i % 4 === 0 ? '#ffaa00' : i % 4 === 1 ? '#00d2ff' : i % 4 === 2 ? '#aa00ff' : '#ffffff'}`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.3, 1.5, 0.3],
              y: [0, -40, 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div className="flex-grow flex justify-between items-center px-4 md:px-10 lg:px-20 relative z-10 h-full">
        {layers.map((nodeCount, layerIndex) => (
          <div key={layerIndex} className="flex flex-col justify-center gap-3 md:gap-4 lg:gap-5 h-full relative">
            {/* Elegant Layer Label */}
            <div className="absolute -top-12 md:-top-14 left-1/2 -translate-x-1/2 text-[9px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.5em] whitespace-nowrap opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
              <span style={{ color: layerColors[layerIndex].main }}>
                {layerColors[layerIndex].label}
              </span>
            </div>

            {Array.from({ length: nodeCount }).map((_, nodeIndex) => (
              <div key={nodeIndex} className="relative group/node">
                {/* Hyper-Glossy 3D Sphere */}
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full z-20 relative cursor-pointer"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, #ffffff 0%, #ffffff 10%, ${layerColors[layerIndex].main} 45%, #000000 100%)`,
                    boxShadow: isTraining
                      ? `0 0 ${40 * glowIntensity}px ${layerColors[layerIndex].glow}, inset 0 0 ${20 * glowIntensity}px rgba(255,255,255,0.9)`
                      : `0 0 20px ${layerColors[layerIndex].glow}44, inset 0 0 10px rgba(255,255,255,0.5)`
                  }}
                  whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                  animate={isTraining ? {
                    scale: [1, 1.05, 1],
                    filter: [`brightness(1)`, `brightness(1.3)`, `brightness(1)`],
                  } : {}}
                  transition={{ repeat: Infinity, duration: 2.5, delay: (layerIndex * 0.3) + (nodeIndex * 0.05) }}
                />

                {/* Node Aura */}
                <div
                  className="absolute inset-0 scale-[1.8] blur-2xl opacity-20 pointer-events-none rounded-full"
                  style={{ backgroundColor: layerColors[layerIndex].main }}
                />
              </div>
            ))}
          </div>
        ))}

        {/* Connections Overlay */}
        <Connections isTraining={isTraining} />
      </div>
    </div>
  );
});

NeuralNetwork.displayName = 'NeuralNetwork';
export default NeuralNetwork;

/* ================= CONNECTIONS ================= */

const Connections = React.memo(({ isTraining }: { isTraining: boolean }) => {
  const lines = useMemo(() => {
    const coords = (layerIndex: number, nodeIndex: number, total: number) => {
      const x = 15 + (layerIndex * (70 / (layers.length - 1)));
      const gap = 100 / (total + 1);
      const y = gap * (nodeIndex + 1);
      return { x, y };
    };

    const generated: any[] = [];

    for (let l = 0; l < layers.length - 1; l++) {
      for (let i = 0; i < layers[l]; i++) {
        for (let j = 0; j < layers[l + 1]; j++) {
          const start = coords(l, i, layers[l]);
          const end = coords(l + 1, j, layers[l + 1]);

          generated.push({
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
            color: layerColors[l].main,
            delay: Math.random() * 2.5,
            key: `${l}-${i}-${j}`
          });
        }
      }
    }
    return generated;
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="line-glow-refined">
          <feGaussianBlur stdDeviation="0.3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {lines.map((line) => (
        <React.Fragment key={line.key}>
          <motion.line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth={0.3}
            opacity={0.1}
            filter="url(#line-glow-refined)"
            initial={{ opacity: 0.1 }}
            animate={isTraining ? { opacity: [0.1, 0.4, 0.1] } : { opacity: 0.1 }}
            transition={isTraining ? { repeat: Infinity, duration: 3, delay: line.delay } : { duration: 0.5 }}
          />
          {isTraining && line && (
            <motion.circle
              cx={line.x1}
              cy={line.y1}
              r={0.3}
              fill="#fff"
              initial={{ opacity: 0 }}
              animate={{
                cx: [line.x1, line.x2],
                cy: [line.y1, line.y2],
                opacity: [0, 1, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                delay: line.delay
              }}
            />
          )}
        </React.Fragment>
      ))}
    </svg>
  );
});

Connections.displayName = 'Connections';
