import React, { useState } from 'react';
import axios from 'axios';

function TripPlanner() {
  const [prompt, setPrompt] = useState('');
  const [tripPlan, setTripPlan] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/TravelApp/AItripplan?prompt=' + encodeURIComponent(prompt));
      
      setTripPlan(response.data.text);
      setError('');
    } catch (err) {
      setError('Error retrieving trip plan: ' + err.message);
    }
  };
  

  return (
    <div>
      <h1>Trip Planner</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your prompt:
          <input
            type="text"
           
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <button type="submit">Generate Trip Plan</button>
      </form>
      {tripPlan && (
        <div>
          <h2>Trip Plan</h2>
          <p className='api-result'>{tripPlan}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default TripPlanner;
