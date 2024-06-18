import React from 'react';
import styled from 'styled-components';

import analyzeIcon from '../assets/icon/Analyze.png';
import checkmarkIcon from '../assets/icon/Checkmark.png';
import privateIcon from '../assets/icon/Private.png';
import decentralizedIcon from '../assets/icon/Decentralized.png';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensures the wrapper takes at least the full height of the viewport */
  background: #000; 
`;

const AboutContainer = styled.section`
  text-align: center;
  flex: 1;
  margin: 30px;
  padding: 20px;
  background: #10141c;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 1400px;

  h3 {
    font-size: 20px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  color: white; 
  margin-top: 10px;
  margin-bottom: 20px;
  background: #10141c;
`;

const Description = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: normal;
  margin-bottom: 30px;
  background: #10141c;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns with equal width */
  gap: 20px;
  background: #10141c;
`;

const Feature = styled.div`
  padding: 20px;
  background: #10141c;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 15px;
  
  p {
    margin-top: 10px;
    background: #10141c;
  }
  
  h3 {
    font-size: 15px;
    background: #10141c;
  }
`;

const HighlightedText = styled.span`
  color: orange;
  background: #10141c;
`;

const Icon = styled.img`
  width: 100px;
  height: auto;
  background: #10141c;
`;

const About: React.FC = () => (
  <Wrapper>
    <AboutContainer>
      <Title>About <HighlightedText>VARION</HighlightedText></Title>
      <Description>Upload, manage, and analyze financial transactions effortlessly with just a few clicks!</Description>
      <Features>
        <Feature>
          <Icon src={analyzeIcon} alt="Forensic Accounting" />
          <h3>Forensic Accounting</h3>
          <p>Using machine learning to detect anomalies and<br />potential fraud in financial transactions.</p>
        </Feature>
        <Feature>
          <Icon src={checkmarkIcon} alt="Zero-knowledge Proofs" />
          <h3>Zero-knowledge Proofs</h3>
          <p>Uploaded content and generated audit reports are signed with<br />zero-knowledge proofs to ensure tamper-proof data.</p>
        </Feature>
        <Feature>
          <Icon src={privateIcon} alt="Security" />
          <h3>Security</h3>
          <p>Utilizing Internet Identity to create a digital identity. Enhancing privacy<br />by eliminating the need to store passwords in a database.</p>
        </Feature>
        <Feature>
          <Icon src={decentralizedIcon} alt="Decentralized" />
          <h3>Decentralized</h3>
          <p>No centralized infrastructure. On-chain ML model. <br />Made possible on the Internet Computer.</p>
        </Feature>
      </Features>
    </AboutContainer>
  </Wrapper>
);

export default About;
