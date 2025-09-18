import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token } = response.data;
            setToken(token);
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed! Please check your credentials.');
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    };
    
    // This effect can be used to validate the token with the backend if needed
    useEffect(() => {
        if (!token) {
           navigate('/login');
        }
    }, [token, navigate]);

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;