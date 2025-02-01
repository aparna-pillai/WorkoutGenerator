import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div>
            {/* Logout Button */}
            <button onClick={handleLogout}>
                    Logout
            </button>
        </div>
    );
    
}

export default Profile;

