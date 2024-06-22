import React, { useState } from 'react';
import Header from './Header';
import styled from 'styled-components';
import backgroundImage from '../assets/background/backgroundVarion.jpg';
import { useDropzone } from 'react-dropzone';
import { Endpoint } from '@dfinity/agent';
import { useNavigate } from 'react-router-dom';

import { SyncRedactor } from 'redact-pii';
const redactor = new SyncRedactor();

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
    margin-top: 10px;
`;

const DropzoneContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed white;
    padding: 20px;
    color: white;
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
    height: 125px;
    background: rgba(0, 0, 0, 0.5);
`;

const FilePreview = styled.div`
    margin-top: 20px;
    color: white;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
`;

const ButtonLogin = styled.div<{ disabled: boolean }>`
    button {
        background: ${({ disabled }) => (disabled ? '#ccc' : '#007bff')};
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 5px;
        margin-top: 20px;
        cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
        font-size: 17px;
        font-weight: bold;
        pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
        &:hover {
            background: ${({ disabled }) => (disabled ? '#ccc' : '#0056b3')};
            ::before {
                content: ${({ disabled }) => (disabled ? "'File is not uploaded'" : "''")};
                position: absolute;
                top: -30px;
                left: -15px;
                background: #000;
                color: #fff;
                padding: 10px;
                border-radius: 5px;
                z-index: 1;
                pointer-events: none;
            }
        }
    }
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 18px;
    background: transparent;
    margin-top: 10px;
    white-space: pre-line; /* Preserve line breaks */
`;

const Hyperlink = styled.a`
    color: #007bff; /* Normal state color */
    text-decoration: none;

    &:hover {
        color: #0056b3; /* Hover state color */
    }

    &:visited {
        color: #007bff; /* Visited state color */
    }
    background: transparent;
`;

type Props = {
    authStatus: boolean;
};

const Services: React.FC<Props> = ({ authStatus }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<React.ReactNode | null>(null);
    const navigate = useNavigate();

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFileName(acceptedFiles[0].name);
            setFileUploaded(true);
            setUploadedFile(acceptedFiles[0]);
            setErrorMessage(null); // Reset error message on new file upload
            console.log(acceptedFiles);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'message/rfc822': ['.eml'] },
        multiple: false
    });

    const handleAnalyzeClick = () => {
        if (fileUploaded && uploadedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result as string;
                const headers = [];
                const lines = fileContent.split('\n');
      
                for (const line of lines) {
                    let value = line.replace(/^Date: /, '').replace(/^Subject: /, '').replace(/^From: /, '').replace(/^To: /, '');
                    try {
                        value = decodeURIComponent(value); // decode UTF-8 encoded string
                    } catch (error) {
                        setErrorMessage(
                            <span>
                                At this time, demo supports only plain-text emails in UTF-8 format.
                                <br />
                                Please ensure your emails meet this requirement.
                                <br />
                                To help you get started, you can download a sample file <Hyperlink href="https://drive.google.com/file/d/1hn8fIz_1Oj9SPSJbMILB0PsjvlkKi_gc/view?usp=sharing" target="_blank" rel="noopener noreferrer">here</Hyperlink>.
                            </span>
                        );
                        return;
                    }
                    value = value.replace(/=/g, ''); // remove = characters
                    value = value.replace(/\r$/, ''); // remove trailing \r
      
                    // Extract email address from "Name <email@example.com>" format
                    const emailRegex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
                    const match = value.match(emailRegex);
                    if (match) {
                        value = match[0];
                    }
      
                    if (line.startsWith('Date:')) {
                        headers.push({ type: 'Date', value });
                    } else if (line.startsWith('Subject:')) {
                        headers.push({ type: 'Subject', value });
                    } else if (line.startsWith('From:')) {
                        headers.push({ type: 'From', value });
                    } else if (line.startsWith('To:')) {
                        headers.push({ type: 'To', value });
                    } else if (line.startsWith('Content-Type: text/plain')) {
                        let plainTextContent = '';
                        for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
                            const nextLine = lines[i];
                            if (nextLine.startsWith('Content-Type: text/html')) {
                                break;
                            }
                            plainTextContent += nextLine.replace(/[\r\n]/g, '') + '\n';
                        }
                        let piiFilteredContent = redactor.redact(plainTextContent);
                        headers.push({ type: 'Content', value: piiFilteredContent });
                    }
                }
      
                console.log(headers);
                navigate('/dashboard');
            };
            reader.readAsText(uploadedFile);
        }
    };

    return (
        <Container>
            <Header />
            <Title>Analyze Phishing Emails</Title>
            {authStatus ? (
                <>
                    <DropzoneContainer {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag and drop .eml file here, or click to select a file</p>
                    </DropzoneContainer>
                    {fileName && (
                        <FilePreview>
                            <p>Uploaded File: {fileName}</p>
                        </FilePreview>
                    )}
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <ButtonLogin disabled={!fileUploaded}>
                        <button onClick={handleAnalyzeClick} disabled={!fileUploaded}>
                            Analyze
                        </button>
                    </ButtonLogin>
                    
                </>
            ) : (
                <AuthStatusMessage>
                    User does not have service access because they are not signed in.
                    <br />
                    Please sign in to access this service.
                </AuthStatusMessage>
            )}
        </Container>
    );
};

export default Services;