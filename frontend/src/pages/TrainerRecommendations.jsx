import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";

function TrainerRecommendations() {
	const [trainers, setTrainers] = useState([]);
	const [currentTrainer, setCurrentTrainer] = useState(null);

	useEffect(() => {
		const fetchTrainers = async () => {
			try {
				const response = await api.get("/trainers");
				setTrainers(response.data.trainers);
			} catch (error) {
				console.error("Error fetching trainers:", error);
				toast.error("Error fetching trainers");
			}
		};

		const fetchCurrentTrainer = async () => {
			try {
				const response = await api.get("/trainers/current");
				setCurrentTrainer(response.data.trainer);
			} catch (error) {
				// Do not show a toast if no trainer is assigned
				if (error.response?.status !== 404) {
					console.error("Error fetching current trainer:", error);
					toast.error("Error fetching current trainer");
				}
			}
		};

		fetchTrainers();
		fetchCurrentTrainer();
	}, []);

	const handleAssignTrainer = async (trainerId) => {
		try {
			await api.post("/trainers/assign", { trainerId });
			toast.success("Trainer assigned successfully");
			const response = await api.get("/trainers/current");
			setCurrentTrainer(response.data.trainer);
		} catch (error) {
			console.error("Error assigning trainer:", error);
			toast.error("Error assigning trainer");
		}
	};

	const handleRemoveTrainer = async () => {
		try {
			await api.post("/trainers/remove");
			toast.success("Trainer removed successfully");
			setCurrentTrainer(null);
		} catch (error) {
			console.error("Error removing trainer:", error);
			toast.error("Error removing trainer");
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h2 className="text-2xl font-bold mb-4">Trainer Recommendations</h2>
			{currentTrainer ? (
				<div className="p-4 border rounded mb-4">
					<h3 className="text-xl font-bold">Your Current Trainer</h3>
					<p>
						Name:{" "}
						<Link
							to={`/trainers/${currentTrainer._id}`}
							className="text-blue-500 underline"
						>
							{currentTrainer.name}
						</Link>
					</p>
					<p>
						Specialization:{" "}
						{currentTrainer.specialization.join(", ")}
					</p>
					<p>Experience: {currentTrainer.experience} years</p>
					<p>{currentTrainer.bio}</p>
					<button
						onClick={handleRemoveTrainer}
						className="bg-red-500 text-white px-4 py-2 rounded mt-2"
					>
						Remove Trainer
					</button>
				</div>
			) : (
				<p>You currently have no assigned trainer.</p>
			)}
			<h3 className="text-xl font-bold mb-4">Available Trainers</h3>
			{trainers.map((trainer) => (
				<div key={trainer._id} className="p-4 border rounded mb-4">
					<h3 className="text-xl font-bold">
						<Link
							to={`/trainers/${trainer._id}`}
							className="text-blue-500 underline"
						>
							{trainer.name}
						</Link>
					</h3>
					<p>Specialization: {trainer.specialization.join(", ")}</p>
					<p>Experience: {trainer.experience} years</p>
					<p>{trainer.bio}</p>
					<button
						onClick={() => handleAssignTrainer(trainer._id)}
						className="bg-green-500 text-white px-4 py-2 rounded mt-2"
						disabled={!!currentTrainer}
					>
						Assign Trainer
					</button>
				</div>
			))}
		</div>
	);
}

export default TrainerRecommendations;
