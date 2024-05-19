import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Navbar/>
    <App />
   
    <Footer/>
 
  </React.StrictMode>
);