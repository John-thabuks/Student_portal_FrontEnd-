import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminCreateCoursePage.css';

const AdminCreateCoursePage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [price, setPrice] = useState('');
    const [modules, setModules] = useState([{ title: '', media: '', notes: '' }]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleModuleChange = (index, field, value) => {
        const newModules = [...modules];
        newModules[index][field] = value;
        setModules(newModules);
    };

    const handleAddModule = () => {
        setModules([...modules, { title: '', media: '', notes: '' }]);
    };

    const handleCreateCourse = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/courses/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token,
                },
                body: JSON.stringify({ title, description, thumbnail, price, modules }),
            });

            if (!response.ok) {
                throw new Error('Failed to create course');
            }

            setSuccessMessage('Course created successfully!');
            setErrorMessage('');
            navigate('/admin-courses');
        } catch (err) {
            setErrorMessage('Failed to create course');
            setSuccessMessage('');
        }
    };

    return (
        <div className="admin-create-course-container">
            <h2>Create New Course</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={(e) => { e.preventDefault(); handleCreateCourse(); }}>
                <div className="form-group">
                    <label htmlFor="title">Course Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail URL:</label>
                    <input
                        type="text"
                        id="thumbnail"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <h3>Modules</h3>
                {modules.map((module, index) => (
                    <div key={index} className="module-group">
                        <div className="form-group">
                            <label htmlFor={`module-title-${index}`}>Module Title:</label>
                            <input
                                type="text"
                                id={`module-title-${index}`}
                                value={module.title}
                                onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`module-media-${index}`}>Media URL:</label>
                            <input
                                type="text"
                                id={`module-media-${index}`}
                                value={module.media}
                                onChange={(e) => handleModuleChange(index, 'media', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`module-notes-${index}`}>Notes:</label>
                            <textarea
                                id={`module-notes-${index}`}
                                value={module.notes}
                                onChange={(e) => handleModuleChange(index, 'notes', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                <button type="button" className="add-module-button" onClick={handleAddModule}>Add Module</button>
                <button type="submit" className="create-course-button">Create Course</button>
            </form>
        </div>
    );
};

export default AdminCreateCoursePage;
