import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import api from "../services/api";
import { toast } from "react-hot-toast";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setIsAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/auth/login", { email, password });
			setIsAuthenticated(true);
			toast.success("Login successful");
			navigate("/");
		} catch {
			toast.error("Invalid credentials");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto bg-white p-6 shadow-md rounded"
		>
			<h2 className="text-xl font-bold mb-4">Login</h2>
			<div className="mb-4">
				<label className="block mb-2">Email</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2">Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Login
			</button>
		</form>
	);
}

export default Login;
