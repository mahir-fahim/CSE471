import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";
import api from "../services/api";
import { toast } from "react-hot-toast";

function Navbar() {
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await api.post("/auth/logout");
			setIsAuthenticated(false);
			toast.success("Logged out successfully");
			navigate("/login");
		} catch {
			toast.error("Error logging out");
		}
	};

	return (
		<nav className="bg-blue-500 text-white p-4 flex justify-between">
			<Link to="/" className="font-bold text-lg">
				GYM
			</Link>
			<div className="space-x-4">
				{!isAuthenticated ? (
					<>
						<Link to="/login" className="hover:underline">
							Login
						</Link>
						<Link to="/signup" className="hover:underline">
							Signup
						</Link>
					</>
				) : (
					<>
						<Link to="/set-goal" className="hover:underline">
							Set Goal
						</Link>
						<Link to="/view-goal" className="hover:underline">
							View Goal
						</Link>
						<Link to="/workout" className="hover:underline">
							Workout
						</Link>
						<Link to="/notifications" className="hover:underline">
							Notifications
						</Link>
						{isAuthenticated && (
							<>
								<Link
									to="/trainers"
									className="hover:underline"
								>
									Trainers
								</Link>
								<Link
									to="/trainers/manage"
									className="hover:underline"
								>
									Manage Trainers
								</Link>
							</>
						)}
						<button
							onClick={handleLogout}
							className="hover:underline"
						>
							Logout
						</button>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
