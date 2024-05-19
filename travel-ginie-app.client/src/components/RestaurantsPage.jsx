import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../src/App.css';
import heartIcon from '../assets/images/heart1.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HotelsPage from './HotelsPage';
import axios from 'axios';


const RestaurantsPage = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    vertical: false,
    rows: 1,
    slidesPerRow: 1
  };
  
  const { city } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();




  const handleViewSaved = () => {
    navigate('/saved'); // Navigate to the Saved page
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`/api/TravelApp/Restaurants?city=${city}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        setRestaurants(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        setLoading(false); 
      }
    };

    fetchRestaurants();
  }, [city]);



  const handleHeartClick = (restaurant) => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // Redirect to login page
      navigate('/login');
    } else {
      // Get the existing saved restaurants from local storage
      const savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants')) || [];
      // Check if the restaurant is already saved
      if (!savedRestaurants.some(savedRestaurant => savedRestaurant.id === restaurant.data.restaurantId)) {
        // Add the restaurant to the list of saved restaurants
        savedRestaurants.push({
          id: restaurant.data.restaurantId,
          Rating: restaurant.data.averageRating,
          Reviews: restaurant.data.userReviewCount,
          Status: restaurant.data.currentOpenStatusText,
          Price: restaurant.data.priceTag,
          Cuisine: restaurant.data.establishmentTypeAndCuisineTags,
          image: restaurant.data.squareImgUr
          // Add other relevant restaurant information as needed
        });
        // Save the updated list of saved restaurants to local storage
        localStorage.setItem('savedRestaurants', JSON.stringify(savedRestaurants));
        // Inform the user that the restaurant has been saved
        alert('Restaurant saved successfully!');
      } else {
        // Inform the user that the restaurant is already saved
        alert('This restaurant is already saved!');
      }
    }
  };
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    
    <div>
      <h1>Restaurants in {city}</h1>
      <Slider {...settings}> 
        {restaurants.map((restaurant, index) => (
          <div key={index}>
            <div className="restaurant-card">
              <div className="restaurant-info">
                <h3>{restaurant.data.name}</h3>
                <div className="restaurant-image">
                  <img src={restaurant.data.squareImgUrl} alt={restaurant.data.suareImgRawLength} />
                  <img
                    src={heartIcon}
                    alt="heart"
                    className="heart-icon"
                    onClick={() => handleHeartClick(restaurant)}
                  />
                </div>
                <p>Rating: {restaurant.data.averageRating}</p>
                <p>Reviews: {restaurant.data.userReviewCount}</p>
                <p>Status: {restaurant.data.currentOpenStatusText}</p>
                <p>Price: {restaurant.data.priceTag}</p>
                <p>Cuisine: {restaurant.data.establishmentTypeAndCuisineTags}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
   
    </div>

  );
};
export default RestaurantsPage;