import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminBlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog');
        setPosts(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:5000/api/blog/${id}`, config);

      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Invalid token.') {
        try {
          const refreshResponse = await axios.post('http://localhost:5000/api/auth/refresh-token', {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          localStorage.setItem('token', refreshResponse.data.token);
          handleDelete(id); // Retry deleting the post
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          navigate('/login'); // Redirect to login if token refresh fails
        }
      } else {
        console.error('Error deleting post:', error);
        console.log('Response:', error.response);
        setError(error);
      }
    }
  };

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">Error fetching posts: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8">Manage Blog Posts</h2>
      <div className="w-full max-w-4xl space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div className="text-sm text-gray-500 mb-1">
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
            <div className="flex justify-between">
              <Link to={`/admin/blog/edit/${post.id}`} className="text-blue-500 hover:underline">Edit</Link>
              <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {location.pathname === '/admin/blog' && (
        <div className="mt-6">
          <Link to="/admin/blog/new" className="text-white bg-yellow-500 px-4 py-2 rounded-md">Create New Post</Link>
        </div>
      )}
    </div>
  );
};

export default AdminBlogList;
