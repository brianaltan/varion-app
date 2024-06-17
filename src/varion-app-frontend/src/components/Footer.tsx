import React from 'react';
import styled from 'styled-components';
import ICLogo from '../assets/icon/ICLogoWhite.png';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 10px; /* Example font size */
  margin-top: 20px; /* Example margin top */
  position: relative; /* Needed for absolute positioning */
  p{
    background: #1a1a1a;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  position: absolute;
  right: 20px; /* Adjust this value to fit your layout */
  bottom: 20px; /* Adjust this value to fit your layout */
  background: #1a1a1a;
`;

const Footer: React.FC = () => (
  <FooterContainer>
    <p>&copy; 2024 VARION. All Rights Reserved.</p>
    <Logo src={ICLogo} alt="IC Logo" />
  </FooterContainer>
);

export default Footer;
