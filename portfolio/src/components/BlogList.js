import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

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

  if (error) {
    return <div>Error fetching posts: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-2">By {post.author} on {new Date(post.created_at).toLocaleDateString()}</p>
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">Read more</Link>
          </div>
        ))}
      </div>
      {token && (
        <div className="mt-4">
          <Link to="/admin/blog/new" className="text-white bg-yellow-500 px-4 py-2 rounded-md">Create New Post</Link>
        </div>
      )}
    </div>
  );
};

export default BlogList;
