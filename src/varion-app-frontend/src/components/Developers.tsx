import React from 'react';
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
`;

const Title = styled.h1`
  margin-top: 70px;
  margin-bottom: 20px;
  background: transparent;
  text-align: center;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px; /* Increased gap to provide more space between items */
  max-width: 400px; /* Increased max width to allow more space for names */
  margin: 0 auto;
  text-align: center; /* Center text within each grid item */
  background: transparent;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content within each grid item */
  background: transparent;
  padding: 10px; /* Added padding to avoid text being cut off */
`;

const Name = styled.div`
  color: white;
  font-weight: bold;
  background: transparent;
  font-size: 1.1em; /* Adjusted font size */
  line-height: 1.2em; /* Adjusted line height */
`;

const Role = styled.div`
  color: white;
  font-style: italic;
  background: transparent;
  font-size: 1em; /* Adjusted font size */
  line-height: 1.2em; /* Adjusted line height */
`;

const Developers: React.FC = () => (
  <Container>
    <Title>Developers</Title>
    <Grid>
      <GridItem>
        <Name>Anders Willard Leo</Name>
        <Role>ML Engineer</Role>
      </GridItem>
      <GridItem>
        <Name>Brian Altan</Name>
        <Role>Project Lead</Role>
      </GridItem>
      <GridItem>
        <Name>Kenneth Bryan</Name>
        <Role>Web3 Engineer</Role>
      </GridItem>
      <GridItem>
        <Name>Terris Alvin</Name>
        <Role>Design QA Specialist</Role>
      </GridItem>
    </Grid>
  </Container>
);

export default Developers;
