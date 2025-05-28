"use client";
import styles from "./page.module.css";
import Navigation from "@/components/Navigation";
import Main from "../components/Main/index";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import About from "../components/About/index";
import Work from "@/components/Work";
import Magnetic from "../components/Magnetic/index";
import StickyCursor from "@/components/StickyCursor";
import Adventures from "@/components/Adventures";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Music from "@/components/Music";
import { AiOutlineMail } from "react-icons/ai";
import { motion } from "framer-motion";
import useHasMounted from "@/utils/useHasMounted";

export default function Home() {
	const hasMounted = useHasMounted();

	return (
		<div className={`${styles.page}`}>
			<Navigation />
			<Main />
			<About />
			<Work />
			<Adventures />
			<Contact />
			<Footer />
			{hasMounted && (
				<motion.div
					className={`${styles.social} g2`}
					initial={{ x: "100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 2.5, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}>
					<Magnetic>
						<a
							href='mailto:pelumitegbe@gmail.com'
							target='_blank'>
							<AiOutlineMail size={24} />
							<div className={styles.bounds}></div>
						</a>
					</Magnetic>
					<Magnetic>
						<a
							href='https://instagram.com/pe.lumi_'
							target='_blank'>
							<FaInstagram />
							<div className={styles.bounds}></div>
						</a>
					</Magnetic>
					<Magnetic>
						<a
							href='https://www.linkedin.com/in/pelumitegbe/'
							target='_blank'>
							<FaLinkedin />
							<div className={styles.bounds}></div>
						</a>
					</Magnetic>
					<Magnetic>
						<a
							href='https://github.com/pelumitegbe'
							target='_blank'>
							<FaGithub />
							<div className={styles.bounds}></div>
						</a>
					</Magnetic>
					<Magnetic>
						<a
							href='https://x.com/pe_lumi_'
							target='_blank'>
							<FaXTwitter />
							<div className={styles.bounds}></div>
						</a>
					</Magnetic>
				</motion.div>
			)}
			{hasMounted && <Music />}
			{hasMounted && <StickyCursor />}
		</div>
	);
}
