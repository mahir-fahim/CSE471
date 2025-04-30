import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

function Notifications() {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await api.get("/notifications");
				setNotifications(response.data);
			} catch {
				toast.error("Failed to fetch notifications");
			}
		};
		fetchNotifications();
	}, []);

	const markAsRead = async (id) => {
		try {
			await api.put(`/notifications/${id}`);
			setNotifications((prev) =>
				prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
			);
			toast.success("Notification marked as read");
		} catch {
			toast.error("Failed to mark notification as read");
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h2 className="text-2xl font-bold mb-4">Notifications</h2>
			<ul>
				{notifications.map((notification) => (
					<li
						key={notification._id}
						className={`p-4 border rounded mb-4 ${
							notification.isRead ? "bg-gray-100" : "bg-white"
						}`}
					>
						<p>{notification.message}</p>
						<p className="text-sm text-gray-500">
							{new Date(notification.createdAt).toLocaleString()}
						</p>
						{!notification.isRead && (
							<button
								onClick={() => markAsRead(notification._id)}
								className="text-blue-500 underline"
							>
								Mark as Read
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Notifications;
