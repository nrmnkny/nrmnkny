import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPortfolioList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://nrmnkny-74d777c56ce9.herokuapp.com/api/portfolio');
        setItems(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <div>Error fetching portfolio data: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Manage Portfolio Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <div className="flex justify-between mt-4">
              <Link to={`/admin/portfolio/edit/${item.id}`} className="text-blue-500 hover:underline">Edit</Link>
              <Link to={`/admin/portfolio/delete/${item.id}`} className="text-red-500 hover:underline">Delete</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/admin/portfolio/new" className="text-white bg-yellow-500 px-4 py-2 rounded-md">Create New Item</Link>
      </div>
    </div>
  );
};

export default AdminPortfolioList;
