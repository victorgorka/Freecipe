import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/user/me');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <h1>Welcome, {userData.name}</h1>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
