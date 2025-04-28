const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const requireAuth = require("../middleware/auth");

router.get("/", requireAuth, async (req, res) => {
	try {
		const notifications = await Notification.find({
			userId: req.user.id,
		}).sort({ createdAt: -1 });
		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch notifications" });
	}
});

router.put("/:id", requireAuth, async (req, res) => {
	try {
		await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
		res.status(200).json({ message: "Notification marked as read" });
	} catch (error) {
		res.status(500).json({ message: "Failed to update notification" });
	}
});

module.exports = router;
