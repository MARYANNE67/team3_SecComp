import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { TrendingUp, TrendingDown, Home, Wallet } from 'lucide-react';
import { ScenarioOption } from '../types';

interface ScenarioStepProps {
  year: number;
  options: ScenarioOption[];
  onSelect: (option: ScenarioOption) => void;
}

export default function ScenarioStep({ year, options, onSelect }: ScenarioStepProps) {
  return (
    <Box>
      <Grid container spacing={3}>
        {options.map((option) => (
          <Grid item xs={12} md={6} key={option.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {option.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {option.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {option.impact.investments !== 0 && (
                    <Chip 
                      icon={option.impact.investments > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      label={`Investment ${option.impact.investments > 0 ? '+' : ''}${option.impact.investments}%`}
                      color={option.impact.investments > 0 ? 'success' : 'error'}
                      size="small"
                    />
                  )}
                  {option.impact.savings !== 0 && (
                    <Chip 
                      icon={<Wallet size={16} />}
                      label={`Savings ${option.impact.savings > 0 ? '+' : ''}${option.impact.savings}%`}
                      color={option.impact.savings > 0 ? 'success' : 'error'}
                      size="small"
                    />
                  )}
                  {option.impact.expenses !== 0 && (
                    <Chip 
                      icon={<Home size={16} />}
                      label={`Expenses ${option.impact.expenses > 0 ? '+' : ''}${option.impact.expenses}%`}
                      color={option.impact.expenses < 0 ? 'success' : 'error'}
                      size="small"
                    />
                  )}
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained"
                  fullWidth
                  onClick={() => onSelect(option)}
                  sx={{
                    background: 'linear-gradient(45deg, #2E3B55 30%, #3F4F7D 90%)',
                    color: 'white',
                  }}
                >
                  Choose This Option
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}