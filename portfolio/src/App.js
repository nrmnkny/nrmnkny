import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ProjectDetail from './components/ProjectDetail';
import BlogPage from './components/BlogPage';
import BlogDetail from './components/BlogDetail';
import BlogPostForm from './components/BlogPostForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AdminDashboard from './components/AdminDashboard';
import PortfolioForm from './components/PortfolioForm';
import AdminBlogList from './components/AdminBlogList';
import AdminPortfolioList from './components/AdminPortfolioList';
import DeletePortfolioItem from './components/DeletePortfolioItem';

const App = () => {
  const [content, setContent] = useState('workexperience');
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setTokenHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="flex flex-col h-screen font-roboto">
            <Header
              name="Norman Kenya"
              title="Full Stack Developer"
              location="Nairobi"
              email="normankenya0@gmail.com"
              phone="(254) 705-532-531"
              blogLink="/blog"
              twitterLink="https://twitter.com/nrmnkny"
            />
            <div className="flex flex-grow">
              <Sidebar setContent={setContent} />
              <MainContent content={content} />
            </div>
          </div>
        }>
          <Route path="workexperience" element={<MainContent content="workexperience" />} />
          <Route path="education" element={<MainContent content="education" />} />
          <Route path="skills" element={<MainContent content="skills" />} />
          <Route path="projects" element={<MainContent content="projects" />} />
          <Route path="researchinterests" element={<MainContent content="researchinterests" />} />
          <Route path="project/:title" element={<ProjectDetail />} />
        </Route>
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/login" element={<LoginForm setToken={setTokenHandler} />} />
        <Route path="/register" element={<RegisterForm setToken={setTokenHandler} />} />
        <Route path="/admin" element={token ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/blog" element={token ? <AdminBlogList /> : <Navigate to="/login" />} />
        <Route path="/admin/blog/new" element={token ? <BlogPostForm token={token} /> : <Navigate to="/login" />} />
        <Route path="/admin/blog/edit/:id" element={token ? <BlogPostForm token={token} isEdit /> : <Navigate to="/login" />} />
        <Route path="/admin/portfolio" element={token ? <AdminPortfolioList /> : <Navigate to="/login" />} />
        <Route path="/admin/portfolio/new" element={token ? <PortfolioForm token={token} /> : <Navigate to="/login" />} />
        <Route path="/admin/portfolio/edit/:id" element={token ? <PortfolioForm token={token} isEdit /> : <Navigate to="/login" />} />
        <Route path="/admin/portfolio/delete/:id" element={token ? <DeletePortfolioItem /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
