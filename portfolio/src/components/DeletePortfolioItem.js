import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const DeletePortfolioItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteItem = async () => {
      try {
        await api.delete(`${process.env.REACT_APP_API_BASE_URL}/api/portfolio/item/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        navigate('/admin/portfolio');
      } catch (error) {
        console.error('Error deleting portfolio item:', error);
      }
    };

    deleteItem();
  }, [id, navigate]);

  return (
    <div>
      <p>Deleting portfolio item...</p>
    </div>
  );
};

export default DeletePortfolioItem;
