"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { EpochData } from '@/types';
import ControlPanel from './ControlPanel';
import ProgressSection from './ProgressSection';
import LossChart from './LossChart';
import NeuralNetwork from './NeuralNetwork';

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function Dashboard() {
  // Training Parameters State
  const [learningRate, setLearningRate] = useState(0.01);
  const [batchSize, setBatchSize] = useState(32);
  const [epochs, setEpochs] = useState(50);
  const [simulationSpeed, setSimulationSpeed] = useState(100); // 100ms default

  // Training Simulation State
  const [isTraining, setIsTraining] = useState(false);
  const [displayedData, setDisplayedData] = useState<EpochData[]>([]);

  // Ref to track training state and simulation speed for the async loop
  const trainingRef = useRef(isTraining);
  const speedRef = useRef(simulationSpeed);

  useEffect(() => {
    trainingRef.current = isTraining;
  }, [isTraining]);

  useEffect(() => {
    speedRef.current = simulationSpeed;
  }, [simulationSpeed]);

  const handleStart = async () => {
    setIsTraining(true);
    setDisplayedData([]);

    try {
      const response = await fetch('/api/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learningRate, batchSize, epochs }),
      });

      if (!response.ok) throw new Error('Training request failed');

      const data: EpochData[] = await response.json();

      // Animate the data arrival epoch by epoch
      for (let i = 0; i < data.length; i++) {
        // If training was stopped via handleStop, break the loop
        if (!trainingRef.current) break;

        setDisplayedData(prev => [...prev, data[i]]);

        // Dynamic speed based on simulationSpeed state
        await new Promise(resolve => setTimeout(resolve, speedRef.current));
      }
    } catch (error) {
      console.error('Training flow error:', error);
    } finally {
      setIsTraining(false);
    }
  };

  const handleStop = useCallback(() => {
    setIsTraining(false);
  }, []);

  // Calculate current stats from the last item in displayedData
  const currentStat = displayedData.length > 0
    ? displayedData[displayedData.length - 1]
    : { epoch: 0, loss: 0, accuracy: 0 };

  return (
    <div className="min-h-screen bg-[#05070a] text-gray-100 p-4 md:p-6 relative overflow-x-hidden overflow-y-auto font-sans flex flex-col">
      {/* Background 3D Scene */}
      <ThreeScene />

      <header className="mb-6 lg:mb-4 shrink-0 z-10 relative flex justify-center">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-white tracking-[0.2em] md:tracking-[0.4em] uppercase text-center drop-shadow-[0_0_15px_rgba(0,210,255,0.3)]">
          Interactive <span className="text-[#00d2ff]">AI Training</span> Visualizer
        </h1>
      </header>

      {/* Main Container */}
      <div className="flex-grow flex flex-col gap-6 relative z-10 px-0 md:px-4">

        {/* Top Section: Controls, Network, Charts */}
        <div className="flex flex-col lg:flex-row gap-6 lg:flex-grow min-h-0">

          {/* Panel A: Control Panel (Slim Left) */}
          <aside className="w-full lg:w-[300px] shrink-0">
            <ControlPanel
              learningRate={learningRate}
              setLearningRate={setLearningRate}
              batchSize={batchSize}
              setBatchSize={setBatchSize}
              epochs={epochs}
              setEpochs={setEpochs}
              simulationSpeed={simulationSpeed}
              setSimulationSpeed={setSimulationSpeed}
              isTraining={isTraining}
              onStart={handleStart}
              onStop={handleStop}
            />
          </aside>

          {/* Panel D: Neural Network Visualizer (Dominant Center) */}
          <main className="w-full flex-grow min-h-[320px] lg:h-full">
            <NeuralNetwork
              loss={currentStat.loss}
              isTraining={isTraining}
            />
          </main>

          {/* Panel B: Loss Chart (Slim Right) */}
          <aside className="w-full lg:w-[340px] shrink-0">
            <LossChart
              data={displayedData}
              currentStat={{
                epoch: currentStat.epoch,
                totalEpochs: epochs,
                loss: currentStat.loss,
                accuracy: currentStat.accuracy
              }}
            />
          </aside>

        </div>

        {/* Bottom Section: Progress Tracking */}
        <div className="w-full h-auto lg:h-44 shrink-0 pb-6 lg:pb-0">
          <ProgressSection
            epoch={currentStat.epoch}
            totalEpochs={epochs}
            loss={currentStat.loss}
            accuracy={currentStat.accuracy}
            isTraining={isTraining}
          />
        </div>

      </div>
    </div>
  );
}
