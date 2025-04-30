// utils/dietPlanner.js

function generateDietPlan(workoutType, targetWeight, currentWeight, duration) {
    const deficit = currentWeight - targetWeight;
    let plan = [];
  
    if (workoutType === "Weight Loss") {
      if (duration === "daily") {
        plan = [
          "Breakfast: Oats with fruits",
          "Lunch: Grilled chicken with veggies",
          "Dinner: Soup and salad",
        ];
      } else if (duration === "weekly") {
        plan = ["Weekly meal plan..."];
      } else if (duration === "monthly") {
        plan = ["Monthly meal plan..."];
      }
    } else if (workoutType === "Muscle Gain") {
      // Add logic for muscle gain
    }
  
    return plan;
  }
  
  module.exports = generateDietPlan;
  