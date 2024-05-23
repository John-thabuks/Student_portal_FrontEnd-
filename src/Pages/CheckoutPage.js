import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const { courseId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const initiateCheckout = async () => {
            try {
                const response = await fetch(`/checkout/${courseId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwttoken': ` ${token}`,
                    },

                });
                const data = await response.json();
                if (response.ok) {
                    // Redirect to Stripe Checkout
                    window.location.href = data.checkout_url;
                } else {
                    setError(data.message || 'Failed to initiate checkout');
                }
            } catch (err) {
                setError('Failed to initiate checkout');
            }
        };

        initiateCheckout();
    }, [courseId, token]);

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {error && <div className="error">{error}</div>}
            <p>Redirecting to payment...</p>
        </div>
    );
};

export default CheckoutPage;
