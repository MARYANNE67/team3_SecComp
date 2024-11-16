import React from 'react';

import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

interface DecisionStepProps {
  step: number;
  onDecision: (category: string, value: any) => void;
  decisions: any;
}

export default function DecisionStep({ step, onDecision, decisions }: DecisionStepProps) {
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Welcome to Your Financial Journey
              </Typography>
              <Typography variant="body1" color="text.secondary">
                This simulation will help you understand the impact of your financial decisions over the next 10 years.
                We'll guide you through various choices regarding investments, housing, and savings.
              </Typography>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Your Investment Strategy
            </Typography>
            <RadioGroup
              value={decisions.investmentStrategy}
              onChange={(e) => onDecision('investmentStrategy', e.target.value)}
            >
              <Grid container spacing={2}>
                {[
                  {
                    value: 'conservative',
                    title: 'Conservative',
                    description: 'Low-risk mutual funds and bonds (6-8% expected return)',
                  },
                  {
                    value: 'balanced',
                    title: 'Balanced',
                    description: 'Mix of stocks and bonds (8-10% expected return)',
                  },
                  {
                    value: 'aggressive',
                    title: 'Aggressive',
                    description: 'High-growth stocks and ETFs (10-12% expected return)',
                  },
                ].map((option) => (
                  <Grid item xs={12} md={4} key={option.value}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%',
                        transition: '0.3s',
                        '&:hover': {
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardContent>
                        <FormControlLabel
                          value={option.value}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {option.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {option.description}
                              </Typography>
                            </Box>
                          }
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Housing Decision
            </Typography>
            <RadioGroup
              value={decisions.housingChoice}
              onChange={(e) => onDecision('housingChoice', e.target.value)}
            >
              <Grid container spacing={2}>
                {[
                  {
                    value: 'buy',
                    title: 'Buy a House',
                    description: 'Investment in property with mortgage payments',
                  },
                  {
                    value: 'rent',
                    title: 'Rent',
                    description: 'Flexible living situation with lower upfront costs',
                  },
                ].map((option) => (
                  <Grid item xs={12} md={6} key={option.value}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%',
                        transition: '0.3s',
                        '&:hover': {
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardContent>
                        <FormControlLabel
                          value={option.value}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {option.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {option.description}
                              </Typography>
                            </Box>
                          }
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Monthly Savings Plan
            </Typography>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Typography gutterBottom>
                What percentage of your monthly income would you like to save?
              </Typography>
              <Slider
                value={decisions.savingsPercentage}
                onChange={(_, value) => onDecision('savingsPercentage', value)}
                valueLabelDisplay="on"
                step={5}
                marks
                min={0}
                max={50}
                sx={{ mt: 4 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Recommended: 20% of monthly income for long-term financial health
              </Typography>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {renderStep()}
    </Box>
  );
}