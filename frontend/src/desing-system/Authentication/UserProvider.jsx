import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const displayUserInfo = () => {
        const accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";

        if (accessToken) {
            try {
                const user = jwtDecode(accessToken);
                setUserData(user);
            } catch (error) {
                console.error('Token decoding failed:', error);
            }
        } else {
            console.log('No access token found.');
        }
    };

    useEffect(() => {
        displayUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    );
};