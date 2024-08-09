import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const InHouseDoctor = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className='in-house-doctor'>
      <h2>Meet Our In-House Doctors</h2>
      <p>Our team of experienced in-house doctors is dedicated to providing top-notch healthcare services. They are here to assist you with:</p>
      <ul>
        <li>Comprehensive health check-ups</li>
        <li>Personalized treatment plans</li>
        <li>Health consultations and advice</li>
        <li>Management of chronic conditions</li>
        <li>And more...</li>
      </ul>
      <p>Our doctors are committed to ensuring your well-being and providing the best care possible.</p>
    </div>
  );
}

export default InHouseDoctor;
