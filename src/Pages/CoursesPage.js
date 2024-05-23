// // src/Pages/CoursesPage.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './CoursesPage.css';

// const CoursesPage = () => {
//     const { token } = useAuth();
//     const [courses, setCourses] = useState([]);
//     const [purchasedCourses, setPurchasedCourses] = useState([]);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await fetch('/course', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'jwttoken': token,
//                     },
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setCourses(data.courses);
//                 } else {
//                     setError(data.message || 'Failed to fetch courses');
//                 }
//             } catch (err) {
//                 setError('Failed to fetch courses');
//             }
//         };

//         const fetchPurchasedCourses = async () => {
//             try {
//                 const response = await fetch('/courses/student', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'jwttoken': token,
//                     },
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setPurchasedCourses(data.courses);
//                 } else {
//                     // If there are no purchased courses, set purchased courses to an empty array
//                     setPurchasedCourses([]);
//                 }
//             } catch (err) {
//                 setError('Failed to fetch purchased courses');
//             }
//         };

//         fetchCourses();
//         fetchPurchasedCourses();
//     }, [token]);

//     const handleCourseAction = (courseId, isPurchased) => {
//         if (isPurchased) {
//             navigate(`/course/${courseId}`);
//         } else {
//             purchaseCourse(courseId);
//         }
//     };

//     const purchaseCourse = (courseId) => {
//         navigate(`/checkout/${courseId}`);
//     };

//     return (
//         <div className="courses-container">
//             <h2>All Courses</h2>
//             {error && <div className="error">{error}</div>}
//             <div className="courses-list">
//                 {courses.map(course => {
//                     const isPurchased = purchasedCourses.some(pc => pc.id === course.id);
//                     return (
//                         <div key={course.id} className="course-item">
//                             <img src={course.thumbnail} alt={course.title} />
//                             <h3>{course.title}</h3>
//                             <p>{course.description}</p>
//                             <button onClick={() => handleCourseAction(course.id, isPurchased)}>
//                                 {isPurchased ? 'Proceed' : `Buy (${course.price})`}
//                             </button>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default CoursesPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CoursesPage.css';

const CoursesPage = () => {
    const { token } = useAuth();
    const [courses, setCourses] = useState([]);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [error, setError] = useState('');
    const [hasPurchasedCourses, setHasPurchasedCourses] = useState(false);
    const [loadingPurchasedCourses, setLoadingPurchasedCourses] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/course', {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': token,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setCourses(data.courses);
                } else {
                    setError(data.message || 'Failed to fetch courses');
                }
            } catch (err) {
                setError('Failed to fetch courses');
            }
        };

        const fetchPurchasedCourses = async () => {
            try {
                const response = await fetch('/courses/student', {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': token,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setPurchasedCourses(data.courses);
                    setHasPurchasedCourses(true);
                } else {
                    setHasPurchasedCourses(false);
                }
            } catch (err) {
                setHasPurchasedCourses(false);
            } finally {
                setLoadingPurchasedCourses(false);
            }
        };

        fetchCourses();
        fetchPurchasedCourses();
    }, [token]);

    const handleCourseAction = (courseId, isPurchased) => {
        if (isPurchased) {
            navigate(`/course/${courseId}`);
        } else {
            purchaseCourse(courseId);
        }
    };

    const purchaseCourse = (courseId) => {
        navigate(`/checkout/${courseId}`);
    };

    return (
        <div className="courses-container">
            <h2>All Courses</h2>
            {error && <div className="error">{error}</div>}
            <div className="courses-list">
                {courses.map(course => {
                    const isPurchased = purchasedCourses.some(pc => pc.id === course.id);
                    return (
                        <div key={course.id} className="course-item">
                            <img src={course.thumbnail} alt={course.title} />
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <button onClick={() => handleCourseAction(course.id, isPurchased)}>
                                {isPurchased ? 'Proceed' : `Buy (${course.price})`}
                            </button>
                        </div>
                    );
                })}
            </div>
            {loadingPurchasedCourses ? (
                <p>Loading purchased courses...</p>
            ) : (
                !hasPurchasedCourses && <p>No purchased courses found.</p>
            )}
        </div>
    );
};

export default CoursesPage;
