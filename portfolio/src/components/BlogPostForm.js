import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BlogPostForm = ({ token, isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
          const { title, content, author } = response.data;
          setTitle(title);
          setContent(content);
          setAuthor(author);
        } catch (error) {
          setError(error);
        }
      };

      fetchPost();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { title, content, author };

    try {
      console.log('Submitting post data:', postData); // Log post data
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/blog/${id}`, postData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/blog', postData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/blog');
    } catch (error) {
      console.error('Error submitting post:', error); // Log error
      console.log('Response:', error.response); // Log response from server
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{isEdit ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="text-white bg-yellow-500 px-4 py-2 rounded-md">
            {isEdit ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogPostForm;
