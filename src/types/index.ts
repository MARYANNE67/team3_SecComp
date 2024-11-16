export interface FinancialDecision {
  year: number;
  investmentChoice: string;
  housingChoice: string;
  expenseReduction: number;
  savingsAllocation: number;
}

export interface SimulationState {
  currentYear: number;
  netWorth: number;
  savings: number;
  investments: number;
  expenses: number;
  decisions: FinancialDecision[];
}

export interface ScenarioOption {
  id: string;
  title: string;
  description: string;
  impact: {
    savings: number;
    investments: number;
    expenses: number;
  };
}