"use client";
import styles from "./page.module.css";
import Navigation from "@/components/Navigation";
import Main from "../components/Main/index";
import About from "../components/About/index";
import Work from "@/components/Work";
import StickyCursor from "@/components/StickyCursor";
import Adventures from "@/components/Adventures";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Music from "@/components/Music";
import useHasMounted from "@/utils/useHasMounted";
import Socials from "@/components/Socials";
import Preloader from "@/components/Preloader";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
	const hasMounted = useHasMounted();
	const { hasInteracted } = useTheme();

	return (
		<div className={`${styles.page}`}>
			<Preloader />
			{hasInteracted && (
				<>
					<Navigation />
					<Main />
					<About />
					<Work />
					<Adventures />
					<Contact />
					<Footer />
					{hasMounted && <Socials />}
					{hasMounted && <Music />}
					{hasMounted && <StickyCursor />}
				</>
			)}
		</div>
	);
}
