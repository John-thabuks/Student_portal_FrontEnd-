import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem('token') || '');
    const [role, setRole] = useState(sessionStorage.getItem('role') || ''); // New state for role
    const navigate = useNavigate();

    const login = (newToken, newRole) => { // Modified login function to accept role
        setToken(newToken);
        setRole(newRole);
        sessionStorage.setItem('token', newToken);
        sessionStorage.setItem('role', newRole); // Store role in session storage
    };

    const logout = () => {
        setToken('');
        setRole('');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role'); // Remove role from session storage
        navigate('/');  // Redirect to home page after logout
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}> {/* Expose role in context */}
            {children}
        </AuthContext.Provider>
    );
};

