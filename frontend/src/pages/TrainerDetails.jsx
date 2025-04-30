import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

function TrainerDetails() {
	const { id } = useParams();
	const [trainer, setTrainer] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTrainer = async () => {
			try {
				const response = await api.get(`/trainers/${id}`);
				if (response.data.trainer) {
					setTrainer(response.data.trainer);
				} else {
					setError("Trainer not found.");
				}
			} catch (err) {
				console.error("Error fetching trainer details:", err);
				setError("Failed to load trainer details. Please try again.");
			}
		};
		fetchTrainer();
	}, [id]);

	if (error) {
		return <div className="text-red-500 text-center">{error}</div>;
	}

	if (!trainer) {
		return <div className="text-center">Loading...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
			<h1 className="text-3xl font-bold mb-4">{trainer.name}</h1>
			<div className="mb-4">
				<h2 className="text-xl font-semibold">Specialization</h2>
				<p>{trainer.specialization.join(", ")}</p>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-semibold">Experience</h2>
				<p>{trainer.experience} years</p>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-semibold">Bio</h2>
				<p>{trainer.bio}</p>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-semibold">Certifications</h2>
				<p>
					{trainer.certifications.length > 0
						? trainer.certifications.join(", ")
						: "No certifications available"}
				</p>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-semibold">Gender</h2>
				<p>{trainer.gender}</p>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-semibold">Ratings</h2>
				<p>{trainer.ratings || "No ratings available"}</p>
			</div>
		</div>
	);
}

export default TrainerDetails;
