import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const { token } = useAuth();
    const [profile, setProfile] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                if (decodedToken.user_type !== 'student') {
                    navigate('/login');
                    return;
                }

                const response = await fetch(`/profile/student`, {
                    method: 'GET',
                    headers: {
                        'jwttoken': token
                    }
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Failed to fetch profile');
                }

                const data = await response.json();
                setProfile(data);
                setEmail(data.email);
                setUsername(data.username || '');
                setUserType(decodedToken.user_type);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfile();
    }, [token, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/profile/student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update profile');
            }

            setSuccess('Profile updated successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <form onSubmit={handleUpdate}>
                {userType === 'student' && (
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;
