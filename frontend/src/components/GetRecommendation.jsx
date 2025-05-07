import React, { useState, useEffect } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const GetRecommendation = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axiosInstance.get(`/user/recommend/${userId}`);
        setRecommendations(response.data.recommendedPlans);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        setError("Failed to fetch recommendations.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecommendations();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Recommended Workout Plans</h3>
      {recommendations.length > 0 ? (
        <ul className="space-y-2">
          {recommendations.map((plan) => (
            <li
              key={plan._id}
              className="p-4 border rounded shadow-sm bg-gray-100"
            >
              <h4 className="font-bold">{plan.name}</h4>
              <p>{plan.description}</p>
              <p>
                <strong>Target:</strong> {plan.target}
              </p>
              <p>
                <strong>Fitness Level:</strong> {plan.fitnessLevel}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workout plans available for your profile.</p>
      )}
    </div>
  );
};

export default GetRecommendation;
