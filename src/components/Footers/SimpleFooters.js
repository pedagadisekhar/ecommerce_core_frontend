import React from 'react';
import './simplefooter.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Container, Row, Col } from 'reactstrap';

const SimpleFooter = () => {
  return (
    
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col>
          <header className="custom-teenfashion-header-box">
        <h1>TEEN FASHION &copy;</h1>
      </header>
            <footer className="custom-footer1">
              <ul className="custom-social-icon">
                <li className="custom-social-icon__item">
                  <a className="custom-social-icon__link" href="https://www.facebook.com">
                    <FaFacebook />
                  </a>
                </li>
                <li className="custom-social-icon__item">
                  <a className="custom-social-icon__link" href="#">
                    <FaTwitter />
                  </a>
                </li>
                <li className="custom-social-icon__item">
                  <a className="custom-social-icon__link" href="#">
                    <FaLinkedin />
                  </a>
                </li>
                <li className="custom-social-icon__item">
                  <a className="custom-social-icon__link" href="#">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
              <ul className="custom-menu">
  <li className="custom-menu__item">
    <a className="custom-menu__link" href="#">Home</a>
    <ul className="custom-submenu">
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Shirts Comingsoon</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Shoes Comingsoon</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#"> New Collection</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Desinger Wear</a>
      </li>
    </ul>
  </li>
  <li className="custom-menu__item">
    <a className="custom-menu__link" href="#">Customer Care</a>
    <ul className="custom-submenu">
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Contact Us</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Track order</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Return Order</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Cancel Order</a>
      </li>
    </ul>
  </li>
  <li className="custom-menu__item">
    <a className="custom-menu__link" href="#">Services</a>
    <ul className="custom-submenu">
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Terms&Condition</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Privacy Policy</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Blog</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#"></a>
      </li>
    </ul>
  </li>
  <li className="custom-menu__item">
    <a className="custom-menu__link" href="#">Contact</a>
    <ul className="custom-submenu">
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Support</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">Sales</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#">24/7 Support</a>
      </li>
      <li className="custom-submenu__item">
        <a className="custom-submenu__link" href="#"></a>
      </li>
    </ul>
    </li>
    </ul>

              <p>&copy;2024 hemaprasad_webDevelopment | All Rights Reserved</p>
              <p>Got it! Here’s some content that you might find useful for a teen fashion website:

### Home Page
**Welcome to TrendPulse!**  
Discover the latest in teen fashion with TrendPulse – your go-to spot for trendy outfits, style tips, and everything fashion. From casual streetwear to chic party looks, we’ve got you covered. Explore our collections, get inspired by our style guides, and express your unique look with us!

### About Us
**Who We Are**  
At TrendPulse, we believe fashion is all about self-expression. Our team is passionate about bringing you the freshest styles and the coolest trends. We curate the best in teen fashion to help you stay ahead of the curve and feel confident in your outfits. Whether you’re into bold prints or classic vibes, we’ve got something for everyone.

### Shop
**New Arrivals**  
Stay on top of the latest trends with our new arrivals. Check out the hottest styles and must-have pieces that are flying off the shelves. From comfy hoodies to trendy sneakers, we update our collection regularly to bring you the best in teen fashion.

**Categories**
- **Casual Wear:** Comfortable yet stylish outfits perfect for school or hanging out with friends.
- **Party Wear:** Sparkling dresses and sharp suits for those special occasions.
- **Accessories:** Complete your look with our selection of hats, bags, and jewelry.
- **Footwear:** Trendy sneakers, boots, and more to match every outfit.

### Style Guide
**Fashion Tips for Teens**  
Struggling with what to wear? Our style guide is here to help. Discover how to mix and match pieces, find the best styles for your body type, and learn how to accessorize like a pro. Plus, get inspired by our lookbooks featuring real teens rocking the latest trends.

### Blog
**Fashion News & Trends**  
Stay updated with our blog for the latest fashion news, trend forecasts, and style inspiration. We cover everything from celebrity fashion to street style, so you’re always in the know about what’s hot in the world of teen fashion.

### Contact Us
**Get in Touch**  
Have questions or need style advice? Reach out to us through our contact form or connect with us on social media. We’d love to hear from you and help you with all your fashion needs.

Feel free to adjust these sections based on the specific tone and style of your website!</p>
            </footer>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default SimpleFooter;
