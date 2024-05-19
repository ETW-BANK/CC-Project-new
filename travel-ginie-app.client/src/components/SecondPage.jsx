import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../src/App.css';

const SecondPage = () => {
  const navigate = useNavigate();
  const { selectedCountry, selectedCity, arrivalDate, departureDate, numberOfDays } = useParams();
  const [selectedType, setSelectedType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(0);
  const [numTravelers, setNumTravelers] = useState(1);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const handleBudgetChange = (event) => {
    setSelectedBudget(parseInt(event.target.value));
  };

  const handleNumTravelersChange = (event) => {
    setNumTravelers(parseInt(event.target.value));
  };

  const handleNextButtonClick = () => {
    if (selectedType && selectedBudget && numTravelers) {
      navigate(`/next-page/${selectedCountry}/${selectedCity}/${arrivalDate}/${departureDate}/${numberOfDays}/${selectedType}/${selectedBudget}/${numTravelers}`);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <section className='Page'>
      <section className='wrapper'>
        <div className='toptext'>
          <h1>Choose Your Travel Companions</h1>
        </div>

        <div className='top-question'>
          <p>Who are you traveling with?</p>
        </div>

        <section className='type-buttons'>
          <button onClick={() => handleTypeSelection("couples")} className={selectedType === "couples" ? 'selected' : ''}>Couples</button>
          <button onClick={() => handleTypeSelection("friends")} className={selectedType === "friends" ? 'selected' : ''}>Friends</button>
          <button onClick={() => handleTypeSelection("family")} className={selectedType === "family" ? 'selected' : ''}>Family</button>
          <button onClick={() => handleTypeSelection("solo")} className={selectedType === "solo" ? 'selected' : ''}>Solo</button>
        </section>

        <section className='num-travelers'>
          <label htmlFor="numTravelers">Number of Travelers:</label>
          <input type="number" id="numTravelers" name="numTravelers" min="1" value={numTravelers} onChange={handleNumTravelersChange} />
        </section>

        <section className='budget-selector'>
          <label htmlFor="budget">What's your budget?</label>
          <input type="range" id="budget" name="budget" min="0" max="10000" value={selectedBudget} onChange={handleBudgetChange} />
          <p>Selected budget: ${selectedBudget}</p>
        </section>
        <button onClick={handleNextButtonClick} className='btn'>Next</button> <br />
      <Link to="/" className='btn'>Previous</Link>
      </section>
    
    </section>
  );
}

export default SecondPage;
