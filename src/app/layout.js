import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScrollProvider } from "@/context/SmoothScroll";
import "lenis/dist/lenis.css";

export const metadata = {
	title: "Pelumi | Portfolio",
	description: "Creative developer portfolio",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<ThemeProvider>
					<SmoothScrollProvider>{children}</SmoothScrollProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
