import { FormulaType, Signal } from '../components/FormulaVisualizer';
export function calculateScore(formulaType: FormulaType, signals: Signal[]): number {
  if (signals.length === 0) return 0;
  // First calculate any nested formulas
  const resolvedSignals = signals.map(signal => {
    if (signal.isFormula && signal.formulaType && signal.signals) {
      return {
        ...signal,
        value: calculateScore(signal.formulaType, signal.signals)
      };
    }
    return signal;
  });
  switch (formulaType) {
    case 'arithmeticMean':
      return weightedArithmeticMean(resolvedSignals);
    case 'harmonicMean':
      return weightedHarmonicMean(resolvedSignals);
    case 'probabilisticOr':
      return weightedProbabilisticOr(resolvedSignals);
    default:
      return 0;
  }
}
function weightedArithmeticMean(signals: Signal[]): number {
  const totalWeight = signals.reduce((acc, signal) => acc + signal.weight, 0);
  if (totalWeight === 0) return 0;
  const weightedSum = signals.reduce((acc, signal) => acc + signal.value * signal.weight, 0);
  return weightedSum / totalWeight;
}
function weightedHarmonicMean(signals: Signal[]): number {
  const validSignals = signals.filter(signal => signal.value > 0);
  if (validSignals.length === 0) return 0;
  const totalWeight = validSignals.reduce((acc, signal) => acc + signal.weight, 0);
  if (totalWeight === 0) return 0;
  const weightedReciprocalSum = validSignals.reduce((acc, signal) => acc + signal.weight / signal.value, 0);
  return totalWeight / weightedReciprocalSum;
}
function weightedProbabilisticOr(signals: Signal[]): number {
  const totalWeight = signals.reduce((acc, signal) => acc + signal.weight, 0);
  if (totalWeight === 0) return 0;
  const weightedProduct = signals.reduce((acc, signal) => acc * Math.pow(1 - signal.value, signal.weight / totalWeight), 1);
  return 1 - weightedProduct;
}
export function getFormulaLabel(formulaType: FormulaType): string {
  switch (formulaType) {
    case 'arithmeticMean':
      return 'Arithmetic Mean';
    case 'harmonicMean':
      return 'Harmonic Mean';
    case 'probabilisticOr':
      return 'Probabilistic OR';
    default:
      return '';
  }
}
export function getFormulaDescription(formulaType: FormulaType): string {
  switch (formulaType) {
    case 'arithmeticMean':
      return "The arithmetic mean is calculated by adding all values together and dividing by the number of values. It's useful when all signals should contribute equally.";
    case 'harmonicMean':
      return 'The harmonic mean is calculated as the reciprocal of the arithmetic mean of the reciprocals. It gives greater weight to smaller values and is useful when averaging rates.';
    case 'probabilisticOr':
      return "The probabilistic OR combines signals as if they were independent probabilities. It's calculated as 1 minus the product of (1 minus each signal value).";
    default:
      return '';
  }
}