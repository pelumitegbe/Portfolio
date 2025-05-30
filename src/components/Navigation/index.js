"use client";
import React, { useRef } from "react";
import styles from "./index.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/storage";
import Magnetic from "../Magnetic/index";
import { useTheme } from "@/context/ThemeContext";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { MobileRevealY, SlideLeft, SlideRight } from "@/utils/animations";

const Navigation = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const { theme, toggleTheme, isMobile } = useTheme();
	const dropdownRef = useRef(null);

	const toggleMenu = () => {
		setMenuOpen((prev) => {
			const next = !prev;
			console.log("Menu will be:", next);
			return next;
		});
	};

	const [leftPupilPositions, setLeftPupilPositions] = React.useState({
		left: 0,
		top: 0,
	});
	const [rightPupilPositions, setRightPupilPositions] = React.useState({
		left: 0,
		top: 0,
	});

	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	React.useEffect(() => {
		const handleMouseMove = (e) => {
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			// Get the position of both eyes
			const leftEye = document.querySelector(`.${styles.left_eye}`);
			const rightEye = document.querySelector(`.${styles.right_eye}`);

			const leftEyeRect = leftEye.getBoundingClientRect();
			const rightEyeRect = rightEye.getBoundingClientRect();

			// Get the center of both eyes
			const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2;
			const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2;
			const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2;
			const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2;

			// Calculate the angle and distance of the mouse relative to the center of each eye
			const leftAngle = Math.atan2(
				mouseY - leftEyeCenterY,
				mouseX - leftEyeCenterX,
			);
			const rightAngle = Math.atan2(
				mouseY - rightEyeCenterY,
				mouseX - rightEyeCenterX,
			);

			const distance = Math.min(leftEyeRect.width / 4, leftEyeRect.height / 4); // Limit to 1/4th of the eye size

			// Calculate pupil position for left and right eyes
			const leftPupilX = Math.cos(leftAngle) * distance;
			const leftPupilY = Math.sin(leftAngle) * distance;
			const rightPupilX = Math.cos(rightAngle) * distance;
			const rightPupilY = Math.sin(rightAngle) * distance;

			setLeftPupilPositions({
				left: leftPupilX,
				top: leftPupilY,
			});

			setRightPupilPositions({
				left: rightPupilX,
				top: rightPupilY,
			});
		};
		document.addEventListener("mousemove", handleMouseMove);
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	React.useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 40);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const variants = {
		open: {
			height: "100vh",
			width: isMobile ? "50vw" : "40vw",
			opacity: 1,
			transition: {
				duration: 0.75,
				ease: [0.65, 0, 0.35, 1],
			},
		},
		closed: {
			height: "50px",
			width: "50px",
			opacity: 0,
			transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.3 },
		},
	};

	const navVar = {
		initial: {
			opacity: 0,
			y: 20,
		},
		enter: ([i]) => ({
			opacity: 1,
			y: 0,
			transition: { delay: 0.7 + i * 0.2 },
		}),
		exit: ([i, total]) => ({
			opacity: 0,
			y: 20,
			transition: { delay: (total - i - 1) * 0.1, duration: 0.2 },
		}),
	};

	return (
		<div className={`${styles.navigation}`}>
			<SlideLeft delay={0.5}>
				<a
					className={styles.logo}
					href='/'>
					<img
						src='/images/logo.png'
						alt='Logo'
					/>
				</a>
			</SlideLeft>
			<MobileRevealY>
				<div
					className={styles.eye_container}
					style={{
						opacity: scrolled ? "0" : "1",
						transform: scrolled ? "translateY(-10px)" : "translateY(0)",
						pointerEvents: scrolled ? "none" : "auto",
						transition: "all 0.3s ease",
					}}>
					<div className={`${styles.eye} ${styles.left_eye}`}>
						<div
							className={styles.pupil}
							style={{
								transform: `translate(-50%, -50%) translate(${leftPupilPositions.left}px, ${leftPupilPositions.top}px)`,
							}}></div>
					</div>
					<div className={`${styles.eye} ${styles.right_eye}`}>
						<div
							className={styles.pupil}
							style={{
								transform: `translate(-50%, -50%) translate(${rightPupilPositions.left}px, ${rightPupilPositions.top}px)`,
							}}></div>
					</div>
				</div>
			</MobileRevealY>
			<div
				className={styles.menuItems}
				ref={dropdownRef}>
				<SlideRight delay={0.5}>
					<div
						className={styles.themeToggle}
						onClick={toggleTheme}>
						<span className={styles.icon}>
							<IoSunnyOutline />
						</span>
						<span className={styles.icon}>
							<IoMoonOutline />
						</span>
						<div
							className={`${styles.ball} ${
								theme === "dark" ? styles.moveRight : styles.moveLeft
							}`}
						/>
					</div>
				</SlideRight>
				<MobileRevealY
					delay={1}
					position='static'>
					<div className={styles.menuToggle}>
						<div
							className={`${styles.menuBtns} ${menuOpen ? styles.open : ""}`}>
							<motion.a
								onClick={toggleMenu}
								animate={{ y: menuOpen ? "-100%" : "0", opacity: 1 }}
								transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
								initial={{ opacity: 0 }}>
								Menu
							</motion.a>
							<motion.a
								onClick={toggleMenu}
								animate={{ y: menuOpen ? "-100%" : "0", opacity: 1 }}
								transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
								initial={{ opacity: 0 }}>
								Close
							</motion.a>
						</div>
						<div className={styles.menuIconWrapper}>
							<Magnetic>
								<div
									className={`${styles.menuIcon} ${
										menuOpen ? styles.open : ""
									}`}
									onClick={toggleMenu}>
									<span className={styles.bar1}></span>
									<span className={styles.bar2}></span>
									<span className={styles.bar3}></span>
									<div className={styles.bounds}></div>
								</div>
							</Magnetic>
						</div>

						<motion.ul
							variants={variants}
							animate={menuOpen ? "open" : "closed"}
							initial={"closed"}
							className={`${styles.dropdown} ${menuOpen ? styles.open : ""}`}>
							{navItems?.map((item, i) => (
								<motion.li key={i}>
									<motion.a
										href={item.link}
										onClick={toggleMenu}
										variants={navVar}
										initial='initial'
										animate={menuOpen ? "enter" : "exit"}
										custom={[i, navItems.length]}
										exit='exit'
										className='rectang'>
										{item.title}
									</motion.a>
								</motion.li>
							))}
						</motion.ul>
					</div>
				</MobileRevealY>
			</div>
		</div>
	);
};

export default Navigation;
