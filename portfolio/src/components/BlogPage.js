import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogPage = () => {
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
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h2 className="text-4xl font-bold mb-8">Blog Posts</h2>
      <div className="w-full max-w-4xl space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div className="text-sm text-gray-500 mb-1">
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
            <Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">Read more</Link>
          </div>
        ))}
      </div>
      {/* {token && (
        <div className="mt-6">
          <Link to="/admin/blog/new" className="text-white bg-yellow-500 px-4 py-2 rounded-md">Create New Post</Link>
        </div>
      )} */}
    </div>
  );
};

export default BlogPage;
