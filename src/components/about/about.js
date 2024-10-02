import React from "react";

import './about.css';
import backgroundImage from '../../assets/images/home.jpg';
import aboutImage from '../../assets/images/home-10.jpg';
import aboutImage1 from '../../assets/images/about-1.jpeg';

const About = () => {
  return (
    <div className="about">
      <section className="custom-about-section" id="about">
        <h1 className="custom-about-heading">About Us</h1>
        <div className="custom-about-container">
          <figure className="custom-about-images">
            {/* <img src={aboutImage} alt="Main About" className="custom-main-image" />
            <img src={aboutImage1} alt="Secondary About" className="custom-secondary-image" /> */}
          </figure>
          <div className="custom-about-content">
            <h3 className="custom-about-subheading">18 Years of Experience</h3>
            <p className="custom-about-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores laboriosam consequuntur repellendus eius soluta incidunt ratione facere quisquam suscipit veniam, tenetur dolor sapiente quos explicabo obcaecati iusto quae quia.</p>
            <p className="custom-about-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque minus impedit modi suscipit aut placeat porro ipsum facere dolorum dolorem consequatur, harum veritatis quo. Repellendus optio odio dolorem sapiente quae.</p>
            <a href="#" className="custom-button">
              <span className="custom-button-text">Read More</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
