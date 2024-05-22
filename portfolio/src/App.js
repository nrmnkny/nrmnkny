import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ProjectDetail from './components/ProjectDetail';

const App = () => {
  const [content, setContent] = useState('education');

  return (
    <Router>
      <div className="flex flex-col h-screen font-roboto">
        <Header 
          name="Norman Kenya"
          title="Full Stack Developer"
          location="Nairobi"
          email="nrmnkny@encreage.com"
          phone="(254) 705-532-531"
          blogLink="https://blog.encreage.com"
          twitterLink="https://twitter.com/nrmnkny"
        />
        <div className="flex flex-grow">
          <Sidebar setContent={setContent} />
          <Routes>
            <Route path="/" element={<MainContent content={content} />} />
            <Route path="/project/:title" element={<ProjectDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
