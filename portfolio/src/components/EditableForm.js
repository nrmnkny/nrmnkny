import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditableForm = () => {
    const { category, id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/${category}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setItem(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchItem();
    }, [category, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/${category}/${id}`, item, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            alert(`${category} updated successfully`);
            navigate(`/${category}`);
        } catch (err) {
            setError(err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const renderFields = () => {
        switch (category) {
            case 'education':
            case 'workexperience':
            case 'projects':
            case 'researchinterests':
                return (
                    <>
                        <div>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={item.title || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={item.description || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Start Date:</label>
                            <input
                                type="date"
                                name="start_date"
                                value={item.start_date || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <input
                                type="date"
                                name="end_date"
                                value={item.end_date || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                );
            case 'skills':
                return (
                    <>
                        <div>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={item.title || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={item.description || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h1>Edit {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <form onSubmit={handleSubmit}>
                {renderFields()}
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditableForm;
