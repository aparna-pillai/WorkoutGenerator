// Import React and necessary hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './LoginPage.css'; // Import the CSS file

function LoginPage() {
    // State variables for username, password, and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Initialize useNavigate hook for navigation
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Example validation (replace with actual authentication logic)
        if (username === '' || password === '') {
            setErrorMessage('Username and password cannot be empty.');
            return;
        }

        // Navigate to main page
        navigate('/main');
    };

    // JSX structure for login form
    return (
        <div className="login-container">
            <div className="login-form">
                <h1>RU Working Out?</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit">Login</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if exists */}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
