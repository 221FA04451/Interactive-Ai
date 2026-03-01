import React, { useState, useEffect } from 'react';
import { ProgressSectionProps } from '@/types';
import { motion } from 'framer-motion';

export default function ProgressSection({
  epoch,
  totalEpochs,
  loss,
  accuracy,
  isTraining,
}: ProgressSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-[#0b0f1a]/80 backdrop-blur-3xl border border-white/5 p-6 rounded-xl h-44" />;
  }
  return (
    <div className="bg-[#0b0f1a]/80 backdrop-blur-3xl border border-white/5 shadow-2xl p-4 md:p-6 rounded-xl flex flex-col h-full relative overflow-hidden group border-t border-t-white/10">
      <h2 className="text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] text-[#00d2ff] uppercase pb-2 border-b border-white/5 mb-4 md:mb-6">
        TRAINING PROGRESS
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 items-center flex-grow">
        {/* Left: Segmented Bars (Reference Match) */}
        <div className="w-full lg:w-[420px] space-y-3">
          {/* Loss Row */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center pr-1">
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40">LOSS</span>
              <span className="bg-[#1e6344] text-[#4ade80] px-2 py-0.5 font-mono rounded-sm text-[10px] md:text-[11px] font-bold border border-[#2a8a5e]">
                {loss.toFixed(3)}
              </span>
            </div>
            <div className="flex gap-[1px] md:gap-[1.5px] h-3 md:h-4">
              {Array.from({ length: 24 }).map((_, i) => {
                const isActive = i < ((100 - loss) / 4.16);
                const isStandby = !isActive && i < 22;
                return (
                  <div
                    key={i}
                    className={`flex-grow h-full rounded-[1px] transition-all duration-300 ${isActive
                      ? 'bg-gradient-to-t from-[#ff8c00] to-[#ffaa00] shadow-[0_0_4px_rgba(255,140,0,0.5)]'
                      : isStandby
                        ? 'bg-[#1e6344]'
                        : 'bg-white/5'
                      }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Accuracy Row */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center pr-1">
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40">ACCURACY</span>
              <span className="bg-[#1e6344] text-[#4ade80] px-2 py-0.5 font-mono rounded-sm text-[10px] md:text-[11px] font-bold border border-[#2a8a5e]">
                {accuracy.toFixed(1)}%
              </span>
            </div>
            <div className="flex gap-[1px] md:gap-[1.5px] h-3 md:h-4">
              {Array.from({ length: 24 }).map((_, i) => {
                const isActive = i < (accuracy / 4.16);
                const isStandby = !isActive && i < 23;
                return (
                  <div
                    key={i}
                    className={`flex-grow h-full rounded-[1px] transition-all duration-300 ${isActive
                      ? 'bg-gradient-to-t from-[#ff8c00] to-[#ffaa00] shadow-[0_0_4px_rgba(255,140,0,0.5)]'
                      : isStandby
                        ? 'bg-[#1e6344]'
                        : 'bg-white/5'
                      }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Vertical Separator (Desktop Only) */}
        <div className="hidden lg:block w-[1px] h-20 bg-white/5 self-center" />
        {/* Horizontal Separator (Mobile Only) */}
        <div className="lg:hidden w-full h-[1px] bg-white/5 my-2" />

        {/* Right: Dense Spiky Waveform */}
        <div className="flex-grow flex flex-col items-center justify-center relative h-full w-full lg:pl-4">
          <div className="flex items-end gap-[1px] md:gap-[2.5px] h-12 md:h-16 mb-3 w-full max-w-[600px] justify-center">
            {Array.from({ length: 60 }).map((_, i) => {
              // Vibrant Gradient: Orange -> Blue -> Green -> Purple
              const color = i < 15 ? '#ffaa00' : i < 30 ? '#00d2ff' : i < 45 ? '#4ade80' : '#aa00ff';
              const baseHeight = isTraining ? 5 : 2;
              return (
                <motion.div
                  key={i}
                  className="w-[1.5px] md:w-[2px] rounded-full"
                  style={{
                    background: color,
                    boxShadow: `0 0 8px ${color}66`
                  }}
                  animate={isTraining ? {
                    height: [
                      Math.random() * 8 + baseHeight,
                      Math.random() * 45 + 15,
                      Math.random() * 8 + baseHeight
                    ],
                    opacity: [0.7, 1, 0.7]
                  } : { height: baseHeight, opacity: 0.3 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.2 + Math.random() * 0.4,
                    ease: "easeInOut",
                    delay: i * 0.005
                  }}
                />
              );
            })}
          </div>

          <div className="text-[9px] md:text-[10px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase flex flex-col items-center gap-1.5">
            {isTraining ? (
              <>
                <span className="text-white opacity-90 animate-pulse">Processing...</span>
                <div className="h-[1px] w-32 md:w-48 bg-white/5 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
              </>
            ) : (
              <span className="text-white/20">System Standby</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
