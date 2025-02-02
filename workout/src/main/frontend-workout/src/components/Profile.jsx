import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Profile.css'; // Import the CSS file for styling
import { useState } from 'react';
import frame1 from './/cat.gif';
import backgroundImage from ".//confetti.gif";
import { Link } from "react-router-dom"; // Import Link for navigation


function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const workoutData = location.state?.workoutData || "No data received";
    const [count, setCount] = useState(1);
    

    // Function to handle logout
    const handleLogout = () => {
        navigate('/login');
    };


    const increaseStreak = () => {
        setCount((prev) => (prev === 4 ? 1 : prev + 1)); // Reset after 4
    };

    const resetStreak = () => {
        setCount(1); // Reset to first frame
    };

    const streakImages = Array.from({ length: count }, (_, index) => (
        <img
            key={index}
            src={frame1}
            alt="Workout Progress"
            style={{ width: "100px", height: "auto", marginRight: "10px" }}
        />
    ));

    // Function to parse workout data correctly by splitting based on known day names
    const parseWorkoutData = (data) => {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const days = {};
        let currentDay = "";

        // Split data into lines and correctly group workouts under the right day
        data.split("\n").forEach(line => {
            const trimmedLine = line.trim();
            if (daysOfWeek.includes(trimmedLine.replace(":", ""))) {
                currentDay = trimmedLine.replace(":", ""); // Remove ":" from day names
                days[currentDay] = [];
            } else if (currentDay && trimmedLine) {
                days[currentDay].push(trimmedLine);
            }
        });

        return days;
    };

    // Convert workout data into structured format
    const structuredWorkoutData = parseWorkoutData(workoutData);
    //const gifFrames = [frame1, frame2, frame3, frame4]; // Array of GIF frames

    return (
        <div className="profile-container">
            {/* GIF Frame Display */}
            {count === 4 && (
                    
                    <>
                        <h1>You Have Reached Your Streak! Great Job!</h1>
                    </>
                    
            )}
            <h1>Compete With Friends! Take a Look at <Link to="/Leaderboard"> How Everyone's Doing!</Link></h1>
            <div className={`gif-container ${count === 4 ? "with-background" : ""}`}>
                {count === 4 && (
                    
                    <>
                        <img
                        src={backgroundImage}
                        alt="Background Effect"
                        className="background-image"
                        />
                        
                    </>
                    
                )}
                {streakImages}
            </div>

            {/* Streak Counter */}
            <h3 className="streak-text">Streak: {count}</h3>

            {/* Streak Buttons */}
            <div className="button-container">
                <button onClick={increaseStreak} className="streak-button">Increase Streak</button>
                <button onClick={resetStreak} className="reset-button">Reset Streak</button>
            </div>

            <h1 className="title">Here's Your Workout Plan for the Week!</h1>

            {/* Scrollable workout container */}
            <div className="workout-scroll-container">
                <div className="workout-blocks">
                    {Object.entries(structuredWorkoutData).map(([day, workouts]) => (
                        <div key={day} className="workout-block">
                            <h3 className="workout-day">{day}</h3>
                            <ul className="workout-list">
                                {workouts.length > 0 ? (
                                    workouts.map((workout, index) => (
                                        <li key={index}>{workout}</li>
                                    ))
                                ) : (
                                    <li>Rest day</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <h2>We are always looking for feedback! Enter your suggestions to improve RUWorkingOut! <Link to="https://docs.google.com/forms/d/e/1FAIpQLSd2rHIKePZNv_11Yp594ctqtLfnuRb_lCUNqoWpedZ5GIm9og/viewform" target="_blank"> Link to Feedback</Link></h2>

            {/* Logout Button */}
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
}

export default Profile;



