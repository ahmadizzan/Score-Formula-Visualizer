import React from 'react';
import { Signal, FormulaType } from './FormulaVisualizer';
import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon, FunctionSquareIcon } from 'lucide-react';
interface SignalConfigurationProps {
  signals: Signal[];
  onSignalsChange: (signals: Signal[]) => void;
  parentFormulaType?: FormulaType;
  depth?: number;
}
export const SignalConfiguration: React.FC<SignalConfigurationProps> = ({
  signals,
  onSignalsChange,
  parentFormulaType,
  depth = 0
}) => {
  const addSignal = () => {
    const newSignal: Signal = {
      id: `${Date.now()}`,
      name: `Signal ${signals.length + 1}`,
      value: 0.5,
      weight: 1,
      isFormula: false
    };
    onSignalsChange([...signals, newSignal]);
  };
  const updateSignal = (id: string, updatedProps: Partial<Signal>) => {
    const updateSignalRecursive = (signals: Signal[]): Signal[] => {
      return signals.map(signal => {
        if (signal.id === id) {
          const updatedSignal = {
            ...signal,
            ...updatedProps
          };
          // If switching to formula mode, initialize sub-signals
          if (updatedProps.isFormula && !signal.isFormula) {
            updatedSignal.formulaType = 'arithmeticMean';
            updatedSignal.value = signal.value || 0; // Maintain the value
            updatedSignal.weight = signal.weight || 1; // Maintain the weight
            updatedSignal.signals = [{
              id: `${Date.now()}-1`,
              name: 'Sub-Signal 1',
              value: signal.value || 0.5,
              weight: 1,
              isFormula: false
            }, {
              id: `${Date.now()}-2`,
              name: 'Sub-Signal 2',
              value: signal.value || 0.5,
              weight: 1,
              isFormula: false
            }];
          }
          // If switching from formula to value mode
          if (updatedProps.isFormula === false && signal.isFormula) {
            updatedSignal.value = signal.value || 0; // Maintain the value
            updatedSignal.weight = signal.weight || 1; // Maintain the weight
            delete updatedSignal.signals; // Remove sub-signals
            delete updatedSignal.formulaType; // Remove formula type
          }
          return updatedSignal;
        }
        if (signal.signals) {
          return {
            ...signal,
            signals: updateSignalRecursive(signal.signals)
          };
        }
        return signal;
      });
    };
    const updatedSignals = updateSignalRecursive(signals);
    onSignalsChange(updatedSignals);
  };
  const removeSignal = (id: string) => {
    const removeSignalRecursive = (signals: Signal[]): Signal[] => {
      return signals.filter(signal => {
        if (signal.id === id) return false;
        if (signal.signals) {
          signal.signals = removeSignalRecursive(signal.signals);
        }
        return true;
      });
    };
    const updatedSignals = removeSignalRecursive(signals);
    onSignalsChange(updatedSignals);
  };
  const moveSignal = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0 || direction === 'down' && index === signals.length - 1) {
      return;
    }
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newSignals = [...signals];
    const [removed] = newSignals.splice(index, 1);
    newSignals.splice(newIndex, 0, removed);
    onSignalsChange(newSignals);
  };
  const handleSubSignalsChange = (signalId: string, subSignals: Signal[]) => {
    const updateSignalRecursive = (signals: Signal[]): Signal[] => {
      return signals.map(signal => {
        if (signal.id === signalId) {
          return {
            ...signal,
            signals: subSignals
          };
        }
        if (signal.signals) {
          return {
            ...signal,
            signals: updateSignalRecursive(signal.signals)
          };
        }
        return signal;
      });
    };
    const updatedSignals = updateSignalRecursive(signals);
    onSignalsChange(updatedSignals);
  };
  return <div className={depth > 0 ? 'pl-6 border-l border-gray-200' : ''}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          {depth === 0 ? 'Signal Configuration' : 'Sub-Signals'}
        </h2>
        <button onClick={addSignal} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm transition-colors">
          <PlusIcon size={16} className="mr-1" />
          Add Signal
        </button>
      </div>
      {signals.length === 0 ? <div className="text-center p-6 bg-gray-50 rounded-md">
          <p className="text-gray-500">
            No signals added yet. Add a signal to get started.
          </p>
        </div> : <div className="space-y-4">
          {signals.map((signal, index) => <div key={signal.id} className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input type="text" value={signal.name} onChange={e => updateSignal(signal.id, {
              name: e.target.value
            })} className="border border-gray-300 rounded-md px-3 py-1 w-full max-w-xs" />
                  <button onClick={() => updateSignal(signal.id, {
              isFormula: !signal.isFormula
            })} className={`p-2 rounded-md transition-colors ${signal.isFormula ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`} title={signal.isFormula ? 'Convert to Value' : 'Convert to Formula'}>
                    <FunctionSquareIcon size={16} />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => moveSignal(index, 'up')} disabled={index === 0} className={`p-1 rounded ${index === 0 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-200'}`}>
                    <ArrowUpIcon size={16} />
                  </button>
                  <button onClick={() => moveSignal(index, 'down')} disabled={index === signals.length - 1} className={`p-1 rounded ${index === signals.length - 1 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-200'}`}>
                    <ArrowDownIcon size={16} />
                  </button>
                  <button onClick={() => removeSignal(signal.id)} className="p-1 text-red-500 hover:bg-red-100 rounded">
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
              {signal.isFormula ? <div className="mt-4">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Formula Type
                    </label>
                    <select value={signal.formulaType} onChange={e => updateSignal(signal.id, {
              formulaType: e.target.value as FormulaType
            })} className="border border-gray-300 rounded-md px-3 py-1">
                      <option value="arithmeticMean">Arithmetic Mean</option>
                      <option value="harmonicMean">Harmonic Mean</option>
                      <option value="probabilisticOr">Probabilistic OR</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Formula Weight: {signal.weight.toFixed(2)}
                    </label>
                    <input type="range" min="0" max="5" step="0.1" value={signal.weight} onChange={e => updateSignal(signal.id, {
              weight: parseFloat(e.target.value)
            })} className="w-full" />
                    <p className="text-sm text-gray-500 mt-1">
                      Determines how much this formula's result contributes to
                      its parent formula
                    </p>
                  </div>
                  <SignalConfiguration signals={signal.signals || []} onSignalsChange={subSignals => handleSubSignalsChange(signal.id, subSignals)} parentFormulaType={signal.formulaType} depth={depth + 1} />
                </div> : <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Value: {signal.value.toFixed(2)}
                    </label>
                    <input type="range" min="0" max="1" step="0.01" value={signal.value} onChange={e => updateSignal(signal.id, {
              value: parseFloat(e.target.value)
            })} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Weight: {signal.weight.toFixed(2)}
                    </label>
                    <input type="range" min="0" max="5" step="0.1" value={signal.weight} onChange={e => updateSignal(signal.id, {
              weight: parseFloat(e.target.value)
            })} className="w-full" />
                  </div>
                </div>}
            </div>)}
        </div>}
    </div>;
};