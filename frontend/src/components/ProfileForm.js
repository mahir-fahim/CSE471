import { useState } from "react";
import axios from "axios";

function ProfileForm() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    fitnessLevel: "",
    foodHabit: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = "USER_ID_HERE"; // replace with real user ID or get from context/login
      const response = await axios.put(`http://localhost:5000/api/user/profile/${userId}`, formData);
      console.log("Updated!", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        name="weight"
        placeholder="Weight (kg)"
        value={formData.weight}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="height"
        placeholder="Height (cm)"
        value={formData.height}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="fitnessLevel"
        placeholder="Fitness Level (e.g. Beginner, Intermediate)"
        value={formData.fitnessLevel}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="foodHabit"
        placeholder="Food Habit (e.g. Vegetarian)"
        value={formData.foodHabit}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
}

export default ProfileForm;
