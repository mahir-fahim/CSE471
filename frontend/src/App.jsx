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

export const AuthContext = createContext();

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	useEffect(() => {
		// Check if the user is logged in
		const checkAuth = async () => {
			try {
				const response = await api.get("/auth/check"); // Backend endpoint to verify token
				setIsAuthenticated(response.data.isAuthenticated);
			} catch {
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false); // Set loading to false after check
			}
		};
		checkAuth();
	}, []);

	if (isLoading) {
		// Show a loading indicator while checking authentication
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			<Router>
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
					</Routes>
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
