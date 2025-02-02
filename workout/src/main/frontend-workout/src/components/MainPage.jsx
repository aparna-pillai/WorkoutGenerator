import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // Import the CSS file
import axios from "../services/api";

function MainPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const handleSubmit = () => {
        console.log({ fitnessGoal, equipmentAccess, workoutDuration, restDays });
        const jsonString = JSON.stringify(restDays);
        const data = {
            'goal': fitnessGoal,
            'duration': workoutDuration,
            'equipment':equipmentAccess,
            'restDays': jsonString,
          };
        axios // fetches from the selected filter type to set the loan amount and row count
        .post("/goals/add",data,{
        headers:{
          'Access-Control-Allow-Origin': "http://localhost:3000/",
          'Access-Control-Allow-Methods': 'POST',
          'Content-Type': 'application/json',
        },
        multiValueHeaders:{
          "content-type":["text/plain"],
          "content-type":["application/json"],
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/Profile", { state: { workoutData: response.data } });
      })
      .catch((error) => console.error("Error fetching rate ", error));
        //navigate('/Profile');
    };

    const [fitnessGoal, setFitnessGoal] = useState("");
    const [equipmentAccess, setEquipmentAccess] = useState("");
    const [workoutDuration, setWorkoutDuration] = useState("");
    const [restDays, setRestDays] = useState([]);

    const handleCheckboxChange = (day) => {
        setRestDays((prev) =>
          prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    return (
        <div className="main-container">
            <div className="form-container">
                <h1>RU Working Out? Let's Get Started!</h1>

                {/* Fitness Goals */}
                <div className="input-group">
                    <h2>Choose Your Fitness Goal</h2>
                    {["Muscle Gain", "Endurance Improvement", "Flexibility & Mobility"].map((goal) => (
                        <label key={goal}>
                            <input
                                type="radio"
                                name="fitnessGoal"
                                value={goal}
                                checked={fitnessGoal === goal}
                                onChange={(e) => setFitnessGoal(e.target.value)}
                            />
                            {goal}
                        </label>
                    ))}
                </div>

                {/* Equipment Access */}
                <div className="input-group">
                    <h2>Is Equipment Accessible to You?</h2>
                    {["Yes", "No"].map((option) => (
                        <label key={option}>
                            <input
                                type="radio"
                                name="equipmentAccess"
                                value={option}
                                checked={equipmentAccess === option}
                                onChange={(e) => setEquipmentAccess(e.target.value)}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                {/* Workout Duration */}
                <div className="input-group">
                    <h2>Workout Duration</h2>
                    {["15 min", "30 min", "45 min", "60 min"].map((duration) => (
                        <label key={duration}>
                            <input
                                type="radio"
                                name="workoutDuration"
                                value={duration}
                                checked={workoutDuration === duration}
                                onChange={(e) => setWorkoutDuration(e.target.value)}
                            />
                            {duration}
                        </label>
                    ))}
                </div>

                {/* Rest Days */}
                <div className="input-group">
                    <h2>Rest Days (Select all that apply)</h2>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <label key={day}>
                            <input
                                type="checkbox"
                                value={day}
                                checked={restDays.includes(day)}
                                onChange={() => handleCheckboxChange(day)}
                            />
                            {day}
                        </label>
                    ))}
                </div>

                {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full mt-4"
            >
                Submit
            </button>

                {/* Logout Button */}
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default MainPage;
