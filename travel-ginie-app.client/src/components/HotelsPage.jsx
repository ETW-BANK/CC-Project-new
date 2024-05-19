import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../src/App.css';
import heartIcon from '../assets/images/heart1.png';

const HotelsPage = () => {
  const { city, arrivalDate, departureDate } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define settings for the Slider component
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

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`/api/TravelApp/hotels?city=${city}&checkin=${arrivalDate}&checkout=${departureDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        const data = await response.json();
        setHotels(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotels:', error.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, [city, arrivalDate, departureDate]);
  const handleHeartClick = (hotel) => {
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
      <h1>Hotels in {city}</h1>
      <Slider {...settings}>
        {hotels.map((hotel, index) => (
          <div key={index}>
            <div className="hotels-card">
              <div className="hotels-info">
                <h3>{hotel.title}</h3>
                <div className="hotels-image">
                  {hotel.cardPhotos && hotel.cardPhotos.length > 3 && hotel.cardPhotos[2]?.sizes?.urlTemplate && (
                    <div className="hotels-image-wrapper">
                      <img
                        src={hotel.cardPhotos[3]?.sizes?.urlTemplate
                          ?.replace('{width}', '800')
                          ?.replace('{height}', '800')
                        }
                        alt={`Photo 1`}
                      />
                    
                      <img
                        src={heartIcon}
                        alt="heart"
                        className="heart-icon"
                        onClick={() => handleHeartClick(hotel)}
                      />
                    </div>
                  )}
                </div>
                <p>{hotel.primaryInfo}</p>
                <p>{hotel.secondaryInfo}</p>
                <p>Rating: {hotel.bubbleRating.rating}</p>
                <p>Rating count: {hotel.bubbleRating.count}</p>
                <p>Price: {hotel.priceForDisplay}</p>
                <p>Booking Payment Option: {hotel.priceDetails}</p>
                <p>Price Summary: {hotel.priceSummary}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HotelsPage;
