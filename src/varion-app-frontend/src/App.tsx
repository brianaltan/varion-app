  // App.tsx
  import React, { useState, useEffect } from 'react';
  import Header from './components/Header';
  import MainSection from './components/MainSection';
  import About from './components/About';
  import Footer from './components/Footer';
  import Developers from './components/Developers';
  import GlobalStyle from './globalStyles';
  import Services from './components/Services';
  import Lost from './components/Lost'; // Import your Lost component
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { isAuthenticated } from './components/Identity'; // Import your authentication function
  import Dashboard from './components/Dashboard';
  import Vote from './components/Vote';
  import HeaderNew from './components/HeaderNew';

  const App: React.FC = () => {
    const [authStatus, setAuthStatus] = useState<boolean>(false);

    useEffect(() => {
      const checkAuthStatus = async () => {
        const authenticated = await isAuthenticated();
        setAuthStatus(authenticated);
      };
      checkAuthStatus();
    }, []);

    return (
      <Router>
        <GlobalStyle />
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Services authStatus={authStatus} />} />
          <Route path="/dashboard" element={<Dashboard authStatus={authStatus} />} />
          <Route path="/devs" element={<Dev />} />
          <Route path="/vote" element={<Vote authStatus={authStatus}/>} />
          {/* This route will catch all other paths */}
          <Route path="*" element={<Lost />} />
        </Routes>
        <Footer />
      </Router>
    );
  };

  const Home: React.FC = () => (
    <>
      <MainSection />
      <About />
    </>
  );

  const Dev: React.FC = () => {
    return (
      <>
        <Developers />
      </>
    );
  };
  
  export default App;
