import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import ScenarioStep from './ScenarioStep';
import FinancialMetrics from './FinancialMetrics';
import ResultsView from './ResultsView';
import { SimulationState, ScenarioOption } from '../types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E3B55',
    },
    secondary: {
      main: '#E8B004',
    },
  },
});

const initialState: SimulationState = {
  currentYear: 2024,
  netWorth: 100000,
  savings: 50000,
  investments: 50000,
  expenses: 3000,
  decisions: [],
};

const mockScenarios: ScenarioOption[] = [
  {
    id: 'invest-stocks',
    title: 'Invest in High-Growth Stocks',
    description: 'Allocate a significant portion of your portfolio to promising tech stocks.',
    impact: {
      investments: 15,
      savings: -10,
      expenses: 0,
    },
  },
  {
    id: 'buy-house',
    title: 'Purchase a Home',
    description: 'Buy a property in an up-and-coming neighborhood.',
    impact: {
      investments: -20,
      savings: -30,
      expenses: 20,
    },
  },
  {
    id: 'reduce-expenses',
    title: 'Optimize Monthly Expenses',
    description: 'Cut non-essential spending and optimize your budget.',
    impact: {
      investments: 0,
      savings: 20,
      expenses: -25,
    },
  },
  {
    id: 'conservative-savings',
    title: 'Focus on Savings',
    description: 'Maximize your savings with high-yield accounts.',
    impact: {
      investments: -10,
      savings: 30,
      expenses: -10,
    },
  },
];

export default function Simulator() {
  const [simulationState, setSimulationState] = useState<SimulationState>(initialState);
  const [isComplete, setIsComplete] = useState(false);

  const handleScenarioSelect = (option: ScenarioOption) => {
    const newState = {
      ...simulationState,
      currentYear: simulationState.currentYear + 1,
      netWorth: simulationState.netWorth * (1 + (option.impact.investments + option.impact.savings) / 100),
      savings: simulationState.savings * (1 + option.impact.savings / 100),
      investments: simulationState.investments * (1 + option.impact.investments / 100),
      expenses: simulationState.expenses * (1 + option.impact.expenses / 100),
      decisions: [...simulationState.decisions, {
        year: simulationState.currentYear,
        investmentChoice: option.id,
        housingChoice: option.id === 'buy-house' ? 'buy' : 'rent',
        expenseReduction: option.impact.expenses,
        savingsAllocation: option.impact.savings,
      }],
    };

    if (simulationState.currentYear >= 2033) {
      setIsComplete(true);
    }

    setSimulationState(newState);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)'
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 4
              }}
            >
              Financial Decision Simulator
            </Typography>

            <Stepper 
              activeStep={Math.min(9, simulationState.currentYear - 2024)} 
              alternativeLabel 
              sx={{ mb: 4 }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <Step key={i}>
                  <StepLabel>{2024 + i}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <FinancialMetrics
              netWorth={simulationState.netWorth}
              savings={simulationState.savings}
              investments={simulationState.investments}
              expenses={simulationState.expenses}
            />

            <Box sx={{ mt: 4 }}>
              {isComplete ? (
                <ResultsView decisions={simulationState.decisions} finalState={simulationState} />
              ) : (
                <ScenarioStep
                  year={simulationState.currentYear}
                  options={mockScenarios}
                  onSelect={handleScenarioSelect}
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}