import React, { useEffect, useState } from "react";
import axios from "axios";

const Achievements = ({ userId }) => {
  const [achievements, setAchievements] = useState({
    milestoneProgress: 0,
    badges: [],
  });

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/achievements/${userId}`
        );
        setAchievements(response.data || { milestoneProgress: 0, badges: [] });
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      }
    };

    if (userId) {
      fetchAchievements();
    }
  }, [userId]);

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Achievements</h2>
      <p className="mb-2">
        Milestone Progress: {achievements.milestoneProgress}/30
      </p>
      <div className="mb-4">
        <h3 className="font-bold">Badges:</h3>
        {achievements.badges?.length > 0 ? (
          <ul>
            {achievements.badges.map((badge, index) => (
              <li key={index} className="text-green-600">
                {badge}
              </li>
            ))}
          </ul>
        ) : (
          <p>No badges yet. Keep going!</p>
        )}
      </div>
      {achievements.milestoneProgress >= 30 && (
        <div className="p-4 bg-green-100 border border-green-400 rounded">
          <p className="text-green-800 font-bold">
            🎉 You Did It! You've Completed a 30-Day Fitness Challenge!
          </p>
        </div>
      )}
    </div>
  );
};

export default Achievements;
