import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";

function SetGoal() {
	const [goal, setGoal] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch current goal
		const fetchGoal = async () => {
			try {
				const response = await api.get("/fitness-goal");
				const currentGoal = response.data.goals.find(
					(g) => g.isCurrent
				);
				setGoal(currentGoal ? currentGoal.goal : "");
			} catch {
				setGoal("");
			}
		};
		fetchGoal();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/fitness-goal", { goal });
			toast.success(response.data.message || "Fitness goal updated");
			navigate("/view-goal"); // Redirect to the View Goal page
		} catch (error) {
			toast.error(
				error.response?.data?.message || "Error updating fitness goal"
			);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto bg-white p-6 shadow-md rounded"
		>
			<h2 className="text-xl font-bold mb-4">Set Your Fitness Goal</h2>
			<div className="mb-4">
				<label className="block mb-2">Select Goal</label>
				<select
					value={goal}
					onChange={(e) => setGoal(e.target.value)}
					className="w-full p-2 border rounded"
					required
				>
					<option value="">Select a goal</option>
					<option value="Weight Loss">Weight Loss</option>
					<option value="Muscle Gain">Muscle Gain</option>
					<option value="Maintenance">Maintenance</option>
				</select>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Save Goal
			</button>
		</form>
	);
}

export default SetGoal;
