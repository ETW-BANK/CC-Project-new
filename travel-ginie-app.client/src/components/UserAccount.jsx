import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import '../../src/App.css';

function UserAccount() {
   
    const { selectedCity } = useParams();
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); 

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/UserAccount/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        // Registration successful
        console.log('Registration successful');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/UserAccount/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
  
      if (response.ok) {
       
        // Login successful
        console.log('Login successful');
        setIsLoggedIn(true);
        // Redirect user to the restaurants page
        navigate(`/restaurants-page/${selectedCity}`);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/UserAccount/logout');

      if (response.ok) {
        // Logout successful
        console.log('Logout successful');
        setIsLoggedIn(false);
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const checkLoggedInUser = async () => {
    try {
      const response = await fetch('/api/UserAccount/isLoggedin');

      if (response.ok) {
        const userData = await response.json();
        console.log('User is logged in:', userData);
        setIsLoggedIn(true);
        setUserData(userData.user);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        console.log('User is not logged in');
      }
    } catch (error) {
      console.error('Error checking logged in user:', error);
    }
  };
  
  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const redirectToRestaurantsPage = () => {
    navigate(`/restaurants-page/${selectedCity}`);
  };

  return (
    <div>
      <h1>React App</h1>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {userData && userData.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={registrationData.name}
            onChange={(e) =>
              setRegistrationData({ ...registrationData, name: e.target.value })
            }
          />
          {/* Other registration input fields */}
          <button onClick={handleRegister}>Register</button>

          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {/* Button to redirect to restaurants page */}
      <button onClick={redirectToRestaurantsPage}>Restaurants Page</button>
    </div>
  );
}

export default UserAccount;
