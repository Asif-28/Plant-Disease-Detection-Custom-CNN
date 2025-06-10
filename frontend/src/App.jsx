import React from 'react';
import './index.css';
import Header from './components/Header';
import About from './components/About';
import UploadForm from './components/UploadForm';
import Footer from './components/Footer';
import ModelInfo from './components/ModelInfo';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <About />
        <UploadForm />
        <ModelInfo/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
