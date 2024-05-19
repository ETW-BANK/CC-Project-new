import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import SecondPage from './components/SecondPage';
import NextPage from './components/NextPage';
import DisplayPage from './components/DisplayPage';
import RestaurantsPage from './components/RestaurantsPage';
import UserAccount from './components/UserAccount';
import Login from './components/Login';
import HotelsPage from './components/HotelsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';




const App = () => {
  return (


   
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/start-page" element={<StartPage />} />
        <Route path="/second-page/:selectedCountry/:selectedCity/:arrivalDate/:departureDate/:numberOfDays" element={<SecondPage />} />
        <Route path="/next-page/:selectedCountry/:selectedCity/:arrivalDate/:departureDate/:numberOfDays/:selectedType/:selectedBudget/:numTravelers" element={<NextPage />} />
        <Route path="/display-page/:selectedCountry/:selectedCity/:arrivalDate/:departureDate/:numberOfDays/:selectedType/:selectedBudget/:numTravelers/:selectedInterests" element={<DisplayPage />} />
        <Route path="/restaurants-page/:city" element={<RestaurantsPage />} />
        <Route path="/hotels-page/:city/:arrivalDate/:departureDate" element={<HotelsPage/>}/>
        <Route path="/login" element={<Login />} />
  
    </Routes>
    </Router>
   

  );
}

export default App;
