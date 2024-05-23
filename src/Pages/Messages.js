import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Messages.css';

const Messages = () => {
    const { token } = useAuth();
    const [messages, setMessages] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [email, setEmail] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [view, setView] = useState('inbox');


    const fetchMessages = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000//messages/from-admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': ` ${token}`,
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
            const response = await fetch('http://127.0.0.1:5000/messages/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': ` ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    content: messageContent,
                    admin_id: selectedAdmin.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setTitle('');
            setMessageContent('');
            setSelectedAdmin(null);
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
            setAdmins([]);
            setSelectedAdmin(null);
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/admins?email=${inputEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': ` ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch admins');
            }

            const data = await response.json();
            setAdmins(data.admins);
        } catch (err) {
            console.error('Failed to fetch admins', err);
            setAdmins([]);
        }
    };

    const handleAdminSelection = (admin) => {
        setSelectedAdmin(admin);
        setEmail(admin.email);
        setAdmins([]);
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
                        messages && messages.map(message => (
                            <div key={message.id} className="message-item">
                                <p>From: {message.sender_email}</p>
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
                    {admins.length > 0 && (
                        <div className="admin-dropdown">
                            <p>Select Admin:</p>
                            <ul>
                                {admins.map(admin => (
                                    <li key={admin.id} onClick={() => handleAdminSelection(admin)}>
                                        {admin.email}
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

export default Messages;



// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import './Messages.css';

// const Messages = () => {
//     const { token } = useAuth();
//     const [messages, setMessages] = useState([]);
//     const [admins, setAdmins] = useState([]);
//     const [selectedAdmin, setSelectedAdmin] = useState(null);
//     const [email, setEmail] = useState('');
//     const [messageContent, setMessageContent] = useState('');
//     const [title, setTitle] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [view, setView] = useState('inbox');

//     const fetchMessages = async () => {
//         try {
//             const response = await fetch('http://127.0.0.1:5000/messages/from-admin', {
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
//             const response = await fetch('http://127.0.0.1:5000/messages/student', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwttoken': `${token}`,
//                 },
//                 body: JSON.stringify({
//                     title: title,
//                     content: messageContent,
//                     admin_id: selectedAdmin.id,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to send message');
//             }

//             setTitle('');
//             setMessageContent('');
//             setSelectedAdmin(null);
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
//             setAdmins([]);
//             setSelectedAdmin(null);
//             return;
//         }

//         try {
//             const response = await fetch(`http://127.0.0.1:5000/admins?email=${inputEmail}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwttoken': `${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch admins');
//             }

//             const data = await response.json();
//             setAdmins(data.admins);
//         } catch (err) {
//             console.error('Failed to fetch admins', err);
//             setAdmins([]);
//         }
//     };

//     const handleAdminSelection = (admin) => {
//         setSelectedAdmin(admin);
//         setEmail(admin.email);
//         setAdmins([]);
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
//                         messages && messages.map(message => (
//                             <div key={message.id} className="message-item">
//                                 <p>From: {message.sender_email}</p>
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
//                     {admins.length > 0 && (
//                         <div className="admin-dropdown">
//                             <p>Select Admin:</p>
//                             <ul>
//                                 {admins.map(admin => (
//                                     <li key={admin.id} onClick={() => handleAdminSelection(admin)}>
//                                         {admin.email}
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

// export default Messages;
