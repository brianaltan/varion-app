import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/background/backgroundVarion.jpg';
import Header from './Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  background-position: 40% 5%;
  padding: 20px;
  margin-top: 20px;
`;

const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 40px;
  background: transparent;
  text-align: center;
  color: white;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  width: 100%;
  background: lightgray;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
  margin-top: -1px;
`;

const ProgressBar = styled.div<{ width: number, color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  font-weight: bold;
  background: ${props => props.color};
  width: ${props => props.width}%;
  transition: width 0.3s ease-in-out;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const VoteButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
  width: 140px;
  height: 40px;
  margin: 0 10px;

  &:first-child {
    background-color: red;
  }

  &:last-child {
    background-color: blue;
  }

  &.voted, &.unclickable {
    pointer-events: none;
    opacity: 0.5;
  }

  &.voted:after {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: white;
  margin-bottom: 40px;
`;

const VoteSection = styled.div`
  background: #10141c;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 600px;
`;

const AuthStatusMessage = styled.p`
  color: white;
  text-align: center;
  font-size: 20px;
  background: transparent;
`;

const votesData = [
  { id: 1, title: 'Vote 1', yesVotes: 0, noVotes: 0, voters: 0, prize: 100, endTime: 1719909404, participant: [123,244], content: "Hi Brian, I am in the coffee shop. Let's meet up" },
  { id: 2, title: 'Vote 2', yesVotes: 1, noVotes: 0, voters: 0, prize: 123, endTime: 1719009404, participant: [123,244], content: "Your account has been compromised. Click here to reset your password." },
  { id: 3, title: 'Vote 3', yesVotes: 1, noVotes: 2, voters: 0, prize: 124, endTime: 1717929999, participant: [123,244], content: "Congratulations! You've won a free trip to Hawaii. Click to claim your prize." }
];

type Props = {
  authStatus: boolean;
};

const Vote: React.FC<Props> = ({ authStatus }) => {
  const [votes, setVotes] = useState(votesData);
  const [votedIds, setVotedIds] = useState({} as { [id: number]: { voted: boolean, voteType: string } });

  
  const handleVote = (id: number, vote: string) => {
    if (!votedIds[id] || !votedIds[id].voted) {
      setVotedIds({ ...votedIds, [id]: { voted: true, voteType: vote } });
      setVotes(votes.map(voteData => {
        if (voteData.id === id) {
          if (vote === 'yes') {
            return { ...voteData, yesVotes: voteData.yesVotes + 1, voters: voteData.voters + 1 };
          } else {
            return { ...voteData, noVotes: voteData.noVotes + 1, voters: voteData.voters + 1 };
          }
        }
        return voteData;
      }));
    }
  };

  return (
    <Container>
      <Header />
      <Title>Vote on Phishing</Title>
      {authStatus ? (
        votes.map(({ id, title, yesVotes, noVotes, voters, content, endTime }) => {
          const totalVotes = yesVotes + noVotes;
          let yesPercentage = 0;
          let noPercentage = 0;

          if (yesVotes === 0 && noVotes === 0) {
            yesPercentage = 50;
            noPercentage = 50;
          } else {
            yesPercentage = (yesVotes / totalVotes) * 100;
            noPercentage = (noVotes / totalVotes) * 100;
          }

          const endTimeInSeconds = endTime;
          const currentTimeInSeconds = Math.floor(Date.now() / 1000);
          const timeLeftInSeconds = endTimeInSeconds - currentTimeInSeconds;

          let timeDisplay;
          let votingEnded = timeLeftInSeconds <= 0;

          if (!votingEnded) {
            const days = Math.floor(timeLeftInSeconds / 86400);
            const hours = Math.floor((timeLeftInSeconds % 86400) / 3600);
            const minutes = Math.floor(((timeLeftInSeconds % 86400) % 3600) / 60);
            timeDisplay = `${days} days, ${hours} hours, ${minutes} minutes left`;
          } else {
            timeDisplay = 'Voting Period Ended';
          }

          return (
            <VoteSection key={id}>
              <h2 style={{ color: 'white', textAlign: 'center' }}>Voting ID: {id}</h2>
              <p style={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>{content}</p>
              <div style={{ marginTop: 20 }}>
                <ProgressBarContainer>
                  <ProgressBar width={(yesVotes > 0 || noVotes > 0) ? ((yesVotes / (yesVotes + noVotes)) * 100) : 50} color="#ff4444">{yesPercentage.toFixed(0)}%</ProgressBar>
                  <ProgressBar width={(noVotes > 0 || yesVotes > 0) ? ((noVotes / (yesVotes + noVotes)) * 100) : 50} color="#007bff">{noPercentage.toFixed(0)}%</ProgressBar>
                </ProgressBarContainer>
              </div>
              <ButtonContainer>
                <VoteButton
                  onClick={() => handleVote(id, 'yes')}
                  style={{ backgroundColor: '#ff4444' }}
                  className={(votedIds[id]?.voted && votedIds[id].voteType === 'yes') || votingEnded ? 'voted' : votedIds[id]?.voted ? 'unclickable' : 'active'}
                  disabled={votingEnded}
                >{votedIds[id]?.voted && votedIds[id].voteType === 'yes' ? 'Voted!' : 'Phishing'}</VoteButton>
                <VoteButton
                  onClick={() => handleVote(id, 'no')}
                  style={{ backgroundColor: '#007bff' }}
                  className={(votedIds[id]?.voted && votedIds[id].voteType === 'no') || votingEnded ? 'voted' : votedIds[id]?.voted ? 'unclickable' : 'active'}
                  disabled={votingEnded}
                >{votedIds[id]?.voted && votedIds[id].voteType === 'no' ? 'Voted!' : 'Not Phishing'}</VoteButton>
              </ButtonContainer>
              <InfoContainer>
                <div>💰 ${(votes.find(voteData => voteData.id === id) || {}).prize}</div>
                <div>📬 {(votes.find(voteData => voteData.id === id) || {}).voters}</div>
                <div>⏳ {timeDisplay}</div>
              </InfoContainer>
            </VoteSection>
          );
        })
      ) : (
        <AuthStatusMessage>
          User does not have access to the Voting page because they are not signed in.
          <br></br>Please sign in to access this service.
        </AuthStatusMessage>
      )}
    </Container>
  );
};

export default Vote;
