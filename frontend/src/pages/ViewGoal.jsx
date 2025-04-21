import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function ViewGoal() {
	const [goal, setGoal] = useState("");
	const [progress, setProgress] = useState([]);
	const [newProgress, setNewProgress] = useState({ value: "", date: "" });
	const [motivationalQuote, setMotivationalQuote] = useState("");

	useEffect(() => {
		// Fetch current goal and progress
		const fetchGoalDetails = async () => {
			try {
				const goalResponse = await api.get("/fitness-goal");
				const currentGoal = goalResponse.data.goals.find(
					(g) => g.isCurrent
				);
				if (currentGoal) {
					setGoal(currentGoal.goal);
					// Sort progress by date
					const sortedProgress = [...currentGoal.progress].sort(
						(a, b) => new Date(a.date) - new Date(b.date)
					);
					setProgress(sortedProgress);
				}

				// Fetch a motivational quote
				const quotes = {
					"Weight Loss":
						"The journey of a thousand miles begins with one step.",
					"Muscle Gain":
						"Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.",
					Maintenance: "Consistency is the key to success.",
				};
				setMotivationalQuote(quotes[currentGoal?.goal] || "");
			} catch {
				toast.error("Error fetching goal details");
			}
		};
		fetchGoalDetails();
	}, []);

	const handleAddProgress = async () => {
		try {
			await api.post("/fitness-goal/progress", {
				goal,
				...newProgress,
			});
			setProgress([...progress, newProgress]);
			setNewProgress({ value: "", date: "" });
			toast.success("Progress added successfully");
		} catch {
			toast.error("Error adding progress");
		}
	};

	const chartData = {
		labels: progress.map((p) => new Date(p.date).toLocaleDateString()),
		datasets: [
			{
				label: "Progress",
				data: progress.map((p) => p.value),
				borderColor: "blue",
				fill: false,
			},
		],
	};

	const getProgressInputLabel = () => {
		switch (goal) {
			case "Weight Loss":
				return "Weight (kg)";
			case "Muscle Gain":
				return "Reps Completed";
			case "Maintenance":
				return "Calories Burned";
			default:
				return "Progress";
		}
	};

	return (
		<div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded">
			<h2 className="text-2xl font-bold mb-4">Your Fitness Goal</h2>
			<p className="mb-4">Goal: {goal}</p>
			<p className="mb-4 italic">"{motivationalQuote}"</p>

			<h3 className="text-xl font-bold mb-2">Progress</h3>
			<Line data={chartData} />

			<div className="mt-4">
				<label className="block mb-2">{getProgressInputLabel()}</label>
				<input
					type="number"
					value={newProgress.value}
					onChange={(e) =>
						setNewProgress({
							...newProgress,
							value: e.target.value,
						})
					}
					className="p-2 border rounded w-full mb-2"
					placeholder="Enter progress value"
				/>
				<label className="block mb-2">Date</label>
				<input
					type="datetime-local"
					value={newProgress.date}
					onChange={(e) =>
						setNewProgress({ ...newProgress, date: e.target.value })
					}
					className="p-2 border rounded w-full mb-2"
				/>
				<button
					onClick={handleAddProgress}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Add Progress
				</button>
			</div>
		</div>
	);
}

export default ViewGoal;
