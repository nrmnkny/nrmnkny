import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ItemList = () => {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/${category}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setItems(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchItems();
    }, [category]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log("Items: ", items); // Add this line to check if items are being fetched

    return (
        <div>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <ul>
                {items.length > 0 ? (
                    items.map((item) => (
                        <li key={item.id}>
                            {item.title}
                            <Link to={`/edit/${category}/${item.id}`}>Edit</Link>
                        </li>
                    ))
                ) : (
                    <p>No items found</p>
                )}
            </ul>
        </div>
    );
};

export default ItemList;
