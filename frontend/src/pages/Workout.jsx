import { useState, useEffect, useContext, useRef } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { AuthContext } from "../App";

function Workout() {
	const [workoutType, setWorkoutType] = useState("");
	const [isScheduled, setIsScheduled] = useState(false);
	const [startTime, setStartTime] = useState("");
	const [currentSession, setCurrentSession] = useState(null);
	const [elapsedTime, setElapsedTime] = useState(0);
	const { userId } = useContext(AuthContext);
	const timerRef = useRef(null); // Add useRef for timerRef
	const [allSessions, setAllSessions] = useState([]); // Add state for all sessions

	const fetchCurrentSession = async () => {
		try {
			const response = await api.get(
				`/workout-session/current/${userId}`
			);
			if (response.data) {
				setCurrentSession(response.data);
				startTimer(new Date(response.data.startTime));
				setWorkoutType(response.data.type);
			}
		} catch {
			toast.error("Failed to fetch current workout session");
		}
	};

	const fetchAllSessions = async () => {
		try {
			const response = await api.get(`/workout-session/${userId}/all`);
			setAllSessions(response.data);
		} catch {
			toast.error("Failed to fetch all workout sessions");
		}
	};

	useEffect(() => {
		fetchCurrentSession();
		fetchAllSessions();
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [userId]);

	const startTimer = (startTime) => {
		timerRef.current = setInterval(() => {
			setElapsedTime(
				Math.floor((new Date() - new Date(startTime)) / 1000)
			);
		}, 1000);
	};

	const handleStart = async () => {
		try {
			const session = await api.post("/workout-session", {
				userId,
				type: workoutType,
				startTime: isScheduled ? startTime : new Date(),
				isScheduled,
			});
			await fetchAllSessions();
			if (isScheduled) {
				toast.success("Workout session scheduled successfully");
				setCurrentSession(null);
				setElapsedTime(0);
				setWorkoutType("");
				setIsScheduled(false);
				return;
			} else {
				toast.success("Workout session started successfully");
				setCurrentSession(session.data);
				startTimer(new Date(session.data.startTime));
				setWorkoutType(session.data.type);
				setIsScheduled(false);
			}
		} catch {
			toast.error("Failed to start workout session");
		}
	};

	const handleComplete = async () => {
		try {
			await api.put(`/workout-session/${currentSession._id}`, {
				endTime: new Date(),
			});
			setCurrentSession(null);
			setElapsedTime(0);
			if (timerRef.current) clearInterval(timerRef.current);
			toast.success("Workout session completed");
			await fetchAllSessions();
		} catch (error) {
			console.error(error);
			toast.error("Failed to complete workout session");
		}
	};

	const formatTime = (seconds) => {
		const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
		const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
		const secs = String(seconds % 60).padStart(2, "0");
		return `${hrs}:${mins}:${secs}`;
	};

	const getStatus = (session) => {
		if (!session.endTime && new Date(session.startTime) <= new Date()) {
			return "Current";
		} else if (
			!session.endTime &&
			new Date(session.startTime) > new Date()
		) {
			return "Scheduled";
		} else {
			return "Complete";
		}
	};

	const getStatusBadge = (status) => {
		switch (status) {
			case "Current":
				return (
					<span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
						{status}
					</span>
				);
			case "Scheduled":
				return (
					<span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
						{status}
					</span>
				);
			case "Complete":
				return (
					<span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
						{status}
					</span>
				);
			default:
				return null;
		}
	};

	return (
		<div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded">
			<h2 className="text-2xl font-bold mb-4">Workout</h2>
			<div className="mb-4">
				<label className="block mb-2">Select Workout Type</label>
				<select
					value={workoutType}
					onChange={(e) => setWorkoutType(e.target.value)}
					className="w-full p-2 border rounded"
					disabled={!!currentSession}
				>
					<option value="">Select a workout</option>
					<option value="Running">Running</option>
					<option value="Push-ups">Push-ups</option>
					<option value="Pull-ups">Pull-ups</option>
					<option value="Cycling">Cycling</option>
					<option value="Yoga">Yoga</option>
					<option value="Swimming">Swimming</option>
				</select>
			</div>
			<div className="mb-4">
				<label className="flex items-center">
					<input
						type="checkbox"
						checked={isScheduled}
						onChange={(e) => setIsScheduled(e.target.checked)}
						className="mr-2"
						disabled={!!currentSession}
					/>
					Schedule for future
				</label>
				{isScheduled && (
					<input
						type="datetime-local"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						className="w-full p-2 border rounded mt-2"
						min={new Date().toISOString().slice(0, 16)}
						disabled={!!currentSession}
					/>
				)}
			</div>
			{currentSession ? (
				<div>
					<p className="text-lg font-bold text-center">
						<span className="text-8xl font-mono">
							{formatTime(elapsedTime)}
						</span>
					</p>
					<button
						onClick={handleComplete}
						className="bg-red-500 text-white px-4 py-2 rounded mt-4"
					>
						Complete Workout
					</button>
				</div>
			) : (
				<button
					onClick={handleStart}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					{isScheduled ? "Add Scheduled Workout" : "Start Workout"}
				</button>
			)}
			<div className="mt-8">
				<h3 className="text-xl font-bold mb-4">All Workout Sessions</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{allSessions.map((session) => {
						const status = getStatus(session);
						return (
							<div
								key={session._id}
								className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
							>
								<div className="flex justify-between items-center mb-4">
									<h4 className="text-lg font-bold text-gray-800">
										{session.type}
									</h4>
									{getStatusBadge(status)}
								</div>
								<p className="text-sm text-gray-600">
									<strong>Start Time:</strong>{" "}
									{new Date(
										session.startTime
									).toLocaleString()}
								</p>
								{session.endTime && (
									<p className="text-sm text-gray-600">
										<strong>End Time:</strong>{" "}
										{new Date(
											session.endTime
										).toLocaleString()}
									</p>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Workout;
