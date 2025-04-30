import { useState, createContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SetGoal from "./pages/SetGoal";
import ViewGoal from "./pages/ViewGoal";
import TrainerRecommendations from "./pages/TrainerRecommendations";
import TrainerManagement from "./pages/TrainerManagement";
import TrainerDetails from "./pages/TrainerDetails";
import api from "./services/api";
import "./App.css";
import Profile from "./pages/profile";

import axios from "axios";

export const AuthContext = createContext();
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get(`/user/me`);

        // create this endpoint to get logged-in user
        setIsAuthenticated(true);
        setUser(response.data); // Save user object
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    // Show a loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user }}>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/set-goal"
              element={isAuthenticated ? <SetGoal /> : <Navigate to="/login" />}
            />
            <Route
              path="/view-goal"
              element={
                isAuthenticated ? <ViewGoal /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/trainers"
              element={
                isAuthenticated ? (
                  <TrainerRecommendations />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/trainers/manage" element={<TrainerManagement />} />
            <Route path="/trainers/:id" element={<TrainerDetails />} />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile userId={user?._id} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
