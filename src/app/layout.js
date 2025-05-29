import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScrollProvider } from "@/context/SmoothScroll";
import "lenis/dist/lenis.css";

export const metadata = {
	title: "Pelumi | Portfolio",
	description: "Creative developer portfolio",
	icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
		apple: "/favicon.png",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</head>
			<body>
				<ThemeProvider>
					<SmoothScrollProvider>{children}</SmoothScrollProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
