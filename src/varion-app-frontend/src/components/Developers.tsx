import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 100px;
  padding: 60px;
  text-align: center;
  color: white;
  background-color: #000; /* Optional: Adds a background color */
`;

const Title = styled.h1`
  margin-bottom: 20px;
  background: transparent;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
  text-align: center; /* Center text within each grid item */
  background: transparent;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content within each grid item */
  background: transparent;
`;

const Name = styled.div`
  font-weight: bold;
  background: transparent;
`;

const Role = styled.div`
  font-style: italic;
  background: transparent;
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
