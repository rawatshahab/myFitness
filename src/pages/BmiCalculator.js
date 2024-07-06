import React, { useState } from 'react';
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import Navbar from '../components/Navbar';

const BmiCalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [BMI, setBMI] = useState('Not Calculated');
    const [health, setHealth] = useState('Not Calculated');
    const [healthyBmiRange, setHealthyBmiRange] = useState('Not Calculated');
    const [loading, setLoading] = useState(false);

    const calculateBMI = () => {
        // Validate inputs
        if (weight && height && age) {
            const weightKg = parseFloat(weight);
            const heightCm = parseFloat(height);
            const heightM = heightCm / 100; // Convert height to meters

            // Calculate BMI
            const bmi = weightKg / (heightM * heightM);
            setBMI(bmi.toFixed(2)); // Round BMI to 2 decimal places

            // Determine health status based on BMI (you can adjust these ranges based on your criteria)
            if (bmi < 18.5) {
                setHealth('Underweight');
            } else if (bmi >= 18.5 && bmi < 25) {
                setHealth('Normal weight');
            } else if (bmi >= 25 && bmi < 30) {
                setHealth('Overweight');
            } else {
                setHealth('Obese');
            }

            // Set healthy BMI range (example ranges, adjust as needed)
            setHealthyBmiRange('18.5 - 24.9');

        } else {
            alert('Please enter valid values for weight, height, and age.');
        }
    }

    const handleCalculate = () => {
        setLoading(true);
        setTimeout(() => { // Simulating loading time
            calculateBMI();
            setLoading(false);
        }, 1000); // Adjust timeout as necessary

    }

    return (
        <div>
            <Stack p="80px" gap="30px" backgroundColor="#FFF" width="90%" margin="auto" mt="100px" marginBottom="90px">
                <TextField type="number" placeholder='Your Weight in Kg (must be 40kg to 160kg in range)' value={weight} onChange={(e) => setWeight(e.target.value)} />
                <TextField type="number" placeholder='Your Height in CM (must be 130cm to 230cm in range)' value={height} onChange={(e) => setHeight(e.target.value)} />
                <TextField type="number" placeholder='Your Age (must be 0 to 80 in range)' value={age} onChange={(e) => setAge(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleCalculate} disabled={loading}>Calculate BMI</Button>
            </Stack>
            {BMI === 'Not Calculated' ? '' :
                <Stack p="80px" gap="30px" backgroundColor="#FFF" width="90%" margin="auto" mt="100px" marginBottom="90px">
                    <Typography variant="h3">BMI Results</Typography>
                    <Box>
                        <Typography variant="h5">BMI: <span style={{ color: '#ffb700', fontWeight: "600", fontSize: "40px" }}>{BMI}</span></Typography>
                        <Typography variant="h5">HEALTH: <span style={{ color: '#ffb700', fontWeight: "600", fontSize: "40px" }}>{health}</span></Typography>
                        <Typography variant="h5">HEALTH_BMI_RANGE: <span style={{ color: '#ffb700', fontWeight: "600", fontSize: "40px" }}>{healthyBmiRange}</span></Typography>
                    </Box>
                </Stack>
            }
        </div>
    )
}

export default BmiCalculator;
