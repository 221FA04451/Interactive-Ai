import { NextResponse } from 'next/server';

interface TrainRequest {
  learningRate: number;
  batchSize: number;
  epochs: number;
}

export async function POST(request: Request) {
  try {
    const body: TrainRequest = await request.json();
    const { learningRate, batchSize, epochs } = body;

    // Validate inputs
    if (!learningRate || !batchSize || !epochs) {
      return NextResponse.json(
        { error: 'Missing required parameters: learningRate, batchSize, epochs' },
        { status: 400 }
      );
    }

    const trainingData = generateTrainingData(epochs, learningRate);
    
    // Simulate processing delay based on epochs (optional, for realism)
    // await new Promise(resolve => setTimeout(resolve, epochs * 10));

    return NextResponse.json(trainingData);
  } catch (error) {
    console.error('Training simulation error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

function generateTrainingData(epochs: number, learningRate: number) {
  const data = [];
  let currentLoss = 2.5; // Starting high loss
  let currentAccuracy = 10.0; // Starting low accuracy

  for (let i = 0; i < epochs; i++) {
    // Loss decreases over time, influenced by learning rate (simplified simulation)
    // A very high learning rate might cause oscillation or slower convergence in real life,
    // but here we'll keep it simple for visualization.
    // progress variable removed as it was unused in logic calculation
    // const progress = (i + 1) / epochs;
    
    // Simulate loss reduction curve (exponential decay)
    const decayFactor = 0.1 + (learningRate * 5); // heavily influenced by learning rate
    const randomNoise = (Math.random() - 0.5) * 0.1;
    
    // Calculate new loss
    // Using a simple decay formula: Loss = initial * e^(-decay * progress)
    // Adding some randomness
    let stepLoss = currentLoss * Math.exp(-decayFactor * (1 / epochs) * 10) + randomNoise;
    
  // Ensure loss doesn't go below 0
    stepLoss = Math.max(0.001, stepLoss);
    
    // Update current loss for next iteration
    currentLoss = stepLoss;

    // Calculate accuracy (inverse relation to loss generally)
    // Map loss 2.5 -> ~10%, loss 0.01 -> ~99%
    const accuracyNoise = (Math.random() - 0.5) * 5;
    let stepAccuracy = 100 - (stepLoss * 30) + accuracyNoise;
    
    // Clamp accuracy between 0 and 100
    stepAccuracy = Math.min(99.9, Math.max(0.1, stepAccuracy));
    currentAccuracy = stepAccuracy;

    data.push({
      epoch: i + 1,
      loss: Number(currentLoss.toFixed(4)),
      accuracy: Number(currentAccuracy.toFixed(1))
    });
  }
  
  return data;
}
