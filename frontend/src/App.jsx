import { useState, createContext, useEffect } from "react";
import {
<<<<<<< HEAD
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
=======
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
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
<<<<<<< HEAD
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
=======
import Workout from "./pages/Workout";
import Notifications from "./pages/Notifications";
import api from "./services/api";
import { io } from "socket.io-client";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";

export const AuthContext = createContext();

const socket = io("http://localhost:5000");

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userId, setUserId] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await api.get("/auth/check");
				setIsAuthenticated(response.data.isAuthenticated);
				setUserId(response.data.userId || null);
			} catch {
				setIsAuthenticated(false);
				setUserId(null);
			} finally {
				setIsLoading(false);
			}
		};
		checkAuth();
	}, []);

	useEffect(() => {
		if (userId) {
			socket.emit("join", userId);
		}

		socket.on("connect", () => {
			console.log("Connected to Socket.IO");
		});

		socket.on("notification", (notification) => {
			toast(notification.message);
		});

		return () => {
			socket.off("connect");
			socket.off("notification");
		};
	}, [userId]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, userId }}
		>
			<Router>
				<Toaster />
				<Navbar />
				<div className="container mx-auto p-4">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/login"
							element={
								!isAuthenticated ? (
									<Login />
								) : (
									<Navigate to="/" />
								)
							}
						/>
						<Route
							path="/signup"
							element={
								!isAuthenticated ? (
									<Signup />
								) : (
									<Navigate to="/" />
								)
							}
						/>
						<Route
							path="/set-goal"
							element={
								isAuthenticated ? (
									<SetGoal />
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/view-goal"
							element={
								isAuthenticated ? (
									<ViewGoal />
								) : (
									<Navigate to="/login" />
								)
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
						<Route
							path="/trainers/manage"
							element={<TrainerManagement />}
						/>
						<Route
							path="/trainers/:id"
							element={<TrainerDetails />}
						/>
						<Route
							path="/workout"
							element={
								isAuthenticated ? (
									<Workout />
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/notifications"
							element={
								isAuthenticated ? (
									<Notifications />
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
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
}

export default App;
