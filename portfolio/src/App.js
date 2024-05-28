import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ProjectDetail from './components/ProjectDetail';
import BlogPostForm from './components/BlogPostForm';
import BlogManagement from './components/BlogManagement';

const App = () => {
  const [content, setContent] = useState('workexperience');

  return (
    <Router>
      <div className="flex flex-col h-screen font-roboto">
        <Header 
          name="Norman Kenya"
          title="Full Stack Developer"
          location="Nairobi"
          email="normankenya0@gmail.com"
          phone="(254) 705-532-531"
          blogLink="https://blog.nrmnkny.com"
          twitterLink="https://twitter.com/nrmnkny"
        />
        <div className="flex flex-grow">
          <Sidebar setContent={setContent} />
          <Routes>
            <Route path="/" element={<Navigate to="/workexperience" />} />
            <Route path="/workexperience" element={<MainContent content="workexperience" />} />
            <Route path="/education" element={<MainContent content="education" />} />
            <Route path="/skills" element={<MainContent content="skills" />} />
            <Route path="/projects" element={<MainContent content="projects" />} />
            <Route path="/researchinterests" element={<MainContent content="researchinterests" />} />
            <Route path="/project/:title" element={<ProjectDetail />} />
            <Route path="/admin/blog/new" element={<BlogPostForm />} />
            <Route path="/admin/blog" element={<BlogManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
