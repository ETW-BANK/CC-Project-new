import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../src/App.css';

const StartPage = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0); // State to hold the number of days

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("api/TravelApp/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      if (selectedCountry) {
        try {
          const response = await fetch(`api/TravelApp/cities?country=${selectedCountry.toLowerCase()}`);
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    }
    fetchCities();
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity(""); 
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDateChange = (event) => {
    if (event.target.name === 'start') {
      setArrivalDate(event.target.value);
    } else if (event.target.name === 'end') {
      setDepartureDate(event.target.value);
    }
  };

  const handleNextButtonClick = () => {
    if (selectedCountry && selectedCity && arrivalDate && departureDate) {
      const arrival = new Date(arrivalDate);
      const departure = new Date(departureDate);
      const numberOfDays = Math.floor((departure - arrival) / (1000 * 60 * 60 * 24));
      setNumberOfDays(numberOfDays);
      navigate(`/second-page/${selectedCountry}/${selectedCity}/${arrivalDate}/${departureDate}/${numberOfDays}`);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <section className='Page'>
      <section className='wrapper'>
        <div className='toptext'>
          <h1>Welcome to the AI planner</h1>
        </div>

        <div className='top-question'>
          <p>Where and when do you wish to travel?</p>
        </div>

        <section className='form-wrapper'>
          <form>
            <label htmlFor="country">Select a country:</label>
            <select id="country" value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <label htmlFor="city">Select a city:</label>
            <select id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="">Select a city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </form>
        </section>

        <section className='date-selector'>
          <form>
            <label htmlFor="start">Arrival Date:</label>
            <input type="date" id="start" name="start" onChange={handleDateChange} />

            <label htmlFor="end">Departure Date:</label>
            <input type="date" id="end" name="end" onChange={handleDateChange} />
            <button onClick={handleNextButtonClick} className='btn'>Next</button>
          </form>
        </section>
      </section>
      
    </section>
  );
}

export default StartPage;
