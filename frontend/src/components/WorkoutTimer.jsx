import React, { useState, useEffect } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
const WorkoutTimer = ({ userId }) => {
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [message, setMessage] = useState("");

  // Update timer every second
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - new Date(startTime)) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, startTime]);

  const startWorkout = async () => {
    try {
      const response = await axiosInstance.post("/workouts/start", { userId });
      setSessionId(response.data._id);
      setStartTime(response.data.startTime);
      setTimerRunning(true);
      setMessage("");
    } catch (error) {
      console.error("Failed to start workout:", error);
    }
  };

  const endWorkout = async () => {
    try {
      await axios.patch(`/api/workouts/end/${sessionId}`);
      setTimerRunning(false);
      setMessage("Workout completed! Great job!");
    } catch (error) {
      console.error("Failed to end workout:", error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Workout Timer</h2>

      {timerRunning ? (
        <>
          <p className="text-lg font-mono mb-2">⏱️ {formatTime(elapsedTime)}</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={endWorkout}
          >
            End Workout
          </button>
        </>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={startWorkout}
        >
          Start Workout
        </button>
      )}

      {message && (
        <p className="mt-4 text-center text-blue-600 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
};

export default WorkoutTimer;
