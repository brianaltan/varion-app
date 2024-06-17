import React from 'react';
import Header from './components/Header';
import MainSection from './components/MainSection';
import About from './components/About';
import Footer from './components/Footer';
import Developers from './components/Developers'
import GlobalStyle from './globalStyles';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Header />
    <MainSection />
    <About />
    <Developers />
    <Footer />

  </>
);

export default App;