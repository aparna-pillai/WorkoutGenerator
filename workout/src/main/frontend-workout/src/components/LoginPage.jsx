// Import React and necessary hooks
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file
import image from './/Dumbell.png';

function LoginPage() {
    // State variables for username, password, and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const container = document.querySelector(".dumbbell-container");

        for (let i = 0; i < 10; i++) { // Increase number for more dumbbells
            let img = document.createElement("img");
            img.src = image;
            img.className = "dumbbell";
            img.style.left = `${Math.random() * 90}%`; // Random horizontal position
            img.style.width = `${Math.random() * 60 + 100}px`; // Random size between 40px - 100px
            img.style.animationDuration = `${Math.random() * 20 + 8}s`; // Random speed (3s - 7s)
            container.appendChild(img);

            // Remove dumbbell after animation completes
            img.addEventListener("animationend", () => {
                img.remove();
            });
        }
    }, []);

    // Initialize useNavigate hook for navigation
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation (replace with real authentication logic)
        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('⚠️ Username and password cannot be empty.');
            return;
        }

        // Navigate to the main page after successful login
        navigate('/main');
    };

    return (
        <div className="login-container">
            <div className="dumbbell-container"></div>

            <div className="login-form">
                <h1>RU Working Out? 💪</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
