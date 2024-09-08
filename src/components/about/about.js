import React from "react";

import './about.css'
import backgroundImage from '../../assets/images/home.jpg';
import aboutImage from '../../assets/images/home-10.jpg';
import aboutImage1 from '../../assets/images/about-1.jpeg';



const About = ()=>{
   
 
   return (
    <div>
    
     <section className="about" id="about">
            <h1 className="heading">about us</h1>
            <div className="container">
                <figure className="about-image">
                <img src={aboutImage} alt="" height="500" />
        <img src={aboutImage1} alt="" className="about-img" />
                </figure>
                <div className="about-content">
                    <h3>18 years of experience</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores laboriosam consequuntur repellendus eius soluta incidunt ratione facere quisquam suscipit veniam, tenetur dolor sapiente quos explicabo obcaecati iusto quae quia.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque minus impedit modi suscipit aut placeat porro ipsum facere dolorum dolorem consequatur, harum veritatis quo. Repellendus optio odio dolorem sapiente quae.</p>
                    <a href="#" className="btn">
                        <span className="text text-1">read more</span>
                        <span className="text text-2" aria-hidden="true">read more</span>
                    </a>
                </div>
            </div>
        </section>
     
   
    
    
    </div>
  );
}
export default About