import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PortfolioForm = ({ token, isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      const fetchPortfolioItem = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/portfolio/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { title, description, category, start_date, end_date } = response.data;
          setTitle(title);
          setDescription(description);
          setCategory(category);
          if (category !== 'skills') {
            setStartDate(start_date ? start_date.split('T')[0] : '');
            setEndDate(end_date ? end_date.split('T')[0] : '');
          }
        } catch (error) {
          setError(error);
        }
      };

      fetchPortfolioItem();
    }
  }, [isEdit, id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const portfolioData = { title, description, category, start_date: startDate, end_date: endDate };

    if (category === 'skills') {
      delete portfolioData.start_date;
      delete portfolioData.end_date;
    }

    try {
      if (isEdit) {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/portfolio/${id}`, portfolioData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/portfolio`, portfolioData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/admin/portfolio');
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">{isEdit ? 'Edit Portfolio Item' : 'Create New Portfolio Item'}</h2>
      <form onSubmit={handleSubmit}>
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
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        {category !== 'skills' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
          </>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-yellow-500 px-4 py-2 rounded-md"
          >
            {isEdit ? 'Update Portfolio Item' : 'Create Portfolio Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
