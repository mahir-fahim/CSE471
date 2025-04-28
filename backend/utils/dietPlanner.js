function generateDietPlan(workoutType, age, duration) {
	let plan = [];
	let calorieAdjustment = 0;

	// Adjusting calories based on age group
	if (age < 18) {
		calorieAdjustment = 200; // Increase calorie intake for younger users
	} else if (age >= 18 && age <= 35) {
		calorieAdjustment = 0; // Standard calorie intake for young adults
	} else if (age > 35 && age <= 50) {
		calorieAdjustment = -200; // Slight decrease for people above 35
	} else {
		calorieAdjustment = -300; // Further decrease for older individuals
	}

	// Generating diet plan based on workout type and duration
	if (workoutType === "Weight Loss") {
		if (duration === "daily") {
			plan = [
				`Breakfast: Oats with fruits + Yogurt`,
				`Lunch: Grilled chicken with mixed veggies (high in fiber)`,
				`Dinner: Light soup (vegetable-based) and a salad`,
				`Snack: Almonds or a protein bar`,
				`Additional: Aim for a calorie deficit of ~200-500 calories daily, depending on age group (+${calorieAdjustment} calories adjustment)`,
			];
		} else if (duration === "weekly") {
			plan = [
				"Weekly plan: Focus on high-protein, low-carb meals with plenty of vegetables",
				"Include lean meats like chicken, fish, and turkey; limit processed carbs",
				"Plan: Include fiber-rich vegetables and healthy fats (e.g., olive oil, avocado)",
			];
		} else if (duration === "monthly") {
			plan = [
				"Monthly plan: Gradually reduce calorie intake while maintaining high protein to preserve muscle",
				"Include a variety of whole foods and prep meals in advance to avoid processed foods",
			];
		}
	} else if (workoutType === "Muscle Gain") {
		if (duration === "daily") {
			plan = [
				`Breakfast: Eggs, whole-grain toast, and avocado`,
				`Lunch: Grilled salmon with quinoa or brown rice`,
				`Dinner: Lean steak with sweet potatoes and steamed veggies`,
				`Snack: Protein shake or cottage cheese with nuts`,
				`Additional: Focus on high-calorie, protein-rich meals to aid muscle recovery`,
			];
		} else if (duration === "weekly") {
			plan = [
				"Weekly plan: High-calorie meals with an emphasis on lean proteins and complex carbs",
				"Incorporate nutrient-dense foods such as eggs, chicken breast, and whole grains",
				"Include healthy fats like nuts, olive oil, and fish oils for sustained energy",
			];
		} else if (duration === "monthly") {
			plan = [
				"Monthly plan: Focus on a progressive calorie surplus to support muscle growth",
				"Track protein intake (aim for 1.5-2g per kg of body weight) and adjust based on muscle gains",
			];
		}
	} else if (workoutType === "Maintenance") {
		if (duration === "daily") {
			plan = [
				`Breakfast: Smoothie with protein powder, banana, and spinach`,
				`Lunch: Turkey sandwich with whole-grain bread and a side salad`,
				`Dinner: Grilled chicken with brown rice and vegetables`,
				`Snack: Greek yogurt with berries`,
				`Additional: Maintain calorie intake based on activity level and body weight`,
			];
		} else if (duration === "weekly") {
			plan = [
				"Weekly plan: Focus on balanced meals with a moderate portion of proteins, carbs, and fats",
				"Include a variety of lean meats, vegetables, and healthy carbs like sweet potatoes and quinoa",
			];
		} else if (duration === "monthly") {
			plan = [
				"Monthly plan: Maintain consistent calorie intake to keep weight stable",
				"Aim for a balance of nutrient-dense foods with some flexibility for personal preferences",
			];
		}
	}

	return plan;
}

module.exports = generateDietPlan;
