import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MyCourses.css';

const MyCourses = () => {
    const { token } = useAuth();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const [isStudent, setIsStudent] = useState(false);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await fetch('/courses/student', {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }

                const data = await response.json();
                setCourses(data.courses);
            } catch (err) {
                setError('Failed to fetch courses');
            }
        };

        const checkUserType = async () => {
            try {
                const response = await fetch('/profile/student', {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                setIsStudent(true);
            } catch (err) {
                setIsStudent(false);
            }
        };

        if (token) {
            checkUserType();
            fetchMyCourses();
        }

    }, [token]);

    if (!isStudent) {
        return null; // Do not render the component if the user is not a student
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="my-courses-container">
            <h2>My Courses</h2>
            {courses.length === 0 ? (
                <p>Buy any course of your choice to start your skill up career</p>
            ) : (
                <div className="courses-list">
                    {courses.map(course => (
                        <div key={course.id} className="course-item">
                            <img src={course.thumbnail} alt={course.title} />
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <Link to={`/course/${course.id}`} className="view-button">Study</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCourses;
