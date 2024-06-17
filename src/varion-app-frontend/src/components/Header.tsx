import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import logo from '../assets/icon/VarionLogoTitleWhite.png';
import RalewayMedium from '../fonts/Raleway-Medium.ttf'; // Import font file

// Define global styles to apply the font
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'RalewayMedium';
    src: url(${RalewayMedium}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'RalewayMedium', sans-serif; /* Apply the font to the body */
    margin: 0;
    padding: 0;
  }
`;

interface HeaderContainerProps extends React.HTMLAttributes<HTMLElement> {
  scrollPosition?: number;
}

const HeaderContainer = styled.header<HeaderContainerProps>`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#1a1a1a' : '#000')};
  color: white;
  transition: background 0.3s ease;
  z-index: 999;
`;

const Logo = styled.img<HeaderContainerProps>`
  width: 100px;
  height: auto;
  margin-right: 10px;
  margin-left: 15px;
  transition: background 0.3s ease; /* Add transition for background */
  background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#1a1a1a' : '#000')};
`;

const Nav = styled.nav<HeaderContainerProps>`
  display: flex;
  align-items: center;
  transition: background 0.3s ease; /* Add transition for background */
  background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#1a1a1a' : '#000')};
  
  a {
    background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#1a1a1a' : '#000')};
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-size: 12px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button<HeaderContainerProps>`
  transition: background 0.3s ease; /* Add transition for background */
  background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#007bff' : '#007bff')};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  margin-right: 10px;

  &:hover {
    background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#0056b3' : '#0056b3')};
  }
`;

const Header: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <GlobalStyle /> {/* Apply global styles */}
      <HeaderContainer scrollPosition={scrollPosition}>
        <Logo src={logo} alt="VARION Logo" scrollPosition={scrollPosition} />
        <Nav scrollPosition={scrollPosition}>
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Developers</a>
          <Button scrollPosition={scrollPosition}>Get Started</Button>
        </Nav>
      </HeaderContainer>
    </>
  );
};

export default Header;