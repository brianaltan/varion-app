import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import logo from '../assets/icon/VarionLogoTitleWhite.png';
import RalewayMedium from '../fonts/Raleway-Medium.ttf'; // Import font file
import { login, logout, isAuthenticated } from './Identity';
import { useNavigate } from 'react-router-dom';

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
  width: 150px;
  height: auto;
  margin-right: 10px;
  margin-left: 15px;
  transition: background 0.3s ease;
  background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#1a1a1a' : '#000')};
`;

const Nav = styled.nav<HeaderContainerProps>`
  display: flex;
  align-items: center;
  transition: background 0.3s ease;
  background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#1a1a1a' : '#000')};
  a {
    background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#1a1a1a' : '#000')};
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button<HeaderContainerProps>`
  transition: background 0.3s ease;
  background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#007bff' : '#007bff')};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#0056b3' : '#0056b3')};
  }
`;

const ButtonLogin = styled.div<{ isAuthenticated: boolean; scrollPosition?: number }>`
  background: ${(props) => (props.scrollPosition && props.scrollPosition > 50 ? '#1a1a1a' : '#000')};
  button {
    background: ${({ isAuthenticated }) => (isAuthenticated ? '#ff4444' : '#007bff')};
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    margin-right: 20px;
    cursor: ${({ isAuthenticated }) => (isAuthenticated ? 'pointer' : 'default')};
    font-size: 16px;
    font-weight: bold;

    &:hover {
      background: ${({ isAuthenticated }) => (isAuthenticated ? '#ff4444' : '#0056b3')};
    }
  }
`;

const Header: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authenticated = await isAuthenticated();
      setAuthStatus(authenticated);
    };
    checkAuthStatus();
  }, []);

  const handleSignIn = async () => {
    await login();
  };

  const handleSignOut = async () => {
    await logout();
  };

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

  const handleNavigation = (path: string) => {
    navigate(path);
    setScrollPosition(0)
  };

  return (
    <>
      <GlobalStyle />
      <HeaderContainer scrollPosition={scrollPosition}>
        <Logo src={logo} alt="VARION Logo" scrollPosition={scrollPosition} />
        <Nav scrollPosition={scrollPosition}>
          <a onClick={() => handleNavigation('/')}>Home</a>
          <a onClick={() => handleNavigation('/demo')}>Services</a>
          <a onClick={() => handleNavigation('/dashboard')}>Dashboard</a>
          <a onClick={() => handleNavigation('/devs')}>Developers</a>
          <ButtonLogin isAuthenticated={authStatus} scrollPosition={scrollPosition}>
            <button onClick={authStatus ? handleSignOut : handleSignIn}>
              {authStatus ? 'Sign Out' : 'Sign In'}
            </button>
          </ButtonLogin>
        </Nav>
      </HeaderContainer>
    </>
  );
};

export default Header;
