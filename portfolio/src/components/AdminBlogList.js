import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminBlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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
      console.log('Attempting to delete post with ID:', id); // Log ID
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.delete(`http://localhost:5000/api/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Delete response:', response); // Log delete response
      setPosts(posts.filter(post => post.id !== id)); // Update the state to remove the deleted post
    } catch (error) {
      console.error('Error deleting post:', error); // Log error
      console.log('Response:', error.response); // Log response from server
      setError(error);
    }
  };

  if (error) {
    return <div>Error fetching posts: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Manage Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-2">By {post.author} on {new Date(post.created_at).toLocaleDateString()}</p>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="flex justify-between mt-4">
              <Link to={`/admin/blog/edit/${post.id}`} className="text-blue-500 hover:underline">Edit</Link>
              <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogList;
