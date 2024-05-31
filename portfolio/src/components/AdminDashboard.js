import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/blog" className="block bg-white p-6 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold">Manage Blog Posts</h3>
        </Link>
        <Link to="/admin/portfolio" className="block bg-white p-6 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold">Manage Portfolio Data</h3>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
