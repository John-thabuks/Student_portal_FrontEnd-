// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import './Messages.css';

// const AdminMessages = () => {
//     const { token } = useAuth();
//     const [messages, setMessages] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [selectedStudent, setSelectedStudent] = useState(null);
//     const [email, setEmail] = useState('');
//     const [messageContent, setMessageContent] = useState('');
//     const [title, setTitle] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [view, setView] = useState('inbox');

//     const fetchMessages = async () => {
//         try {
//             const response = await fetch('/messages/admin', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwttoken': `${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch messages');
//             }

//             const data = await response.json();
//             setMessages(data.messages);
//         } catch (err) {
//             setError('Failed to fetch messages');
//         }
//     };

//     useEffect(() => {
//         if (view === 'inbox') {
//             fetchMessages();
//         }
//     }, [token, view]);

//     const handleSend = async () => {
//         try {
//             const response = await fetch('/messages/admin', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwttoken': `${token}`,
//                 },
//                 body: JSON.stringify({
//                     title: title,
//                     content: messageContent,
//                     student_id: selectedStudent.id,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to send message');
//             }

//             setTitle('');
//             setMessageContent('');
//             setSelectedStudent(null);
//             setEmail('');
//             setSuccess('Message sent successfully');
//             setError('');

//             setTimeout(() => setSuccess(''), 5000);

//             fetchMessages();
//         } catch (err) {
//             setError('Failed to send message');
//         }
//     };

//     const handleEmailInputChange = async (e) => {
//         const inputEmail = e.target.value;
//         setEmail(inputEmail);
//         if (inputEmail.trim() === '') {
//             setStudents([]);
//             setSelectedStudent(null);
//             return;
//         }

//         try {
//             const response = await fetch(`/studentsmail?email=${inputEmail}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwttoken': `${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch students');
//             }

//             const data = await response.json();
//             setStudents(data.students);
//         } catch (err) {
//             console.error('Failed to fetch students', err);
//             setStudents([]);
//         }
//     };

//     const handleStudentSelection = (student) => {
//         setSelectedStudent(student);
//         setEmail(student.email);
//         setStudents([]);
//     };



//     return (
//         <div className="messages-container">
//             <div className="message-navigation">
//                 <button onClick={() => setView('inbox')}>Inbox</button>
//                 <button onClick={() => setView('send')}>Send</button>
//             </div>
//             {view === 'inbox' && (
//                 <div className="inbox">
//                     <h2>Inbox</h2>
//                     {messages.length > 0 ? (
//                         messages.map(message => (
//                             <div key={message.id} className="message-item">
//                                 <p>From: {message.sender_name}</p>
//                                 <p>Title: {message.title}</p>
//                                 <p>{message.content}</p>

//                             </div>
//                         ))
//                     ) : (
//                         <p className="empty-message">No messages</p>
//                     )}
//                     {error && <div className="error">{error}</div>}
//                 </div>
//             )}
//             {view === 'send' && (
//                 <div className="send">
//                     <h2>Send a Message</h2>
//                     <input type="email" placeholder="Email" value={email} onChange={handleEmailInputChange} />
//                     {students.length > 0 && (
//                         <div className="student-dropdown">
//                             <p>Select Student:</p>
//                             <ul>
//                                 {students.map(student => (
//                                     <li key={student.id} onClick={() => handleStudentSelection(student)}>
//                                         {student.email}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                     <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
//                     <textarea placeholder="Message" value={messageContent} onChange={e => setMessageContent(e.target.value)} />
//                     <button onClick={handleSend}>Send</button>
//                     {error && <div className="error">{error}</div>}
//                     {success && <div className="success">{success}</div>}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminMessages;



import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Messages.css';

const AdminMessages = () => {
    const { token } = useAuth();
    const [messages, setMessages] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [email, setEmail] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [view, setView] = useState('inbox');

    const fetchMessages = async () => {
        try {
            const response = await fetch('/messages/admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const data = await response.json();
            setMessages(data.messages);
        } catch (err) {
            setError('Failed to fetch messages');
        }
    };

    useEffect(() => {
        if (view === 'inbox') {
            fetchMessages();
        }
    }, [token, view]);

    const handleSend = async () => {
        try {
            const response = await fetch('/messages/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': `${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    content: messageContent,
                    email: email,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setTitle('');
            setMessageContent('');
            setSelectedStudent(null);
            setEmail('');
            setSuccess('Message sent successfully');
            setError('');

            setTimeout(() => setSuccess(''), 5000);

            fetchMessages();
        } catch (err) {
            setError('Failed to send message');
        }
    };

    const handleEmailInputChange = async (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        if (inputEmail.trim() === '') {
            setStudents([]);
            setSelectedStudent(null);
            return;
        }

        try {
            const response = await fetch(`/studentsmail?email=${inputEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }

            const data = await response.json();
            setStudents(data.students);
        } catch (err) {
            console.error('Failed to fetch students', err);
            setStudents([]);
        }
    };

    const handleStudentSelection = (student) => {
        setSelectedStudent(student);
        setEmail(student.email);
        setStudents([]);
    };



    return (
        <div className="messages-container">
            <div className="message-navigation">
                <button onClick={() => setView('inbox')}>Inbox</button>
                <button onClick={() => setView('send')}>Send</button>
            </div>
            {view === 'inbox' && (
                <div className="inbox">
                    <h2>Inbox</h2>
                    {messages.length > 0 ? (
                        messages.map(message => (
                            <div key={message.id} className="message-item">
                                <p>From: {message.sender_name}</p>
                                <p>Title: {message.title}</p>
                                <p>{message.content}</p>

                            </div>
                        ))
                    ) : (
                        <p className="empty-message">No messages</p>
                    )}
                    {error && <div className="error">{error}</div>}
                </div>
            )}
            {view === 'send' && (
                <div className="send">
                    <h2>Send a Message</h2>
                    <input type="email" placeholder="Email" value={email} onChange={handleEmailInputChange} />
                    {students.length > 0 && (
                        <div className="student-dropdown">
                            <p>Select Student:</p>
                            <ul>
                                {students.map(student => (
                                    <li key={student.id} onClick={() => handleStudentSelection(student)}>
                                        {student.email}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Message" value={messageContent} onChange={e => setMessageContent(e.target.value)} />
                    <button onClick={handleSend}>Send</button>
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
