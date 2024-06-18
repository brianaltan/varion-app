import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import backgroundImage from '../assets/background/backgroundVarion.jpg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh; /* Ensures the container takes the full viewport height */
    background: url(${backgroundImage}) no-repeat center center;
    background-size: cover; /* Ensures the background image covers the entire container */
    background-position: 40% 5%;
    padding: 50px 20px;
`;

const Title = styled.h1`
    color: white;
    text-align: center;
    background: transparent;
`;

const Message = styled.p`
    color: white;
    text-align: center;
    background: transparent;
`;

const Lost: React.FC = () => (
    <Container>
        <Header />
        <Title>404 Not Found</Title>
        <Message>The link you followed is invalid. 
            <br></br> You may be lost. Let's return to the homepage. </Message>
    </Container>
);

export default Lost;
