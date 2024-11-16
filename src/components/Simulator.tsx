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
    id: 'invest-mutual-funds',
    title: 'Invest in Mutual Funds',
    description: 'Diversify your portfolio with a mix of mutual funds.',
    impact: {
      investments: 10,
      savings: -5,
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
    id: 'select-rent',
    title: 'Select to Rent',
    description: 'Opt to rent a home instead of buying, freeing up capital for other investments.',
    impact: {
      investments: 5,
      savings: 10,
      expenses: -15,
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
    description: 'Maximize your savings with adding funds to high-yield accounts.',
    impact: {
      investments: -10,
      savings: 30,
      expenses: -10,
    },
  },
];

const categorizedScenarios = {
  investments: mockScenarios.filter(scenario => scenario.id.includes('invest')),
  housing: mockScenarios.filter(scenario => scenario.id.includes('house') || scenario.id.includes('rent')),
  expenses: mockScenarios.filter(scenario => scenario.id.includes('expenses')),
  savings: mockScenarios.filter(scenario => scenario.id.includes('savings')),
};

export default function Simulator() {
  const [simulationState, setSimulationState] = useState<SimulationState>(initialState);
  const [selectedAllCategory, setSelectedAllCategory] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(false);
  const [selectedHousing, setSelectedHousing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(false);
  const [selectedSaving, setSelectedSaving] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);


  // const [countSelected, setCountSelected] = useState(0);

  const [isComplete, setIsComplete] = useState(false);

  const handleScenarioSelect = (option: ScenarioOption) => {

      if (option.id.includes('invest')) {
        setSelectedInvestment(true);
      } else if (option.id.includes('house') || option.id.includes('rent')) {
        setSelectedHousing(true);
      } else if (option.id.includes('expenses')) {
        setSelectedExpense(true);
      } else if (option.id.includes('savings')) {
        setSelectedSaving(true);
      }
  }

  const calculationLogic = (option: ScenarioOption) =>{
    const newState = {
      ...simulationState,
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

    return newState
  }


  const handleFinalSelect = (option: ScenarioOption) => {
    // setCountSelected(countSelected+1);

  
    const newState = calculationLogic(option);
    newState.currentYear = simulationState.currentYear + 1;


    if (simulationState.currentYear >= 2033) {
      setIsComplete(true);
    }

    //reset
    setSelectedHousing(false);
    setSelectedInvestment(false);
    setSelectedExpense(false);
    setSelectedSaving(false);


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
                <>
                  <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
                  Year {simulationState.currentYear}
                  </Typography>

                  {!selectedInvestment &&
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Investments
                    </Typography>
                    <ScenarioStep 
                      year={simulationState.currentYear}
                      options={categorizedScenarios.investments} 
                      onSelect={handleScenarioSelect} 
                    />
                  </Box> } 

                  {selectedInvestment &&(
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Housing
                    </Typography>
                    <ScenarioStep 
                      year={simulationState.currentYear}
                      options={categorizedScenarios.housing} 
                      onSelect={handleScenarioSelect} 
                    />
                  </Box> )}

                {selectedInvestment && selectedHousing &&(
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Expenses
                    </Typography>
                    <ScenarioStep 
                      year={simulationState.currentYear}
                      options={categorizedScenarios.expenses} 
                      onSelect={handleScenarioSelect} 
                    />
                  </Box>)
                }

                {selectedInvestment && selectedHousing && selectedExpense &&(
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Reducing Savings
                    </Typography>
                    <ScenarioStep 
                      year={simulationState.currentYear}
                      options={categorizedScenarios.savings} 
                      onSelect={handleScenarioSelect}
                    />
                  </Box>)

                }
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}