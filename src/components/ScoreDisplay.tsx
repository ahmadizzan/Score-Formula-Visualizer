import React from 'react';
import { FormulaType, Signal } from './FormulaVisualizer';
import { getFormulaLabel, getFormulaDescription } from '../utils/formulas';
import { generateSignalColor } from '../utils/colors';
interface ScoreDisplayProps {
  score: number;
  formulaType: FormulaType;
  signals: Signal[];
  depth?: number;
}
export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  formulaType,
  signals,
  depth = 0
}) => {
  const formulaLabel = getFormulaLabel(formulaType);
  const formulaDescription = getFormulaDescription(formulaType);
  const renderSignalValue = (signal: Signal) => {
    const color = generateSignalColor(signal.id);
    if (signal.isFormula && signal.formulaType && signal.signals) {
      return <div className="relative pl-4 py-1">
          <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{
          backgroundColor: color
        }}></div>
          {renderFormulaVisualization(signal.formulaType, signal.signals, signal.value)}
        </div>;
    }
    return <span style={{
      color
    }}>
        {signal.value.toFixed(2)}
        {signal.weight !== 1 && <span className="text-gray-500 text-sm ml-1">
            (×{signal.weight.toFixed(1)})
          </span>}
      </span>;
  };
  // Generate formula visualization based on formula type
  const renderFormulaVisualization = (type: FormulaType, sigs: Signal[], result: number) => {
    switch (type) {
      case 'arithmeticMean':
        return <div className="text-lg">
            (
            {sigs.map((signal, idx) => <span key={signal.id}>
                {renderSignalValue(signal)}
                {idx < sigs.length - 1 ? ' + ' : ''}
              </span>)}
            ) / {sigs.reduce((acc, s) => acc + s.weight, 0).toFixed(1)} ={' '}
            <span className="font-bold text-blue-700">{result.toFixed(2)}</span>
          </div>;
      case 'harmonicMean':
        return <div className="text-lg">
            {sigs.reduce((acc, s) => acc + s.weight, 0).toFixed(1)} / (
            {sigs.map((signal, idx) => <span key={signal.id}>
                {signal.weight !== 1 && `${signal.weight.toFixed(1)}×`}(1/
                {renderSignalValue(signal)}){idx < sigs.length - 1 ? ' + ' : ''}
              </span>)}
            ) ={' '}
            <span className="font-bold text-blue-700">{result.toFixed(2)}</span>
          </div>;
      case 'probabilisticOr':
        return <div className="text-lg">
            1 - (
            {sigs.map((signal, idx) => <span key={signal.id}>
                (1-{renderSignalValue(signal)})
                <sup>
                  {(signal.weight / sigs.reduce((acc, s) => acc + s.weight, 0)).toFixed(2)}
                </sup>
                {idx < sigs.length - 1 ? ' × ' : ''}
              </span>)}
            ) ={' '}
            <span className="font-bold text-blue-700">{result.toFixed(2)}</span>
          </div>;
      default:
        return null;
    }
  };
  const renderSignalContribution = (signal: Signal, isNested = false) => {
    const color = generateSignalColor(signal.id);
    return <div key={signal.id} className={`bg-gray-50 p-3 rounded-md border border-gray-200 ${isNested ? 'ml-4 mt-2' : ''}`} style={{
      borderLeftColor: color,
      borderLeftWidth: '4px'
    }}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-500">{signal.name}</div>
          <div className="flex items-center gap-2">
            {signal.weight !== 1 && <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                Weight: {signal.weight.toFixed(1)}
              </div>}
            {signal.isFormula && <div className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                {getFormulaLabel(signal.formulaType!)}
              </div>}
          </div>
        </div>
        <div className="font-medium" style={{
        color
      }}>
          {signal.value.toFixed(2)}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div className="h-2 rounded-full" style={{
          width: `${signal.value * 100}%`,
          backgroundColor: color
        }}></div>
        </div>
        {signal.isFormula && signal.signals && <div className="mt-2 border-t border-gray-200 pt-2">
            <div className="text-xs text-gray-500 mb-2">Sub-signals:</div>
            {signal.signals.map(subSignal => renderSignalContribution(subSignal, true))}
          </div>}
      </div>;
  };
  return <div className={`${depth > 0 ? 'pl-4' : ''}`}>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Score Result</h2>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">{formulaLabel}</span>
          <div className="text-3xl font-bold text-blue-700">
            {score.toFixed(2)}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-blue-600 h-4 rounded-full transition-all duration-500" style={{
          width: `${score * 100}%`
        }}></div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Formula Breakdown
        </h3>
        <p className="text-gray-600 mb-4">{formulaDescription}</p>
        <div className="p-4 bg-gray-50 rounded-lg">
          {renderFormulaVisualization(formulaType, signals, score)}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Signal Contributions
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {signals.map(signal => renderSignalContribution(signal))}
        </div>
      </div>
    </div>;
};