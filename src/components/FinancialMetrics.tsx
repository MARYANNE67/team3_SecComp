import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Wallet, TrendingUp, Home, DollarSign } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
}

function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            p: 1, 
            borderRadius: 1, 
            bgcolor: 'primary.light',
            display: 'flex',
            mr: 2
          }}>
            {icon}
          </Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          ${value.toLocaleString()}
        </Typography>
        {trend && (
          <Typography 
            variant="body2" 
            color={trend > 0 ? 'success.main' : 'error.main'}
          >
            {trend > 0 ? '+' : ''}{trend}% from last year
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

interface FinancialMetricsProps {
  netWorth: number;
  savings: number;
  investments: number;
  expenses: number;
  trends?: {
    netWorth: number;
    savings: number;
    investments: number;
    expenses: number;
  };
}

export default function FinancialMetrics({ 
  netWorth, 
  savings, 
  investments, 
  expenses,
  trends 
}: FinancialMetricsProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Net Worth"
          value={netWorth}
          icon={<DollarSign size={24} color="#2E3B55" />}
          trend={trends?.netWorth}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Savings"
          value={savings}
          icon={<Wallet size={24} color="#2E3B55" />}
          trend={trends?.savings}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Investments"
          value={investments}
          icon={<TrendingUp size={24} color="#2E3B55" />}
          trend={trends?.investments}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Monthly Expenses"
          value={expenses}
          icon={<Home size={24} color="#2E3B55" />}
          trend={trends?.expenses}
        />
      </Grid>
    </Grid>
  );
}