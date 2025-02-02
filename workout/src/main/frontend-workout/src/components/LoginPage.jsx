// Import React and necessary hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import the CSS file
import dumbbellImage from ".//Dumbell.png"; // Corrected import
import logo from ".//RUWorkingOut_processed.png"; // Corrected import

function LoginPage() {
    // State variables for username, password, and error message
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Effect to generate floating dumbbells
    useEffect(() => {
        const container = document.querySelector(".dumbbell-container");

        if (!container) return; // Ensure container exists

        // Clear previous dumbbells to prevent stacking
        container.innerHTML = "";

        for (let i = 0; i < 20; i++) {
            let img = document.createElement("img");
            img.src = dumbbellImage;
            img.className = "dumbbell";
            img.style.left = `${Math.random() * 90}%`; // Random horizontal position
            img.style.width = `${Math.random() * 50 + 100}px`; // Random size (30px - 80px)
            img.style.animationDuration = `${Math.random() * 15 + 10}s`; // Random speed (10s - 25s)
            container.appendChild(img);

            // Remove dumbbell after animation ends
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

        // Simple validation
        if (username.trim() === "" || password.trim() === "") {
            setErrorMessage("⚠️ Username and password cannot be empty.");
            return;
        }

        // Navigate to the main page after successful login
        navigate("/main");
    };

    return (
        <div className="login-wrapper">
            {/* Logo above login container */}
            <div className="dumbbell-container"></div>
            <img src={logo} alt="Workout Logo" className="logoFitting" />

            {/* Login Container */}
            <div className="login-container">
                
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
        </div>
    );
}

export default LoginPage;
