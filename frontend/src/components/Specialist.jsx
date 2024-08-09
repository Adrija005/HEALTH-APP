import React from 'react'

const Specialist = ({title, imageUrl}) => {
  return (
    <div className='specialist container'>
      <div className="banner">
        <h1>{title}</h1>
        <p>
        Welcome to our new HEALTH APP, where we offer a comprehensive range of tests and personalized healthcare services. Our state-of-the-art facility ensures accurate and timely results, supported by a team of in-house doctors who are dedicated to your health and wellness. Whether you need routine blood work or specialized testing, our experienced professionals provide the highest quality care and personalized attention. Discover a new standard in healthcare at our HEALTH APP, where your well-being is our priority.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="" className='animated-image'/>
        <span>
            <img src="/Vector.png" alt="vector" />
          </span>
      </div>
    </div>
  )
}

export default Specialist;