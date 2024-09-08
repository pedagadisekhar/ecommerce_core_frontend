import React from 'react';
import './simplefooter.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Container, Row, Col } from 'reactstrap';

const SimpleFooter = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col>
            <footer className="footer1">
              <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
              </div>
              
              <ul className="social-icon">
                <li className="social-icon__item">
                  <a className="social-icon__link" href="https://www.facebook.com">
                    <FaFacebook />
                  </a>
                </li>
                <li className="social-icon__item">
                  <a className="social-icon__link" href="#">
                    <FaTwitter />
                  </a>
                </li>
                <li className="social-icon__item">
                  <a className="social-icon__link" href="#">
                    <FaLinkedin />
                  </a>
                </li>
                <li className="social-icon__item">
                  <a className="social-icon__link" href="#">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
              <ul className="menu">
                <li className="menu__item">
                  <a className="menu__link" href="#">Home</a>
                </li>
                <li className="menu__item">
                  <a className="menu__link" href="#">About</a>
                </li>
                <li className="menu__item">
                  <a className="menu__link" href="#">Services</a>
                </li>
                <li className="menu__item">
                  <a className="menu__link" href="#">Team</a>
                </li>
                <li className="menu__item">
                  <a className="menu__link" href="#">Contact</a>
                </li>
              </ul>
              <p>&copy;2024 hemaprasad_webDevelopment | All Rights Reserved</p>
            </footer>
          </Col>
        </Row>
      </Container>
      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </footer>
  );
};

export default SimpleFooter;
