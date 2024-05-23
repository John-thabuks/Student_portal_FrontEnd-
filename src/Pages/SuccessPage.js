
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './SuccessPage.css';

// const SuccessPage = () => {
//     const { token } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [pdfUrl, setPdfUrl] = useState('');

//     const queryParams = new URLSearchParams(location.search);
//     const courseTitle = queryParams.get('course_title');
//     const coursePrice = queryParams.get('course_price');

//     useEffect(() => {
//         const fetchReceipt = async () => {
//             try {
//                 const response = await fetch(`/success?course_title=${encodeURIComponent(courseTitle)}&course_price=${encodeURIComponent(coursePrice)}`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'jwttoken': token,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch receipt');
//                 }

//                 const blob = await response.blob();
//                 const url = URL.createObjectURL(blob);
//                 setPdfUrl(url);

//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch receipt');
//                 setLoading(false);
//             }
//         };

//         fetchReceipt();
//     }, [token, courseTitle, coursePrice]);

//     const handleGoToCourse = () => {
//         // Navigate to the course page, you may need to adjust the URL
//         navigate(`/course/${courseTitle}`);

//     };

//     return (
//         <div className="success-container">
//             <h2>Purchase Successful!</h2>
//             {loading ? (
//                 <p>Loading receipt...</p>
//             ) : error ? (
//                 <div className="error">{error}</div>
//             ) : (
//                 <div>
//                     <p>Thank you for your purchase.</p>
//                     <a href={pdfUrl} download="course_receipt.pdf">Download Receipt</a>
//                 </div>
//             )}
//             <button onClick={handleGoToCourse} className="go-to-course-button">
//                 Go to Course
//             </button>
//         </div>
//     );
// };

// export default SuccessPage;


import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SuccessPage.css';

const SuccessPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [pdfUrl, setPdfUrl] = useState('');

    const queryParams = new URLSearchParams(location.search);
    const courseTitle = queryParams.get('course_title');
    const coursePrice = queryParams.get('course_price');
    const courseId = queryParams.get('course_id');  // Assuming course_id is passed in query params

    useEffect(() => {
        const fetchReceipt = async () => {
            try {
                const response = await fetch(`/success?course_title=${encodeURIComponent(courseTitle)}&course_price=${encodeURIComponent(coursePrice)}&course_id=${encodeURIComponent(courseId)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch receipt');
                }

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch receipt');
                setLoading(false);
            }
        };

        fetchReceipt();
    }, [token, courseTitle, coursePrice, courseId]);

    const handleGoToCourse = () => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="success-container">
            <h2>Purchase Successful!</h2>
            {loading ? (
                <p>Loading receipt...</p>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div>
                    <p>Thank you for your purchase.</p>
                    <a href={pdfUrl} download="course_receipt.pdf">Download Receipt</a>
                </div>
            )}
            <button onClick={handleGoToCourse} className="go-to-course-button">
                Go to Course
            </button>
        </div>
    );
};

export default SuccessPage;


