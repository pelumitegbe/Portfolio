"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("dark");
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		const initialTheme = storedTheme || "dark"; // Default to dark
		setTheme(initialTheme);
		if (initialTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);

		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		localStorage.setItem("theme", newTheme);
	};

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		handleResize(); // Initial check
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, isMobile }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
