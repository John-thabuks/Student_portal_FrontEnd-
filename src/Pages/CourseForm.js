import React, { useState } from 'react';

const CourseForm = ({ onSuccess, onError }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/courses/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': 'YOUR_AUTH_TOKEN_HERE',
                },
                body: JSON.stringify({
                    title,
                    description,
                    thumbnail,
                    price,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add course');
            }

            onSuccess('Course added successfully!');
            setTitle('');
            setDescription('');
            setThumbnail('');
            setPrice('');
        } catch (error) {
            onError('Failed to add course');
        }
    };

    return (
        <div className="course-form-container">
            <h2>Add Course</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label htmlFor="description">Description:</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <label htmlFor="thumbnail">Thumbnail URL:</label>
                <input type="text" id="thumbnail" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} required />
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default CourseForm;
