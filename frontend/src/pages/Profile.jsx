import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkoutTimer from "../components/WorkoutTimer";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
const Profile = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const response = async () => {
    try {
      const user = await axiosInstance.get("/user/me");
      return user.data;
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    response();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${userId}`, formData);
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
        await axios.delete(`/api/users/${userId}`);
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
          name="phone"
          value={formData.phone}
          placeholder="Phone"
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
      <WorkoutTimer userId="USER_ID_HERE" />
    </div>
  );
};

export default Profile;
