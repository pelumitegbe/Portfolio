import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const Preloader = () => {
	const { hasInteracted, setHasInteracted } = useTheme();
	const [dividerHeight, setDividerHeight] = useState("70px");

	useEffect(() => {
		const width = window.innerWidth;
		if (width <= 480) {
			setDividerHeight("40px");
		} else if (width <= 768) {
			setDividerHeight("50px");
		} else if (width <= 1024) {
			setDividerHeight("60px");
		} else {
			setDividerHeight("70px");
		}
	}, []);

	if (hasInteracted) return null;

	const nameVariants = {
		hidden: { x: 50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: { delay: 0.5, duration: 1, ease: "easeOut" },
		},
	};

	const roleVariants = {
		hidden: { x: -50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: { delay: 0.7, duration: 1, ease: "easeOut" },
		},
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.content}>
				<img
					src='/images/main.png'
					alt='Start picture'
					className={styles.image}
				/>
				<div className={styles.nameWrapper}>
					<motion.p
						className={styles.name}
						variants={nameVariants}
						initial='hidden'
						animate='visible'>
						<span>Pelumi</span>
						<span>Oluwategbe</span>
					</motion.p>

					<motion.div
						className={styles.divider}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: dividerHeight, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
					/>
					<motion.p
						className={styles.role}
						variants={roleVariants}
						initial='hidden'
						animate='visible'>
						<span>Software</span>
						<span>Engineer</span>
					</motion.p>
				</div>
				<button
					className={styles.button}
					onClick={() => setHasInteracted(true)}>
					Start
				</button>
			</div>
		</div>
	);
};

export default Preloader;
