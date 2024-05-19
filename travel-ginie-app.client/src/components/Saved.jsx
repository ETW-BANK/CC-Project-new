import React from 'react';

const Saved = () => {
  // Get the saved restaurants from local storage
  const savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants')) || [];

  return (
    <div>
      <h1>Saved Restaurants</h1>
      <div className="saved-restaurant-list">
        {savedRestaurants.map((restaurant, index) => (
          <div key={index} className="saved-restaurant-card">
            <h3>{restaurant.name}</h3>
            <p>Rating: {restaurant.averageRating}</p>
            <p>Reviews: {restaurant.userReviewCount}</p>
            <p>Restaurant ID: {restaurant.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
