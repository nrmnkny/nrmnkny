import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ProjectDetail from './components/ProjectDetail';
import BlogList from './components/BlogList';
import BlogPostForm from './components/BlogPostForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [content, setContent] = useState('workexperience');
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setTokenHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen font-roboto">
        <Header
          name="Norman Kenya"
          title="Full Stack Developer"
          location="Nairobi"
          email="normankenya0@gmail.com"
          phone="(254) 705-532-531"
          blogLink="http://localhost:3000/blog" 
          twitterLink="https://twitter.com/nrmnkny"
        />
        <div className="flex flex-grow">
          <Sidebar setContent={setContent} />
          <Routes>
            <Route path="/" element={<MainContent content={content} />} />
            <Route path="/workexperience" element={<MainContent content="workexperience" />} />
            <Route path="/education" element={<MainContent content="education" />} />
            <Route path="/skills" element={<MainContent content="skills" />} />
            <Route path="/projects" element={<MainContent content="projects" />} />
            <Route path="/researchinterests" element={<MainContent content="researchinterests" />} />
            <Route path="/project/:title" element={<ProjectDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/admin/blog/new" element={token ? <BlogPostForm token={token} /> : <Navigate to="/login" />} />
            <Route path="/admin/blog/edit/:id" element={token ? <BlogPostForm token={token} isEdit /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm setToken={setTokenHandler} />} />
            <Route path="/register" element={<RegisterForm setToken={setTokenHandler} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
