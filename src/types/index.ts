export interface EpochData {
  epoch: number;
  loss: number;
  accuracy: number;
}

export interface TrainingParams {
  learningRate: number;
  batchSize: number;
  epochs: number;
}

export interface ControlPanelProps {
  learningRate: number;
  setLearningRate: (value: number) => void;
  batchSize: number;
  setBatchSize: (value: number) => void;
  epochs: number;
  setEpochs: (value: number) => void;
  simulationSpeed: number;
  setSimulationSpeed: (value: number) => void;
  isTraining: boolean;
  onStart: () => void;
  onStop: () => void;
}

export interface ProgressSectionProps {
  epoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
  isTraining: boolean;
}
