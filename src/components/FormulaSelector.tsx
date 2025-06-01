import React from 'react';
import { FormulaType } from './FormulaVisualizer';
import { Calculator, Sigma } from 'lucide-react';
interface FormulaSelectorProps {
  selectedFormula: FormulaType;
  onFormulaChange: (formula: FormulaType) => void;
}
interface FormulaOption {
  type: FormulaType;
  name: string;
  description: string;
  icon: React.ReactNode;
}
export const FormulaSelector: React.FC<FormulaSelectorProps> = ({
  selectedFormula,
  onFormulaChange
}) => {
  const formulaOptions: FormulaOption[] = [{
    type: 'arithmeticMean',
    name: 'Arithmetic Mean',
    description: 'Simple average of all signals',
    icon: <Calculator size={24} />
  }, {
    type: 'harmonicMean',
    name: 'Harmonic Mean',
    description: 'Reciprocal of the arithmetic mean of reciprocals',
    icon: <Sigma size={24} />
  }, {
    type: 'probabilisticOr',
    name: 'Probabilistic OR',
    description: '1 - ((1-a) * (1-b) * ...)',
    icon: <div size={24} />
  }];
  return <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Formula Type</h2>
      <div className="space-y-3">
        {formulaOptions.map(formula => <div key={formula.type} className={`flex items-center p-3 rounded-md cursor-pointer transition-all ${selectedFormula === formula.type ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`} onClick={() => onFormulaChange(formula.type)}>
            <div className={`p-2 rounded-full ${selectedFormula === formula.type ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {formula.icon}
            </div>
            <div className="ml-3">
              <div className="font-medium">{formula.name}</div>
              <div className="text-sm text-gray-500">{formula.description}</div>
            </div>
          </div>)}
      </div>
    </div>;
};