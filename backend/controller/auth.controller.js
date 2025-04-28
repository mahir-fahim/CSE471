const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use a strong secret in production (store it in .env)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

exports.signup = async (req, res) => {
	try {
		const {
			name,
			contact,
			email,
			gender,
			age,
			password,
			healthPlan,
			privacy,
		} = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({
			$or: [{ email }, { contact }],
		});
		if (existingUser) {
			return res
				.status(400)
				.json({
					message: "User with this email or contact already exists.",
				});
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create and save new user
		const newUser = new User({
			name,
			contact,
			email,
			gender,
			age,
			password: hashedPassword,
			healthPlan,
			privacy,
		});

		await newUser.save();
		res.status(201).json({ message: "User registered successfully!" });
	} catch (error) {
		console.error("Signup error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ message: "User not found" });

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(401).json({ message: "Invalid credentials" });

		// Create JWT
		const token = jwt.sign({ id: user._id }, JWT_SECRET, {
			expiresIn: "1d",
		});

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.status(200).json({
			message: "Login successful",
			user: { id: user._id, name: user.name },
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.logout = (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Logged out successfully" });
};

exports.checkSession = (req, res) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(200).json({ isAuthenticated: false });
	}

	try {
		jwt.verify(token, JWT_SECRET);
		const userId = jwt.decode(token).id;
		res.status(200).json({ isAuthenticated: true, userId });
	} catch {
		res.status(200).json({ isAuthenticated: false });
	}
};
