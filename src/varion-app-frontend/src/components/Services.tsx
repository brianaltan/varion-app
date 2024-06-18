import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import backgroundImage from '../assets/background/backgroundVarion.jpg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Ensures the container takes the full viewport height */
    background: url(${backgroundImage}) no-repeat center center;
    background-size: cover; /* Ensures the background image covers the entire container */
    background-position: 40% 5%;
    padding: 50px 20px;
`;

const Title = styled.h1`
    margin-top: 10px;
    color: white;
    text-align: center;
    background: transparent;
`;

const AuthStatusMessage = styled.p`
    color: white;
    text-align: center;
    font-size: 20px; /* Adjust font size as needed */
    background: transparent;
`;

type Props = {
    authStatus: boolean;
};
  
const Services: React.FC<Props> = ({ authStatus }) => (
    <Container>
        <Header />
        <Title>Services</Title>
        {authStatus ? (
            <AuthStatusMessage>User has service access</AuthStatusMessage>
        ) : (
            <AuthStatusMessage>User does not have service access because they are not signed in. 
            <br></br>Please sign in to access this service.</AuthStatusMessage>)}
        {/* Add more content for the Services page */}
    </Container>
);

export default Services;
