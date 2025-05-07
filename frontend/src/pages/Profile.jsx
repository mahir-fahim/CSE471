import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkoutTimer from "../components/WorkoutTimer";
import GetRecommendation from "../components/GetRecommendation";
import Achievements from "../components/Achievements";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const Profile = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/user/me`);
        const { name, email, contact } = response.data;
        setFormData({ name, email, contact });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/user/privacy/${userId}`, formData);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await axiosInstance.delete(`/user/privacy/${userId}`);
        alert("Account deleted.");
        // Redirect or logout logic here
      } catch (err) {
        console.error(err);
        alert("Failed to delete account.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Welcome, {formData.name || "User"}!
      </h2>
      <p className="text-center text-gray-600 mb-4">Edit your profile below</p>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 rounded"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="contact"
          value={formData.contact}
          placeholder="Contact"
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Update Profile
        </button>
      </form>

      {message && <p className="mt-2 text-center text-green-600">{message}</p>}

      <hr className="my-6" />

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleDelete}
      >
        Delete Account
      </button>

      <Achievements userId={userId} />

      <WorkoutTimer userId={userId} />

      <GetRecommendation userId={userId} />
    </div>
  );
};

export default Profile;
