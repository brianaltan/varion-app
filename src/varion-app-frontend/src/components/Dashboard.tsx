import React, { useState } from 'react';
import Header from './Header';
import styled from 'styled-components';
import backgroundImage from '../assets/background/backgroundVarion.jpg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: url(${backgroundImage}) no-repeat center center;
    background-size: cover;
    background-position: 40% 5%;
    padding: 50px 20px;
    max-width: 100%;
    overflow: hidden;
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
    font-size: 20px;
    background: transparent;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 20px;
`;

const SpecialGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 400px; /* Adjusted width */
    height: auto;
    margin-top: 20px;
    padding: 20px;
`;

const GridItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 7.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
    &:nth-child(odd) {
        border-right: 1px solid rgba(255, 255, 255, 0);
    }
    &:nth-child(even) {
        border-left: 1px solid rgba(255, 255, 255, 0);
    }
    height: 40px;
    &:nth-child(4),
    &:nth-child(8) {
        border-bottom: none;
    }
    color: white;
    font-size: 13px;
`;

const SpecialGridItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    background-color: ${props => props.color};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => !props.disabled && `${props.color}cc`}; /* Darken on hover */
    }

    &:disabled {
        opacity: 0.5;
    }
`;

type Email = {
    subject: string;
    reportId: string;
    reportDate: string;
    status: string;
    confidenceRate: number; // Changed type to number
};

type Props = {
    authStatus: boolean;
};

const Dashboard: React.FC<Props> = ({ authStatus }) => {
    const initialEmails: Email[] = [
        {
            subject: 'Hello World!',
            reportId: 'CAJR-HKC5-AFCL-DNKX',
            reportDate: '19th July 2024',
            status: 'Completed',
            confidenceRate: 100, 
        },
        {
            subject: 'Crazy',
            reportId: 'BZJS-KD84-JDSF-NDJ3',
            reportDate: '14th July 2024',
            status: 'Processing',
            confidenceRate: 49, 
        },
        {
            subject: 'Hello!',
            reportId: 'CAJR-HKC5-AFCL-DNKX',
            reportDate: '19th July 2024',
            status: 'Failed',
            confidenceRate: 87,
        },
    ];

    const [emails, setEmails] = useState<Email[]>(initialEmails);
    const [currentEmailIndex, setCurrentEmailIndex] = useState(0);

    const handleNextEmail = () => {
        if (currentEmailIndex < emails.length - 1) {
            setCurrentEmailIndex(currentEmailIndex + 1);
        }
    };

    const handlePreviousEmail = () => {
        if (currentEmailIndex > 0) {
            setCurrentEmailIndex(currentEmailIndex - 1);
        }
    };

    const handleDeleteEmail = () => {
        const updatedEmails = emails.filter((_, index) => index !== currentEmailIndex);
        setEmails(updatedEmails);
        setCurrentEmailIndex((prevIndex) => (prevIndex >= updatedEmails.length ? updatedEmails.length - 1 : prevIndex));
    };

    const currentEmail = emails[currentEmailIndex];

    const truncateText = (text: string, maxLength: number): string => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '..';
        }
        return text;
    };

    const EmailSubject: React.FC<{ subject: string }> = ({ subject }) => (
        <p>{truncateText(subject, 24)}</p>
    );

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'Completed':
                return '#97FC50'; // Green hex
            case 'Processing':
                return '#48A3FF'; // Light blue hex
            case 'Failed':
                return '#FF4545'; // Red hex
            default:
                return '#000000'; // Default to black if status is unknown
        }
    };

    const StatusText = styled.p<{ status: string }>`
        color: ${({ status }) => getStatusColor(status)};
    `;

    const getConfidenceLevel = (confidenceRate: number): string => {
        if (confidenceRate >= 90) {
            return `${confidenceRate.toFixed(0)}% | High Confidence`;
        } else if (confidenceRate >= 50) {
            return `${confidenceRate.toFixed(0)}% | Moderate Confidence`;
        } else {
            return `${confidenceRate.toFixed(0)}% | Low Confidence`;
        }
    };

    return (
        <Container>
            <Header />
            <Title>Dashboard</Title>
            {authStatus ? (
                emails.length > 0 ? (
                    <>
                        <AuthStatusMessage>
                            User has dashboard access. Here's a preview:
                        </AuthStatusMessage>
                        <GridContainer>
                            <GridItem>
                                <p><strong>Email Subject:</strong></p>
                            </GridItem>
                            <GridItem>
                                <EmailSubject subject={currentEmail.subject} />
                            </GridItem>
                            <GridItem>
                                <p><strong>Report ID:</strong></p>
                            </GridItem>
                            <GridItem>
                                <p>{currentEmail.reportId}</p>
                            </GridItem>
                            <GridItem>
                                <p><strong>Report Date:</strong></p>
                            </GridItem>
                            <GridItem>
                                <p>{currentEmail.reportDate}</p>
                            </GridItem>
                            <GridItem>
                                <p><strong>Status:</strong></p>
                            </GridItem>
                            <GridItem>
                                <StatusText status={currentEmail.status}>{currentEmail.status}</StatusText>
                            </GridItem>
                            <GridItem>
                                <p><strong>Confidence Rate:</strong></p>
                            </GridItem>
                            <GridItem>
                                <p>{getConfidenceLevel(currentEmail.confidenceRate)}</p>
                            </GridItem>
                        </GridContainer>
                        <SpecialGridContainer>
                            <SpecialGridItem>
                                <Button 
                                    color="#007bff" 
                                    onClick={handlePreviousEmail} 
                                    disabled={currentEmailIndex === 0}
                                >
                                    ← Back
                                </Button>
                            </SpecialGridItem>
                            <SpecialGridItem>
                                <Button 
                                    color="#ff4444" 
                                    onClick={handleDeleteEmail} 
                                    disabled={emails.length === 0}
                                >
                                    Delete
                                </Button>
                            </SpecialGridItem>
                            <SpecialGridItem>
                                <Button 
                                    color="#007bff" 
                                    onClick={handleNextEmail} 
                                    disabled={currentEmailIndex >= emails.length - 1}
                                >
                                    Next →
                                </Button>
                            </SpecialGridItem>
                        </SpecialGridContainer>
                    </>
                ) : (
                    <AuthStatusMessage>
                        No emails to display.
                    </AuthStatusMessage>
                )
            ) : (
                <AuthStatusMessage>
                    User does not have dashboard access because they are not signed in.
                    <br /> Please sign in to access this dashboard.
                </AuthStatusMessage>
            )}
        </Container>
    );
};

export default Dashboard;
