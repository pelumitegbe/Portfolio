"use client";
import React, { useRef } from "react";
import styles from "./index.module.css";
import { articles } from "@/storage";
import { Article } from "./Article";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollSlideIn from "@/utils/animations";
import { useTheme } from "@/context/ThemeContext";

const Work = () => {
	const containerRef = useRef(null);
	const { isMobile } = useTheme();

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	const totalX = isMobile
		? (articles.length - 1) * (100 + 2)
		: (articles.length - 1) * (50 + 3);

	const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${totalX}vw`]);

	return (
		<div
			ref={containerRef}
			className={styles.workWrapper}
			style={{ height: `${totalX}vh` }}
			id='work'>
			<div className={`${styles.work} `}>
				<div className={styles.workContent}>
					<ScrollSlideIn as='h1'>SELECTED WORKS</ScrollSlideIn>
					<motion.div
						className={styles.works}
						style={{ x }}>
						{articles.map((article, i) => (
							<Article
								key={i}
								title={article.title}
								description={article.description}
								imgSrc={article.imgSrc}
								bg={article.bg}
								videoSrc={article.videoSrc}
								link={article.link}
								github={article.github}
							/>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Work;
