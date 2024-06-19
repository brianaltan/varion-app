import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/background/backgroundVarion.jpg';
import { login, isAuthenticated } from './Identity';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

const MainSectionContainer = styled.section`
  text-align: center;
  padding: 50px 20px;
  color: white;
  background: url(${backgroundImage}) no-repeat center center;
  background-position: 40% 5%;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 15px;
  background: transparent;
`;

const Subtitle = styled.p`
  font-size: 35px;
  font-weight: bold;
  background: transparent;
`;

const HighlightedText = styled.span`
  color: orange;
  background: transparent;
`;  

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background: transparent;
`;

const ButtonLogin = styled.div<{ isAuthenticated: boolean }>`
  button {
    background: ${({ isAuthenticated }) => (isAuthenticated ? '#007bff' : '#007bff')};
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: ${({ isAuthenticated }) => (isAuthenticated ? 'default' : 'pointer')};
    font-size: 17px;
    font-weight: bold;
    pointer-events: ${({ isAuthenticated }) => (isAuthenticated ? 'auto' : 'auto')};
    &:hover {
      background: ${({ isAuthenticated }) => (isAuthenticated ? '#0056b3' : '#0056b3')};
    }
  }
`;

const ButtonDashboard = styled.div`
  button {
    background: #ffffff;
    color: black;
    border: none;
    padding: 15px 25px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 17px;
    font-weight: bold;
    &:hover {
      background: #a1a8aa;
    }
  }
`;

const MainSection: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const history = useNavigate();

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

  const handleServices = async () => {
    history('/demo');
  }

  const handleDB = async () => {
    history('/dashboard');
  }

  return (
    <MainSectionContainer>
      <Title>Revolutionizing Email Security through Decentralized Audits<br/></Title>
      <Subtitle>
        The next-gen solution fueled by<br/>
        <HighlightedText>on-chain ML</HighlightedText> and <HighlightedText>zero-knowledge</HighlightedText> proofs.
      </Subtitle>
      <ButtonContainer>
        <ButtonLogin isAuthenticated={authStatus}>
          <button onClick={authStatus ? handleServices : handleSignIn}>
            {authStatus ? 'Get Started' : 'Get Started'}
          </button>
        </ButtonLogin>
        <ButtonDashboard>
          <button onClick={handleDB}>Dashboard</button>
        </ButtonDashboard>
      </ButtonContainer>
    </MainSectionContainer>
  );
};

export default MainSection;
