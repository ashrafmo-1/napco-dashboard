import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	 resolve: {
	 	extensions: [".js", ".jsx"],
	 },
	 base: "https://napco-dashboard.vercel.app/dashboard",
	server: {
	  historyApiFallback: true, // دعم التنقل عبر الـ SPA
	},
});


// export default defineConfig({
//   plugins: [react()],
//   base: '/',
//   server: {
//     historyApiFallback: true, // دعم التنقل عبر الـ SPA
//   },
// })
