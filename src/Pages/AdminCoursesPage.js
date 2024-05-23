

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './AdminCoursesPage.css';

// const AdminCoursesPage = () => {
//     const { token } = useAuth();
//     const navigate = useNavigate();
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [showEditPopup, setShowEditPopup] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch('/courses/admin', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'jwttoken': token,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch courses');
//                 }

//                 const data = await response.json();
//                 setCourses(data.courses);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCourses();
//     }, [token]);

//     const handleEditCourse = (course) => {
//         setSelectedCourse(course);
//         setShowEditPopup(true);
//     };

//     const handleUpdateCourse = async () => {
//         try {
//             const response = await fetch('/courses/admin', {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwttoken': token,
//                 },
//                 body: JSON.stringify({
//                     course_id: selectedCourse.id,
//                     title: selectedCourse.title,
//                     description: selectedCourse.description,
//                     thumbnail: selectedCourse.thumbnail,
//                     price: selectedCourse.price,
//                     modules: selectedCourse.modules
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update course');
//             }

//             setShowEditPopup(false);
//             setSelectedCourse(null);
//             setError('');
//             const updatedCourses = courses.map((course) =>
//                 course.id === selectedCourse.id ? selectedCourse : course
//             );
//             setCourses(updatedCourses);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleDeleteCourse = async (courseId) => {
//         try {
//             const response = await fetch(`/courses/admin/${courseId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwttoken': token,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete course');
//             }

//             setCourses(courses.filter(course => course.id !== courseId));
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setSelectedCourse({ ...selectedCourse, [name]: name === 'price' ? parseFloat(value) : value });
//     };

//     const handleModuleChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedModules = [...selectedCourse.modules];
//         updatedModules[index][name] = value;
//         setSelectedCourse({ ...selectedCourse, modules: updatedModules });
//     };

//     return (
//         <div className="admin-courses-container">
//             <div className="header">
//                 <h2>Admin Courses</h2>
//                 <button onClick={() => navigate('/admin-create-course')}>Add Course</button>
//             </div>
//             {error && <p className="error">{error}</p>}
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <div className="courses-list">
//                     {courses.length > 0 ? (
//                         courses.map((course) => (
//                             <div key={course.id} className="course-item">
//                                 <img src={course.thumbnail} alt={course.title} />
//                                 <h3>{course.title}</h3>
//                                 <p>{course.description}</p>
//                                 <button onClick={() => handleEditCourse(course)}>Edit Course</button>
//                                 <button onClick={() => handleDeleteCourse(course.id)}>Delete Course</button>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No courses available.</p>
//                     )}
//                 </div>
//             )}

//             {showEditPopup && selectedCourse && (
//                 <div className="edit-popup">
//                     <h3>Edit Course</h3>
//                     <label>Title:</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={selectedCourse.title}
//                         onChange={handleInputChange}
//                     />
//                     <label>Description:</label>
//                     <textarea
//                         name="description"
//                         value={selectedCourse.description}
//                         onChange={handleInputChange}
//                     />
//                     <label>Thumbnail URL:</label>
//                     <input
//                         type="text"
//                         name="thumbnail"
//                         value={selectedCourse.thumbnail}
//                         onChange={handleInputChange}
//                     />
//                     <label>Price:</label>
//                     <input
//                         type="number"
//                         name="price"
//                         value={selectedCourse.price}
//                         onChange={handleInputChange}
//                     />
//                     {selectedCourse.modules.map((module, index) => (
//                         <div key={module.id} className="module-edit">
//                             <h4>Module {index + 1}</h4>
//                             <label>Title:</label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={module.title}
//                                 onChange={(e) => handleModuleChange(index, e)}
//                             />
//                             <label>Media:</label>
//                             <input
//                                 type="text"
//                                 name="media"
//                                 value={module.media}
//                                 onChange={(e) => handleModuleChange(index, e)}
//                             />
//                             <label>Notes:</label>
//                             <textarea
//                                 name="notes"
//                                 value={module.notes}
//                                 onChange={(e) => handleModuleChange(index, e)}
//                             />
//                         </div>
//                     ))}
//                     <button onClick={handleUpdateCourse}>Update Course</button>
//                     <button onClick={() => setShowEditPopup(false)}>Cancel</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminCoursesPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminCoursesPage.css';

const AdminCoursesPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await fetch('/courses/admin', {
                    method: 'GET',
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
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [token]);

    const handleEditCourse = (course) => {
        setSelectedCourse(course);
        setShowEditPopup(true);
    };

    const handleUpdateCourse = async () => {
        try {
            const response = await fetch('/courses/admin', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token,
                },
                body: JSON.stringify({
                    course_id: selectedCourse.id,
                    title: selectedCourse.title,
                    description: selectedCourse.description,
                    thumbnail: selectedCourse.thumbnail,
                    price: selectedCourse.price,
                    modules: selectedCourse.modules
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update course');
            }

            setShowEditPopup(false);
            setSelectedCourse(null);
            setError('');
            const updatedCourses = courses.map((course) =>
                course.id === selectedCourse.id ? selectedCourse : course
            );
            setCourses(updatedCourses);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await fetch(`/courses/admin/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete course');
            }

            setCourses(courses.filter(course => course.id !== courseId));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedCourse({ ...selectedCourse, [name]: name === 'price' ? parseFloat(value) : value });
    };

    const handleModuleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedModules = [...selectedCourse.modules];
        updatedModules[index][name] = value;
        setSelectedCourse({ ...selectedCourse, modules: updatedModules });
    };

    return (
        <div className="admin-courses-container">
            <div className="header">
                <h2>Admin Courses</h2>
                <button onClick={() => navigate('/admin-create-course')}>Add Course</button>
            </div>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="courses-list">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course.id} className="course-item">
                                <img src={course.thumbnail} alt={course.title} />
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <div className="buttons">
                                    <button onClick={() => handleEditCourse(course)}>Edit Course</button>
                                    <button onClick={() => handleDeleteCourse(course.id)}>Delete Course</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No courses available.</p>
                    )}
                </div>
            )}

            {showEditPopup && selectedCourse && (
                <div className="edit-popup">
                    <div className="edit-popup-content">
                        <h3>Edit Course</h3>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={selectedCourse.title}
                            onChange={handleInputChange}
                        />
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={selectedCourse.description}
                            onChange={handleInputChange}
                        />
                        <label>Thumbnail URL:</label>
                        <input
                            type="text"
                            name="thumbnail"
                            value={selectedCourse.thumbnail}
                            onChange={handleInputChange}
                        />
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={selectedCourse.price}
                            onChange={handleInputChange}
                        />
                        {selectedCourse.modules.map((module, index) => (
                            <div key={module.id} className="module-edit">
                                <h4>Module {index + 1}</h4>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={module.title}
                                    onChange={(e) => handleModuleChange(index, e)}
                                />
                                <label>Media:</label>
                                <input
                                    type="text"
                                    name="media"
                                    value={module.media}
                                    onChange={(e) => handleModuleChange(index, e)}
                                />
                                <label>Notes:</label>
                                <textarea
                                    name="notes"
                                    value={module.notes}
                                    onChange={(e) => handleModuleChange(index, e)}
                                />
                            </div>
                        ))}
                        <div className="popup-buttons">
                            <button onClick={handleUpdateCourse}>Update Course</button>
                            <button onClick={() => setShowEditPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCoursesPage;
