"use client";

import React from 'react';
import { ControlPanelProps } from '@/types';
import { motion } from 'framer-motion';

export default function ControlPanel({
  learningRate,
  setLearningRate,
  batchSize,
  setBatchSize,
  epochs,
  setEpochs,
  simulationSpeed,
  setSimulationSpeed,
  isTraining,
  onStart,
  onStop,
}: ControlPanelProps) {
  return (
    <div className="bg-[#0b0f1a]/80 backdrop-blur-3xl border border-white/5 shadow-2xl p-3 md:p-4 rounded-xl flex flex-col gap-3 md:gap-4 min-h-[300px] md:h-full border-t border-t-white/10">
      <h2 className="text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] text-[#00d2ff] uppercase pb-1.5 border-b border-white/5 font-bold">
        TRAINING PARAMETERS
      </h2>

      <div className="space-y-4 md:space-y-5 flex-grow">
        {/* Learning Rate Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black tracking-widest text-[#00d2ff]/80 uppercase">
            <span>Learning Rate:</span>
            <span className="text-white font-mono text-xs">{learningRate}</span>
          </div>
          <div className="relative h-8 flex items-center group">
            <div className="absolute w-full h-[2px] bg-white/10 rounded-full" />
            <div
              className="absolute h-[2px] bg-[#00d2ff] rounded-full shadow-[0_0_8px_rgba(0,210,255,0.6)]"
              style={{ width: `${(learningRate / 0.1) * 100}%` }}
            />
            <input
              id="learningRate"
              name="learningRate"
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              disabled={isTraining}
              className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 h-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)] 
              [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110"
            />
          </div>
        </div>

        {/* Batch Size Dropdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black tracking-widest text-[#00d2ff]/80 uppercase">
            <span>Batch Size:</span>
          </div>
          <div className="relative">
            <select
              id="batchSize"
              name="batchSize"
              value={batchSize}
              onChange={(e) => setBatchSize(parseInt(e.target.value))}
              disabled={isTraining}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-white text-xs font-mono outline-none focus:border-[#00d2ff]/50 transition-all appearance-none cursor-pointer hover:bg-white/10"
            >
              {[8, 16, 32, 64, 128].map((size) => (
                <option key={size} value={size} className="bg-[#0b0f1a] text-white">
                  {size} Units
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Epochs Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black tracking-widest text-[#00d2ff]/80 uppercase">
            <span>Epochs:</span>
            <span className="text-white font-mono text-xs">{epochs}</span>
          </div>
          <div className="relative h-8 flex items-center group">
            <div className="absolute w-full h-[2px] bg-white/10 rounded-full" />
            <div
              className="absolute h-[2px] bg-[#00d2ff] rounded-full shadow-[0_0_8px_rgba(0,210,255,0.6)]"
              style={{ width: `${(epochs / 200) * 100}%` }}
            />
            <input
              id="epochs"
              name="epochs"
              type="range"
              min="10"
              max="200"
              step="10"
              value={epochs}
              onChange={(e) => setEpochs(parseInt(e.target.value))}
              disabled={isTraining}
              className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 h-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)] 
              [&::-webkit-slider-thumb]:border-none"
            />
          </div>
        </div>

        {/* Simulation Speed Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black tracking-widest text-[#aa00ff] uppercase">
            <span>Simulation Speed:</span>
            <span className="text-white font-mono text-[10px]">
              {simulationSpeed <= 50 ? 'FAST' : simulationSpeed >= 150 ? 'SLOW' : 'NORMAL'}
            </span>
          </div>
          <div className="relative h-8 flex items-center group">
            <div className="absolute w-full h-[2px] bg-white/10 rounded-full" />
            <div
              className="absolute h-[2px] bg-[#aa00ff] rounded-full shadow-[0_0_8px_rgba(170,0,255,0.6)]"
              style={{ width: `${((200 - simulationSpeed) / 190) * 100}%` }}
            />
            <input
              id="simulationSpeed"
              name="simulationSpeed"
              type="range"
              min="10"
              max="200"
              step="10"
              value={210 - simulationSpeed}
              onChange={(e) => setSimulationSpeed(210 - parseInt(e.target.value))}
              className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 h-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)] 
              [&::-webkit-slider-thumb]:border-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <motion.button
          onClick={isTraining ? onStop : onStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-lg font-black text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase transition-all duration-500 relative overflow-hidden group/btn 
            ${isTraining
              ? 'bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
              : 'bg-gradient-to-br from-[#22c55e] via-[#4ade80] to-[#22c55e] text-[#052e16] shadow-[0_0_30px_rgba(34,197,94,0.4)]'
            }`}
        >
          {/* Glass Gloss Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40" />
          
          <span className="relative z-10 drop-shadow-sm">
            {isTraining ? 'STOP TRAINING' : 'START TRAINING'}
          </span>
          
          {!isTraining && (
            <motion.div 
              className="absolute inset-0 bg-white/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}
