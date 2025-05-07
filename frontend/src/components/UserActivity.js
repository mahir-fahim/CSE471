// frontend/src/components/UserActivity.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserActivity = ({ userId }) => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    axios.get(`/api/activity/${userId}`)
      .then(res => setActivity(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div>
      <h2>User Activity History</h2>
      {activity.map((item, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
          <p><strong>Habits:</strong> {item.habits.join(', ')}</p>
          <p><strong>Challenges:</strong> {item.challenges.join(', ')}</p>
          <p><strong>Notifications:</strong> {item.notifications.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default UserActivity;
