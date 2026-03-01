"use client";

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { EpochData } from '@/types';

interface LossChartProps {
  data: EpochData[];
  currentStat?: {
    epoch: number;
    totalEpochs: number;
    loss: number;
    accuracy: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/20 p-3 rounded-lg shadow-2xl text-[10px] backdrop-blur-xl">
        <p className="text-gray-400 mb-1 font-bold uppercase tracking-widest">Epoch {label}</p>
        <div className="space-y-1 font-mono">
          <p className="text-orange-400">Loss: {payload[0].value.toFixed(4)}</p>
          {payload[1] && <p className="text-green-400">Accuracy: {payload[1].value.toFixed(1)}%</p>}
        </div>
      </div>
    );
  }
  return null;
};

export default function LossChart({ data, currentStat }: LossChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-[#0b0f1a]/80 backdrop-blur-3xl border border-white/5 shadow-2xl p-4 md:p-6 rounded-xl flex flex-col gap-4 md:gap-6 h-full min-h-[250px] lg:min-h-0">
        <div className="flex justify-between items-start border-b border-white/5 pb-2 mb-2 lg:mb-4">
          <div className="h-4 w-32 bg-white/5 animate-pulse rounded" />
        </div>
        <div className="flex-grow bg-white/5 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="bg-[#0b0f1a]/80 backdrop-blur-3xl border border-white/5 shadow-2xl p-4 md:p-6 rounded-xl flex flex-col gap-4 md:gap-5 h-full border-t border-t-white/10 min-h-[450px] lg:min-h-0">
      <div className="flex justify-between items-start border-b border-white/5 pb-1 mb-1 lg:mb-2">
        <h2 className="text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] text-white uppercase flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff4b4b] shadow-[0_0_10px_rgba(255,75,75,0.6)] animate-pulse" />
          LOSS OVER TIME
        </h2>
      </div>

      <div className="flex-grow w-full relative">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <LineChart data={data} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="1 1" stroke="#222" vertical={true} />
            <XAxis
              dataKey="epoch"
              stroke="#444"
              tick={{ fontSize: 9, fill: '#eee' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            {/* Loss Y-Axis */}
            <YAxis
              yAxisId="left"
              stroke="#444"
              tick={{ fontSize: 9, fill: '#eee' }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            {/* Accuracy Y-Axis */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#444"
              tick={{ fontSize: 9, fill: '#eee' }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              hide={true} // Hide axis but keep for scaling
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', paddingTop: '0px' }}
            />

            {/* Teal Reference Line (Ideal Decay) */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={() => 90} // Dummy for dashed line or compute decay
              stroke="#00d2ff"
              strokeWidth={1}
              strokeDasharray="3 3"
              dot={false}
              name="Ideal Reference"
              opacity={0.3}
            />

            {/* Actual Jittery Orange Loss Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="loss"
              name="Loss"
              stroke="#ff8c00"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, fill: '#ff8c00' }}
              animationDuration={0}
              filter="drop-shadow(0 0 5px rgba(255,140,0,0.5))"
            />

            {/* Smooth Green Accuracy Line */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="accuracy"
              name="Accuracy"
              stroke="#4ade80"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, fill: '#4ade80' }}
              animationDuration={0}
              filter="drop-shadow(0 0 5px rgba(74,222,128,0.5))"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Integrated into Chart Area */}
      {currentStat && (
        <div className="mt-2 md:mt-4 pt-4 border-t border-white/5 space-y-2 font-mono">
          <div className="flex justify-between items-center text-[9px] md:text-[10px] tracking-widest text-white/90 uppercase font-black">
            <span>Epoch:</span>
            <span className="text-white font-bold">{currentStat.epoch} / {currentStat.totalEpochs}</span>
          </div>
          <div className="flex justify-between items-center text-[9px] md:text-[10px] tracking-widest text-white/90 uppercase font-black">
            <span>Loss:</span>
            <span className="text-[#00d2ff] font-bold">{currentStat.loss.toFixed(3)}</span>
          </div>
          <div className="flex justify-between items-center text-[9px] md:text-[10px] tracking-widest text-white/90 uppercase font-black">
            <span>Accuracy:</span>
            <span className="text-[#4ade80] font-black">{currentStat.accuracy.toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
