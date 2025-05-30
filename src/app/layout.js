import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScrollProvider } from "@/context/SmoothScroll";
import "lenis/dist/lenis.css";

export const metadata = {
	title: "Pelumi | Portfolio",
	description: "My personal creative portfolio",
	authors: [{ name: "Pelumi Oluwategbe" }],
	keywords: [
		"software",
		"react",
		"fullstack",
		"portfolio",
		"software engineer",
		"developer",
		"sofware developer",
	],
	openGraph: {
		title: "Pelumi Oluwategbe Portfolio",
		type: "website",
		description: "My personal creative portfolio",
		images: [
			{
				url: "https://pelumi-tegbe.vercel.app/images/contact.png",
				width: 1200,
				height: 630,
				alt: "Logo Preview",
			},
		],
	},
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
