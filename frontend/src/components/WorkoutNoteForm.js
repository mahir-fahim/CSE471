
import React, { useState } from 'react';
import axios from 'axios';

const WorkoutNoteForm = ({ userId, workoutId }) => {
  const [formData, setFormData] = useState({
    energyLevel: '',
    difficulty: '',
    observation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteData = {
        ...formData,
        user: userId,
        workoutId,
      };

      await axios.post('/api/notes', noteData);
      alert('Note added successfully!');
      // Optionally, reset the form or update the UI
    } catch (err) {
      console.error('Failed to submit note:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Energy Level:
        <select name="energyLevel" value={formData.energyLevel} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <label>
        Difficulty:
        <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Hard">Hard</option>
        </select>
      </label>

      <label>
        Observations:
        <textarea
          name="observation"
          value={formData.observation}
          onChange={handleChange}
          placeholder="Write any notes here..."
        />
      </label>

      <button type="submit">Save Note</button>
    </form>
  );
};

export default WorkoutNoteForm;
