import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../src/App.css';

const DisplayPage = () => {
    const navigate = useNavigate();
    const { selectedCountry, selectedCity, arrivalDate, departureDate, numberOfDays, selectedType, selectedBudget, numTravelers, selectedInterests } = useParams();
    const [tripPlan, setTripPlan] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTripPlan = async () => {
            try {
                const response = await axios.get(`/api/TravelApp/tripplan?day=${numberOfDays}&city=${selectedCity}&activities=${selectedInterests}&numberofppl=${numTravelers}&budjet=${selectedBudget}&companions=${selectedType}`);
                setTripPlan(response.data.plan); 
                setError('');
            } catch (err) {
                setError('Error retrieving trip plan: ' + err.message);
            }
        };
        fetchTripPlan();
    }, [selectedCountry, selectedCity, arrivalDate, departureDate, numberOfDays, selectedType, selectedBudget, numTravelers, selectedInterests]);

    const handleNextButtonClick = () => {
       navigate(`/restaurants-page/${selectedCity}`);
      
    };

    const handleLastButtonClick = () => {
   
        navigate(`/hotels-page/${selectedCity}/${arrivalDate}/${departureDate}`);  // Use backticks for string interpolation
     };
    return (
        <div>
            <div className='wrapper'>
                <h2>Here Comes Your Choice:</h2>
                <p>Selected Country: {selectedCountry}</p>
                <p>Selected City: {selectedCity}</p>
                <p>Arrival Date: {arrivalDate}</p>
                <p>Departure Date: {departureDate}</p>
                <p>Number of Days: {numberOfDays}</p>
                <p>Selected Type: {selectedType}</p>
                <p>Selected Budget: {selectedBudget}</p>
                <p>Number of Travelers: {numTravelers}</p>
                <p>Selected Interests: {selectedInterests}</p>
            </div>
            <section className='plan'>
                <h2>AI Trip Plan</h2>
                {tripPlan.map((day, index) => (
                    <div key={index}>
                        <p><strong>Day {day.day}:</strong></p>
                        {day.activities.map((activity, activityIndex) => (
                            <div key={activityIndex}>
                                <p><strong>{activity.time}</strong>: {activity.description}</p>
                            </div>
                        ))}
                    </div>
                ))}
                {error && <p>{error}</p>}
            </section>
            <button onClick={handleNextButtonClick}>Go to Restaurants Page</button>
            <button onClick={handleLastButtonClick}>Go to Hotels Page</button>
        </div>
        
    );
};

export default DisplayPage;