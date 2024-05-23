import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CourseDetails.css';

const CourseDetails = () => {
    const { token } = useAuth();
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`/student/course/${courseId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch course details');
                }

                const data = await response.json();
                setCourse(data);
            } catch (err) {
                setError('Failed to fetch course details');
            }
        };

        fetchCourseDetails();
    }, [token, courseId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="course-details-container">
            <h2 className="course-title">{course.title}</h2>
            <p className="admin-email">Admin Email: {course.admin_email}</p>
            <div className="description-thumbnail-container">
                <div className="description">
                    <p>{course.description}</p>
                    <div className="modules-section">
                        <h3>Modules</h3>
                        <ul>
                            {course.modules && course.modules.length > 0 ? (
                                course.modules.map(module => (
                                    <li key={module.id}>
                                        <h4>{module.title}</h4>
                                        <p>{module.description}</p>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <button className="view-modules-button">
                                        <Link to={`/module-course/${courseId}`} className="view-modules-link">View Modules</Link>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="thumbnail">
                    <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
