import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SimulationState, FinancialDecision } from '../types';

interface ResultsViewProps {
  decisions: FinancialDecision[];
  finalState: SimulationState;
}

export default function ResultsView({ decisions, finalState }: ResultsViewProps) {
  const downloadPDF = async () => {
    const input = document.getElementById('results-content');
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('financial-simulation-results.pdf');
  };

  const downloadJSON = () => {
    const data = {
      finalState,
      decisions,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'simulation-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const chartData = decisions.map((decision, index) => ({
    year: 2024 + index,
    netWorth: finalState.netWorth * (0.8 + index * 0.2),
    savings: finalState.savings * (0.9 + index * 0.1),
    investments: finalState.investments * (0.7 + index * 0.3),
  }));

  return (
    <Box id="results-content">
      <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Your 10-Year Financial Journey Results
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Final Financial Position</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1">Net Worth</Typography>
              <Typography variant="h4" color="primary">
                ${finalState.netWorth.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1">Total Savings</Typography>
              <Typography variant="h4" color="primary">
                ${finalState.savings.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1">Investment Value</Typography>
              <Typography variant="h4" color="primary">
                ${finalState.investments.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1">Monthly Expenses</Typography>
              <Typography variant="h4" color="primary">
                ${finalState.expenses.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Wealth Growth Over Time</Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="netWorth" 
                  stroke="#2E3B55" 
                  name="Net Worth"
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#82ca9d" 
                  name="Savings"
                />
                <Line 
                  type="monotone" 
                  dataKey="investments" 
                  stroke="#E8B004" 
                  name="Investments"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button 
          variant="contained" 
          onClick={downloadPDF}
          startIcon={<FileText size={20} />}
          sx={{
            background: 'linear-gradient(45deg, #2E3B55 30%, #3F4F7D 90%)',
            color: 'white',
          }}
        >
          Download PDF Report
        </Button>
        <Button
          variant="outlined"
          onClick={downloadJSON}
          startIcon={<Download size={20} />}
        >
          Export Data (JSON)
        </Button>
      </Box>
    </Box>
  );
}