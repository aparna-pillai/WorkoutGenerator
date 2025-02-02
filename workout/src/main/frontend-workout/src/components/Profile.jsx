import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();

    const workoutData = location.state?.workoutData || "No data received";

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <h2>Generated Workout Data:</h2>
            <pre>{workoutData}</pre>
            {/* Logout Button */}
            <button onClick={handleLogout}>
                    Logout
            </button>
        </div>
    );
    
}

export default Profile;

