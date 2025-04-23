// src/components/DietPlan.js

import React, { useState } from 'react';
import axios from 'axios';

function DietPlan() {
  const [duration, setDuration] = useState('daily');
  const [plan, setPlan] = useState([]);

  const getPlan = async () => {
    try {
      const res = await axios.post('/api/diet-plan', {
        workoutType: 'Weight Loss', 
        targetWeight: 60,           
        currentWeight: 70,         
        duration: duration,
      });
      setPlan(res.data.plan);
    } catch (error) {
      console.error('Error fetching diet plan:', error);
    }
  };

  return (
    <div>
      <h2>Get Your Diet Plan</h2>
      <select onChange={(e) => setDuration(e.target.value)} value={duration}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button onClick={getPlan}>Get Plan</button>
      <ul>
        {plan.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default DietPlan;
