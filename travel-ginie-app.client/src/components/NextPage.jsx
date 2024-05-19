import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../src/App.css';

const NextPage = () => {
  const navigate = useNavigate();
  const { selectedCountry, selectedCity, arrivalDate, departureDate, numberOfDays, selectedType, selectedBudget, numTravelers, selectedInterests } = useParams(); // Update this line
  const [selectedInterestsState, setSelectedInterests] = useState([]);

  const handleTypeSelection = (type) => {
    if (selectedInterestsState.includes(type)) {
      setSelectedInterests(selectedInterestsState.filter(selectedType => selectedType !== type));
    } else {
      setSelectedInterests([...selectedInterestsState, type]);
    }
  };

  const handleNextButtonClick = () => {
    if (selectedInterestsState.length > 0) {
      navigate(`/display-page/${selectedCountry}/${selectedCity}/${arrivalDate}/${departureDate}/${numberOfDays}/${selectedType}/${selectedBudget}/${numTravelers}/${selectedInterestsState.join(",")}`); // Update this line
    } else {
      alert("Please select at least one interest.");
    }
  };

  return (
    <section className='Page'>
      <section className='wrapper'>
        <div className='toptext'>
          <h1>Choose Your Interest</h1>
        </div>

        <div className='top-question'>
          <p>What kind of Activity are you interested in?</p>
        </div>

        <section className='type-buttons'>
          <button onClick={() => handleTypeSelection("beaches")} className={selectedInterestsState.includes("beaches") ? 'selected' : ''}>Visit Beaches</button>
          <button onClick={() => handleTypeSelection("food")} className={selectedInterestsState.includes("food") ? 'selected' : ''}>Food</button>
          <button onClick={() => handleTypeSelection("attractions")} className={selectedInterestsState.includes("attractions") ? 'selected' : ''}>Attractions</button>
          <button onClick={() => handleTypeSelection("events")} className={selectedInterestsState.includes("events") ? 'selected' : ''}>Events</button>
          <button onClick={() => handleTypeSelection("shopping")} className={selectedInterestsState.includes("shopping") ? 'selected' : ''}>Shopping</button>
          <button onClick={() => handleTypeSelection("sightseeing")} className={selectedInterestsState.includes("sightseeing") ? 'selected' : ''}>Sightseeing</button>
        </section> <br /><br />
        <button onClick={handleNextButtonClick} className='btn'>Generate Choice Summery</button>
        <br /><br />
      <Link to="/" className='btn'>Start Over</Link>
      </section>
     
    </section>
  );
}

export default NextPage;
