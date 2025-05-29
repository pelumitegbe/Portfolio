"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("dark");
	const [isMobile, setIsMobile] = useState(false);
	const [mounted, setMounted] = useState(false);

	const [hasInteracted, setHasInteractedState] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const stored = sessionStorage.getItem("hasInteracted");
			setHasInteractedState(stored === "true");
		}
	}, []);

	const setHasInteracted = (value) => {
		sessionStorage.setItem("hasInteracted", value);
		setHasInteractedState(value);
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedTheme = sessionStorage.getItem("theme") || "dark";
			setTheme(storedTheme);
			document.documentElement.classList.toggle("dark", storedTheme === "dark");

			const handleResize = () => setIsMobile(window.innerWidth <= 768);
			handleResize();
			window.addEventListener("resize", handleResize);

			setMounted(true); // <-- wait until DOM available

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		sessionStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	if (!mounted) return null;

	return (
		<ThemeContext.Provider
			value={{ theme, toggleTheme, isMobile, hasInteracted, setHasInteracted }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
