import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminProfilePage.css';

const AdminProfilePage = () => {
    const { token } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/profile/admin', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch admin profile');
                }

                const data = await response.json();
                setEmail(data.email);
            } catch (err) {
                setErrorMessage('Failed to fetch admin profile');
            }
        };

        fetchProfile();
    }, [token]);

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch('/profile/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token,
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setSuccessMessage('Profile updated successfully!');
            setErrorMessage('');
        } catch (err) {
            setErrorMessage('Failed to update profile');
            setSuccessMessage('');
        }
    };

    return (
        <div className="admin-profile-container">
            <h2>Admin Profile</h2>
            <div className="profile-details">
                <p><strong>Email:</strong> {email}</p>
            </div>
            <div className="profile-update">
                <h3>Update Password</h3>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleUpdateProfile}>Update Password</button>
                {successMessage && <p className="success">{successMessage}</p>}
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default AdminProfilePage;
