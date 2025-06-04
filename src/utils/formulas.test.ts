import { describe, it, expect } from 'vitest';
import { calculateScore } from './formulas';
import type { Signal, FormulaType } from '../components/FormulaVisualizer';

describe('calculateScore', () => {
  it('calculates arithmetic mean correctly', () => {
    const signals: Signal[] = [
      { id: '1', name: 'A', value: 2, weight: 1, isFormula: false },
      { id: '2', name: 'B', value: 4, weight: 1, isFormula: false }
    ];
    const result = calculateScore('arithmeticMean', signals);
    expect(result).toBeCloseTo(3);
  });

  it('calculates harmonic mean correctly', () => {
    const signals: Signal[] = [
      { id: '1', name: 'A', value: 2, weight: 1, isFormula: false },
      { id: '2', name: 'B', value: 4, weight: 1, isFormula: false }
    ];
    const result = calculateScore('harmonicMean', signals);
    expect(result).toBeCloseTo(2.6666, 3);
  });

  it('returns 0 for harmonic mean when any signal is zero', () => {
    const signals: Signal[] = [
      { id: '1', name: 'A', value: 0, weight: 1, isFormula: false },
      { id: '2', name: 'B', value: 0.5, weight: 1, isFormula: false }
    ];
    const result = calculateScore('harmonicMean', signals);
    expect(result).toBe(0);
  });

  it('calculates probabilistic OR correctly', () => {
    const signals: Signal[] = [
      { id: '1', name: 'A', value: 0.5, weight: 1, isFormula: false },
      { id: '2', name: 'B', value: 0.4, weight: 1, isFormula: false }
    ];
    const result = calculateScore('probabilisticOr', signals);
    // 1 - (1-0.5)^(0.5) * (1-0.4)^(0.5)
    const expected = 1 - Math.pow(1 - 0.5, 0.5) * Math.pow(1 - 0.4, 0.5);
    expect(result).toBeCloseTo(expected);
  });

  it('handles nested formula signals', () => {
    const nestedSignals: Signal[] = [
      { id: 'n1', name: 'N1', value: 1, weight: 1, isFormula: false },
      { id: 'n2', name: 'N2', value: 3, weight: 1, isFormula: false }
    ];

    const signals: Signal[] = [
      { id: '1', name: 'Base', value: 2, weight: 1, isFormula: false },
      {
        id: '2',
        name: 'Nested',
        value: 0,
        weight: 1,
        isFormula: true,
        formulaType: 'arithmeticMean',
        signals: nestedSignals
      }
    ];
    const result = calculateScore('arithmeticMean', signals);
    // base value 2 and nested arithmetic mean of (1,3) = 2 -> average of 2 and 2 = 2
    expect(result).toBeCloseTo(2);
  });
});
