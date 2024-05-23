import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOutlineMessage } from 'react-icons/ai';

function Header() {
    const { token, logout, role } = useAuth(); // Adjusted to use 'role' instead of 'isAdmin'

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">MORINGA</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {token ? (
                        <>
                            {role === 'admin' ? ( // Adjusted to check for 'admin' role
                                <>
                                    <li><Link to="/admin-profile">Admin Profile</Link></li>
                                    <li><Link to="/admin-courses">Admin Courses</Link></li>
                                    <li>
                                        <Link to="/admin-messages" className="message-icon">
                                            <AiOutlineMessage size={24} />
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/courses">Courses</Link></li>
                                    <li><Link to="/my-courses">My Courses</Link></li>
                                    <li>
                                        <Link to="/messages" className="message-icon">
                                            <AiOutlineMessage size={24} />
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                            <li><Link to="/Contact">ContactUs</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
