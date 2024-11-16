import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

interface StartModalProps {
    open: boolean;
    handleClose: () => void;
    initialState: {
        currentYear: number;
        netWorth: number;
        savings: number;
        investments: number;
        expenses: number;
    };
}

const StartModal: React.FC<StartModalProps> = ({ open, handleClose, initialState }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Financial Simulator</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Welcome to the Financial Simulator! You are starting in year {initialState.currentYear}.
                </Typography>
                <Typography variant="body1">
                    Your goal is to retire with a net worth of $100,000. You can achieve this by making decisions each year to increase your savings and investments, while managing your expenses. Good luck!
                </Typography>
            </DialogContent>
            <DialogContent>
                <Typography variant="body1">
                    <strong>Net Worth:</strong> ${initialState.netWorth}
                </Typography>
                <Typography variant="body1">
                    <strong>Savings:</strong> ${initialState.savings}
                </Typography>
                <Typography variant="body1">
                    <strong>Investments:</strong> ${initialState.investments}
                </Typography>
                <Typography variant="body1">
                    <strong>Expenses:</strong> ${initialState.expenses}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Start Simulation
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StartModal;