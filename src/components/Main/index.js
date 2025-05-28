import React from "react";
import styles from "./index.module.css";
import { FaRegHandPointDown } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
	MobileRevealY,
	Reveal,
	SlideLeft,
	SlideRight,
} from "@/utils/animations";
import { useTheme } from "@/context/ThemeContext";

const Main = () => {
	const { isMobile } = useTheme();

	return (
		<main className={`${styles.main} g1 page`}>
			<section>
				<MobileRevealY
					delay={1}
					once={true}
					style={{
						display: "flex",
						flexDirection: "column",
						gap: isMobile ? "0" : "0.5rem",
					}}>
					<h2>Hi there, I'm</h2>
					<h1 className='pc scale'>Pelumi</h1>
				</MobileRevealY>
				<MobileRevealY
					delay={1.3}
					once={true}>
					<div>
						<h3>
							A <span className='pc'>fullstack developer</span> based in
						</h3>
						<h3>Saint Louis, Missouri</h3>
					</div>
				</MobileRevealY>
				<div className={styles.main_buttons}>
					<SlideLeft delay={1.5}>
						<button>Hire Me</button>
					</SlideLeft>
					<SlideRight delay={1.7}>
						<button className={styles.main_buttons_n2}>My CV</button>
					</SlideRight>
				</div>
			</section>
			<section className={styles.picSection}>
				<Reveal delay={1.5}>
					<img
						src='/images/main.png'
						alt='Dashboard pic'
					/>
				</Reveal>
			</section>
			<motion.div
				className={styles.scrollPrompt}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ delay: 1.7, duration: 5, ease: "easeOut" }}>
				<h2>SCROLL</h2>
				<FaRegHandPointDown className={styles.arrow} />
			</motion.div>
		</main>
	);
};

export default Main;
