import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import api from "../services/api";
import { toast } from "react-hot-toast";

function Signup() {
	const [formData, setFormData] = useState({
		name: "",
		contact: "",
		email: "",
		gender: "Male",
		age: "",
		password: "",
		healthPlan: "Basic",
		privacy: false,
		role: "member",
	});
	const { setIsAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/auth/signup", formData);
			setIsAuthenticated(true);
			toast.success("Signup successful");
			navigate("/login");
		} catch (error) {
			toast.error(error.response?.data?.message || "Error during signup");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto bg-white p-6 shadow-md rounded"
		>
			<h2 className="text-xl font-bold mb-4">Signup</h2>
			<div className="mb-4">
				<label className="block mb-2">Name</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2">Contact</label>
				<input
					type="text"
					name="contact"
					value={formData.contact}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2">Email</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2">Gender</label>
				<select
					name="gender"
					value={formData.gender}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					required
				>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>
			</div>
			<div className="mb-4">
				<label className="block mb-2">Age</label>
				<input
					type="number"
					name="age"
					value={formData.age}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					min="0"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2">Password</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					minLength="6"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2">Health Plan</label>
				<select
					name="healthPlan"
					value={formData.healthPlan}
					onChange={handleChange}
					className="w-full p-2 border rounded"
					required
				>
					<option value="Basic">Basic</option>
					<option value="Standard">Standard</option>
					<option value="Premium">Premium</option>
					<option value="Custom">Custom</option>
				</select>
			</div>
			
			<div className="mb-4">
                <label className="block mb-2">Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="trainer">Trainer</option>
					<option value="receptionist">Receptionist</option>
                </select>
            </div>
			<div className="mb-4">
				<label className="flex items-center">
					<input
						type="checkbox"
						name="privacy"
						checked={formData.privacy}
						onChange={handleChange}
						className="mr-2"
					/>
					Agree to Privacy Policy
				</label>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Signup

			</button>
		</form>
	);
}

export default Signup;
