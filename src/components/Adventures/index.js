import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import background from "../../../public/images/4.jpeg";
import { useTheme } from "@/context/ThemeContext";

const Adventures = () => {
	const [dimension, setDimension] = useState({ width: 0, height: 0 });
	const { height } = dimension;
	const container = useRef();
	const gallery = useRef();
	const { theme } = useTheme();

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});

	const { scrollYProgress: scrollYGalleryProgress } = useScroll({
		target: gallery,
		offset: ["start end", "end start"],
	});

	const galleryY1 = useTransform(
		scrollYGalleryProgress,
		[0, 1],
		[0, height * 1.3],
	);

	const galleryY2 = useTransform(
		scrollYGalleryProgress,
		[0, 1],
		[0, height * 1],
	);

	const galleryY3 = useTransform(
		scrollYGalleryProgress,
		[0, 1],
		[0, height * 1.8],
	);

	const galleryY4 = useTransform(
		scrollYGalleryProgress,
		[0, 1],
		[0, height * 1.3],
	);

	const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

	const images = [
		"/images/1.jpeg",
		"/images/2.jpeg",
		"/images/3.jpeg",
		"/images/5.jpeg",
		"/images/6.jpeg",
		"/images/7.jpeg",
		"/images/8.jpeg",
		"/images/9.jpeg",
		"/images/10.jpeg",
		"/images/11.jpeg",
		"/images/12.jpeg",
		"/images/13.jpeg",
	];

	useEffect(() => {
		const resize = () => {
			setDimension({ width: window.innerWidth, height: window.innerHeight });
		};
		window.addEventListener("resize", resize);
		resize();
		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<div className={`${styles.allAdventures}`}>
			<div
				ref={container}
				className={styles.adventures}
				style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
				<div className={styles.adventuresCont}>
					<motion.div style={{ y }}>
						<Image
							src={background}
							fill
							alt='image'
							style={{ objectFit: "cover", objectPosition: "center 90%" }}
						/>
						<div
							className={styles.overlay}
							style={{
								background:
									theme === "dark"
										? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))"
										: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.7))",
							}}>
							<h1>
								I've always loved being outside—there's something special about
								exploring new places, soaking in the views, and feeling
								connected to the world around me.
							</h1>
						</div>
					</motion.div>
				</div>
			</div>
			<div className={styles.advGrid}>
				<div
					ref={gallery}
					className={styles.gallery}>
					<Column
						images={[images[8], images[2], images[1]]}
						y={galleryY1}
					/>
					<Column
						images={[images[3], images[4], images[5]]}
						y={galleryY2}
					/>
					<Column
						images={[images[0], images[7], images[11]]}
						y={galleryY3}
					/>
					<Column
						images={[images[9], images[10], images[6]]}
						y={galleryY4}
					/>
				</div>
			</div>
		</div>
	);
};

export default Adventures;

const Column = ({ images, y = 0 }) => {
	return (
		<motion.div
			style={{ y }}
			className={styles.column}>
			{images.map((image, i) => {
				return (
					<div
						key={i}
						className={styles.imageCont}>
						<Image
							src={image}
							fill
							alt={i}
						/>
					</div>
				);
			})}
		</motion.div>
	);
};
