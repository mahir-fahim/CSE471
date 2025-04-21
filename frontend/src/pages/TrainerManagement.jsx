import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

function TrainerManagement() {
	const [trainers, setTrainers] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		specialization: "",
		experience: 0,
		bio: "",
		gender: "Male",
	});
	const [editingTrainerId, setEditingTrainerId] = useState(null);

	useEffect(() => {
		const fetchTrainers = async () => {
			try {
				const response = await api.get("/trainers"); // Ensure the endpoint matches the backend route
				setTrainers(response.data.trainers);
			} catch (error) {
				console.error("Error fetching trainers:", error);
				toast.error("Error fetching trainers");
			}
		};
		fetchTrainers();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (editingTrainerId) {
				await api.put(`/trainers/${editingTrainerId}`, {
					...formData,
					specialization: formData.specialization
						.split(",")
						.map((s) => s.trim()),
				});
				toast.success("Trainer updated successfully");
			} else {
				await api.post("/trainers", {
					...formData,
					specialization: formData.specialization
						.split(",")
						.map((s) => s.trim()),
				});
				toast.success("Trainer created successfully");
			}
			setFormData({
				name: "",
				specialization: "",
				experience: 0,
				bio: "",
				gender: "Male",
			});
			setEditingTrainerId(null);
			const response = await api.get("/trainers");
			setTrainers(response.data.trainers);
		} catch (error) {
			console.error("Error saving trainer:", error);
			toast.error("Error saving trainer");
		}
	};

	const handleEdit = (trainer) => {
		setFormData({
			name: trainer.name,
			specialization: trainer.specialization.join(", "),
			experience: trainer.experience,
			bio: trainer.bio,
			gender: trainer.gender,
		});
		setEditingTrainerId(trainer._id);
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/trainers/${id}`);
			setTrainers(trainers.filter((trainer) => trainer._id !== id));
			toast.success("Trainer deleted successfully");
		} catch (error) {
			console.error("Error deleting trainer:", error);
			toast.error("Error deleting trainer");
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Trainer Management</h1>
			<form onSubmit={handleSubmit} className="mb-6">
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
					<label className="block mb-2">
						Specialization (comma-separated)
					</label>
					<input
						type="text"
						name="specialization"
						value={formData.specialization}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2">Experience (years)</label>
					<input
						type="number"
						name="experience"
						value={formData.experience}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						min="0"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2">Bio</label>
					<textarea
						name="bio"
						value={formData.bio}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					></textarea>
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
						<option value="Other">Other</option>
					</select>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					{editingTrainerId ? "Update Trainer" : "Add Trainer"}
				</button>
			</form>
			<h2 className="text-xl font-bold mb-4">Trainer List</h2>
			{trainers.map((trainer) => (
				<div key={trainer._id} className="p-4 border rounded mb-4">
					<h3 className="text-lg font-bold">{trainer.name}</h3>
					<p>Specialization: {trainer.specialization.join(", ")}</p>
					<p>Experience: {trainer.experience} years</p>
					<p>{trainer.bio}</p>
					<p>Gender: {trainer.gender}</p>
					<div className="mt-2 space-x-2">
						<button
							onClick={() => handleEdit(trainer)}
							className="bg-yellow-500 text-white px-4 py-2 rounded"
						>
							Edit
						</button>
						<button
							onClick={() => handleDelete(trainer._id)}
							className="bg-red-500 text-white px-4 py-2 rounded"
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default TrainerManagement;
