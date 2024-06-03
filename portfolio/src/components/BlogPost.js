import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <div>Error fetching post: {error.message}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">By {post.author} on {new Date(post.created_at).toLocaleDateString()}</p>
      <div className="text-lg leading-relaxed">
        {post.content}
      </div>
    </div>
  );
};

export default BlogPost;
