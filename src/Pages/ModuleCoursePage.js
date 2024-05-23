
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './ModuleCoursePage.css'

// const ModuleCoursePage = () => {
//     const { token } = useAuth();
//     const { courseId } = useParams();
//     const [modules, setModules] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchModules = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:5000/student/course/${courseId}/module`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'jwttoken': token,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch modules');
//                 }

//                 const data = await response.json();
//                 setModules(data);
//             } catch (err) {
//                 setError('Failed to fetch modules');
//             }
//         };

//         fetchModules();
//     }, [token, courseId]);

//     if (error) {
//         return <div className="error">{error}</div>;
//     }

//     return (
//         <div className="ModuleCoursePage">
//             <h2>Modules for Course {courseId}</h2>
//             <ul>
//                 {modules && modules && modules.map(module => (
//                     <li key={module.id}>
//                         <h4>{module.title}</h4>
//                         <p>{module.notes}</p>
//                     </li>
//                 ))}
//             </ul>
//             <Link to="/my-courses" className="back-button">Back to My Courses</Link>
//         </div>
//     );
// };

// export default ModuleCoursePage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ModuleCoursePage.css'

const ModuleCoursePage = () => {
    const { token } = useAuth();
    const { courseId } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const [modules, setModules] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/student/course/${courseId}/module`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch modules');
                }

                const data = await response.json();
                setModules(data);
            } catch (err) {
                setError('Failed to fetch modules');
            }
        };

        fetchModules();
    }, [token, courseId]);

    const handleNavigateBack = () => {
        navigate('/my-courses');
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="ModuleCoursePage">
            <h2>Modules for Course {courseId}</h2>
            <ul>
                {modules && modules.map(module => (
                    <li key={module.id}>
                        <h4>{module.title}</h4>
                        <p>{module.notes}</p>
                    </li>
                ))}
            </ul>
            <button className="back-button" onClick={handleNavigateBack}>Back to My Courses</button>
        </div>
    );
};

export default ModuleCoursePage;
