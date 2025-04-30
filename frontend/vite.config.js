import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
=======
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000", // Backend URL
				changeOrigin: true,
				secure: false,
			},
		},
	},
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
});
