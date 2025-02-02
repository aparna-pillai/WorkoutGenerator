import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './Leaderboard.css';
import image1 from './/man-working-out.png'; // Replace with actual image path
import image2 from './/man-working-out.png'; // Replace with actual image path
import image3 from './/man-working-out.png'; // Replace with actual image path
import image4 from './/man-working-out.png'; // Replace with actual image path


function Leaderboard(){
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
    };

    const users = [
        { name: "Alice", streak: 15 },
        { name: "Bob", streak: 12 },
        { name: "Charlie", streak: 10 },
        { name: "David", streak: 8 },
        { name: "Emma", streak: 6 },
    ];


    return (
        <div className="leaderboard-wrapper">
            <img src={image1} alt="Decoration Left" className="background-image image1" />
            <img src={image2} alt="Decoration Right" className="background-image image2" />
            <img src={image3} alt="Decoration Left" className="background-image image3" />
            <img src={image4} alt="Decoration Right" className="background-image image4" />
            <h1 style={{ fontSize: '2em' }}>Be First On the LeaderBoard To Win Some Prizes!</h1>
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">🏆 Streak Leaderboard 🏆</h2>
            <div className="leaderboard">
                {users.map((user, index) => (
                    <div key={index} className="leaderboard-row">
                        <span className="user-name">{user.name}</span>
                        <span className="streak">{user.streak}🔥</span>
                    </div>
                ))}
            </div>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
        </div>
        
    );
        
}
export default Leaderboard;