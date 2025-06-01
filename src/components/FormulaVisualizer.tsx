import React, { useEffect, useState } from 'react';
import { FormulaSelector } from './FormulaSelector';
import { SignalConfiguration } from './SignalConfiguration';
import { ScoreDisplay } from './ScoreDisplay';
import { calculateScore } from '../utils/formulas';
export type Signal = {
  id: string;
  name: string;
  value: number;
  weight: number;
  isFormula: boolean;
  formulaType?: FormulaType;
  signals?: Signal[];
};
export type FormulaType = 'arithmeticMean' | 'harmonicMean' | 'probabilisticOr';
export const FormulaVisualizer: React.FC = () => {
  const [formulaType, setFormulaType] = useState<FormulaType>('arithmeticMean');
  const [signals, setSignals] = useState<Signal[]>([{
    id: '1',
    name: 'Signal 1',
    value: 0.7,
    weight: 1,
    isFormula: false
  }, {
    id: '2',
    name: 'Signal 2',
    value: 0.5,
    weight: 1,
    isFormula: false
  }]);
  const [score, setScore] = useState<number>(0);
  useEffect(() => {
    const newScore = calculateScore(formulaType, signals);
    setScore(newScore);
  }, [formulaType, signals]);
  const handleFormulaChange = (type: FormulaType) => {
    setFormulaType(type);
  };
  const handleSignalsChange = (updatedSignals: Signal[]) => {
    setSignals(updatedSignals);
  };
  return <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Formula Score Visualizer
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <FormulaSelector selectedFormula={formulaType} onFormulaChange={handleFormulaChange} />
          </div>
          <div className="lg:col-span-2">
            <SignalConfiguration signals={signals} onSignalsChange={handleSignalsChange} />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ScoreDisplay score={score} formulaType={formulaType} signals={signals} />
      </div>
    </div>;
};