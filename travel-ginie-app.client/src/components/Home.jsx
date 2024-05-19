import React from 'react'
import VideoBg from '../assets/video/videoBg.mp4'
import { Link } from 'react-router-dom';


import '../components/Home.css';


const Home = () => {
  return (
<section className='video-bg'>

<video className='videoTag' autoPlay loop muted >
    <source src={VideoBg} type='video/mp4' />
</video>
<div className='content'>
    <h1>WelCome To Travel-Genie</h1>
    <p>Your Adventure Starts Here...........</p>

    <Link to="/start-page" className='btn-btn'>Start Your Plan Here</Link>
</div>

</section>
  )
}

export default Home
