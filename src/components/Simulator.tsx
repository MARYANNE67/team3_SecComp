import React, { useState } from 'react';
import { useEffect } from 'react';
import logo from '/assets/logo2.png';

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
import StartModal from './StartModal';

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

const getRandomValue = (base: number, variance: number) => {
  return base + Math.floor(Math.random() * variance * 2) - variance;
};

const initialState: SimulationState = {
  currentYear: 2024,
  netWorth: getRandomValue(10000, 20000),
  savings: getRandomValue(5000, 10000),
  investments: getRandomValue(50000, 10000),
  expenses: getRandomValue(3000, 500),
  decisions: [],
};

const house_Data: { [key: string]: { "House Worth (CAD)": number; "Fixed Rate (%)": number; "Fixed Monthly Payment (CAD)": number } } = {
  "2024": {
    "House Worth (CAD)": 1265000.1249999376,
    "Fixed Rate (%)": 8.585001347499325,
    "Fixed Monthly Payment (CAD)": 3295.7305315947347
  },
  "2025": {
    "House Worth (CAD)": 1275000.1249999376,
    "Fixed Rate (%)": 8.585001347499325,
    "Fixed Monthly Payment (CAD)": 3295.7305315947347
  },
  "2026": {
    "House Worth (CAD)": 1300000.1249999376,
    "Fixed Rate (%)": 8.135001347499326,
    "Fixed Monthly Payment (CAD)": 3203.9005315947343
  },
  "2027": {
    "House Worth (CAD)": 1325000.1249999376,
    "Fixed Rate (%)": 7.985001347499326,
    "Fixed Monthly Payment (CAD)": 3173.760531594734
  },
  "2028": {
    "House Worth (CAD)": 1425000.1249999376,
    "Fixed Rate (%)": 7.985001347499326,
    "Fixed Monthly Payment (CAD)": 3173.760531594734
  },
  "2029": {
    "House Worth (CAD)": 1525000.1249999376,
    "Fixed Rate (%)": 7.985001347499326,
    "Fixed Monthly Payment (CAD)": 3173.760531594734
  },
  "2030": {
    "House Worth (CAD)": 1475000.1249999376,
    "Fixed Rate (%)": 8.685001347499327,
    "Fixed Monthly Payment (CAD)": 3316.420531594734
  },
  "2031": {
    "House Worth (CAD)": 1500000.1249999376,
    "Fixed Rate (%)": 8.685001347499327,
    "Fixed Monthly Payment (CAD)": 3316.420531594734
  },
  "2032": {
    "House Worth (CAD)": 1550000.1249999376,
    "Fixed Rate (%)": 8.285001347499328,
    "Fixed Monthly Payment (CAD)": 3234.280531594734
  },
  "2033": {
    "House Worth (CAD)": 1625000.1249999376,
    "Fixed Rate (%)": 8.135001347499328,
    "Fixed Monthly Payment (CAD)": 3203.900531594734
  }
};

const mockScenarios: ScenarioOption[] = [
  {
    id: 'invest-stocks',
    title: 'Invest in High-Growth Stocks',
    description: 'Allocate a significant portion of your portfolio to promising tech stocks.',
    impact: {
      investments: 1500,
      savings: -1000,
      expenses: 0,
    },
  },
  {
    id: 'invest-mutual-funds',
    title: 'Invest in Mutual Funds',
    description: 'Diversify your portfolio with a mix of mutual funds.',
    impact: {
      investments: 1000,
      savings: -500,
      expenses: 0,
    },
  },
  {
    id: 'invest-keep-money',
    title: 'Keep Money',
    description: 'Keep your money in a safe, low-risk account.',
    impact: {
      investments: 0,
      savings: 0,
      expenses: 0,
    },
  },
  {
    id: 'keep-house',
    title: 'Keep Your House',
    description: 'Continue living in your current home and paying a monthly morgage. Your net worth will increase by the house worth of that year.',
    impact: {
      investments: 0,
      savings: 0,
      expenses: 0,
    },
  },
  {
    id: 'select-rent',
    title: 'Select to Rent',
    description: 'Opt to sell your home and rent a property instead.',
    impact: {
      investments: 500,
      savings: 1000,
      expenses: -1500,
    },
  },
  {
    id: 'reduce-luxuries-expenses',
    title: 'Cut Luxury Expenses',
    description: 'Eliminate spending on luxury items and services.',
    impact: {
      investments: 0,
      savings: 1500,
      expenses: -2000,
    },
  },
  {
    id: 'reduce-entertainment-expenses',
    title: 'Cut Entertainment Expenses',
    description: 'Reduce spending on entertainment such as movies, dining out, and subscriptions.',
    impact: {
      investments: 0,
      savings: 1000,
      expenses: -1000,
    },
  },
  {
    id: 'reduce-utilities-expenses',
    title: 'Cut Utility Expenses',
    description: 'Optimize your utility usage to lower bills.',
    impact: {
      investments: 0,
      savings: 500,
      expenses: -1000,
    },
  },
  {
    id: 'cut-no-expenses',
    title: 'Cut no expenses',
    description: 'Cut no other expenses and keep your current lifestyle.',
    impact: {
      investments: 0,
      savings: 0,
      expenses: 0,
    },
  },
  {
    id: 'conservative-savings',
    title: 'Focus on Savings',
    description: 'Maximize your savings with adding funds to high-yield accounts.',
    impact: {
      investments: -1000,
      savings: 3000,
      expenses: -1000,
    },
  },
  {
    id: 'no-savings-account',
    title: 'Do Not Use Savings Account',
    description: 'Keep your money accessible without putting it into a savings account.',
    impact: {
      investments: 0,
      savings: 0,
      expenses: 0,
    },
  },
];

const randomScenarios: ScenarioOption[] = [
  {
    id: 'unexpected-expense',
    title: 'Unexpected Medical Expense',
    description: 'You have an unexpected medical expense that impacts your finances.',
    impact: {
      investments: Math.floor(Math.random() * -1000),
      savings: Math.floor(Math.random() * -2000),
      expenses: Math.floor(Math.random() * -1500),
    },
  },
  {
    id: 'car-repair',
    title: 'Car Repair',
    description: 'Your car needs a major repair, affecting your budget.',
    impact: {
      investments: Math.floor(Math.random() * -500),
      savings: Math.floor(Math.random() * -1000),
      expenses: Math.floor(Math.random() * -1000),
    },
  },
  {
    id: 'job-loss',
    title: 'Job Loss',
    description: 'You lose your job and need to manage your finances carefully.',
    impact: {
      investments: Math.floor(Math.random() * -1500),
      savings: Math.floor(Math.random() * -3000),
      expenses: Math.floor(Math.random() * -2000),
    },
  },
  {
    id: 'home-repair',
    title: 'Home Repair',
    description: 'Your home requires an urgent repair, impacting your savings.',
    impact: {
      investments: Math.floor(Math.random() * -1000),
      savings: Math.floor(Math.random() * -2000),
      expenses: Math.floor(Math.random() * -1500),
    },
  },
  {
    id: 'market-downturn',
    title: 'Market Downturn',
    description: 'A market downturn affects your investments negatively.',
    impact: {
      investments: Math.floor(Math.random() * -2000),
      savings: Math.floor(Math.random() * -1000),
      expenses: 0,
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
  const [startModalOpen, setStartModalOpen] = useState(true);
  const [selectedRandom, setSelectedRandom] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(false);
  const [selectedHousing, setSelectedHousing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(false);
  const [selectedSaving, setSelectedSaving] = useState(false);

  const [isComplete, setIsComplete] = useState(false);

  const handleScenarioSelect = (option: ScenarioOption) => {
      if (option.id.includes('invest')) {
        setSelectedInvestment(true);
        const newState = calculationLogic(option);
        setSimulationState(newState);
      } else if (option.id.includes('house') || option.id.includes('rent')) {
        setSelectedHousing(true);
        const newState = calculationLogic(option);
        setSimulationState(newState);
      } else if (option.id.includes('expenses')) {
        setSelectedExpense(true);
        const newState = calculationLogic(option);
        setSimulationState(newState);
      } else if (option.id.includes('savings')) {
        setSelectedSaving(true);
      }
  }

  const calculationLogic = (option: ScenarioOption) => {
    const newState = {
      ...simulationState,
      netWorth: simulationState.netWorth + option.impact.investments + option.impact.savings,
      savings: simulationState.savings + option.impact.savings,
      investments: simulationState.investments + option.impact.investments,
      expenses: simulationState.expenses + option.impact.expenses,
      decisions: [
        ...simulationState.decisions,
        {
          year: simulationState.currentYear,
          investmentChoice: option.id,
          housingChoice: option.id === 'keep-house' ? 'keep' : 'rent',
          expenseReduction: option.impact.expenses,
          savingsAllocation: option.impact.savings,
        },
      ],
    };

    // Update housing costs per year
    const houseData = house_Data[(simulationState.currentYear + 1).toString()];
    const previousHouseData = house_Data[simulationState.currentYear.toString()];
    if (option.id === 'keep-house') {
      if (simulationState.currentYear === 2024) {
        newState.netWorth += Math.floor(houseData["House Worth (CAD)"]);
      }
      newState.expenses -= Math.floor(previousHouseData["Fixed Monthly Payment (CAD)"]);
      newState.expenses += Math.floor(houseData["Fixed Monthly Payment (CAD)"]);
    } else {
      newState.expenses -= 2500;
    }
  
    return newState;
  };

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
    setSelectedRandom(false);

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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
              <img src={logo} alt="Logo" style={{ marginRight: '10px', height: '50px' }} />
              Time travel stimulator for 10 years prediction
            </Box>
            </Typography>

            {startModalOpen && (
              <StartModal 
                open={true} 
                handleClose={() => setStartModalOpen(false)} 
                initialState={initialState}
              />
            )
            }

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

                    {!selectedRandom && (
                      <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Random Events
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Select one of the random events that will impact your finances this year.
                      </Typography>
                      <ScenarioStep 
                        year={simulationState.currentYear}
                        options={randomScenarios.sort(() => 0.5 - Math.random()).slice(0, 2)} 
                        onSelect={(option) => {
                        const newState = calculationLogic(option);
                        setSimulationState(newState);
                        setSelectedRandom(true);
                        }}
                      />
                      </Box>
                    )
                    }

                    {!selectedInvestment && selectedRandom && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Investments
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Choose an investment strategy for the year.
                    </Typography>
                    <ScenarioStep 
                      year={simulationState.currentYear}
                      options={categorizedScenarios.investments} 
                      onSelect={handleScenarioSelect} 
                    />
                  </Box> )}

                  {selectedRandom && selectedInvestment && !selectedHousing && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Housing
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Decide on your housing situation for the year.
                    </Typography>
                    <ScenarioStep 
                      year={simulationState.currentYear}
                      options={categorizedScenarios.housing} 
                      onSelect={handleScenarioSelect} 
                    />
                  </Box> )}

                {selectedRandom && selectedInvestment && selectedHousing && !selectedExpense && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Expenses
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Choose an expense reduction strategy for the year.
                    </Typography>
                    <ScenarioStep 
                      year={simulationState.currentYear}
                      options={categorizedScenarios.expenses} 
                      onSelect={handleScenarioSelect} 
                    />
                  </Box>)
                }

                {selectedRandom && selectedInvestment && selectedHousing && selectedExpense && !selectedSaving && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Reducing Savings
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Choose a savings strategy for the year.
                    </Typography>
                    <ScenarioStep 
                      year={simulationState.currentYear}
                      options={categorizedScenarios.savings} 
                      onSelect={handleFinalSelect}
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