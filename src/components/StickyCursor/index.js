"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";
import {
	motion,
	useMotionValue,
	useSpring,
	transform,
	animate,
} from "framer-motion";

const StickyCursor = () => {
	const cursor = useRef(null);
	const [isHovered, setIsHovered] = useState(false);
	const activeTargetRef = useRef(null);

	const isHoveredRef = useRef(false);

	const cursorSize = isHovered ? 25 : 10;

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const scale = {
		x: useMotionValue(1),
		y: useMotionValue(1),
	};

	const cursorX = useSpring(mouseX, {
		stiffness: 300,
		damping: 30,
	});
	const cursorY = useSpring(mouseY, {
		stiffness: 300,
		damping: 30,
	});

	const followerX = useSpring(mouseX, {
		stiffness: 100,
		damping: 20,
	});
	const followerY = useSpring(mouseY, {
		stiffness: 100,
		damping: 20,
	});

	const rotate = (distance) => {
		const angle = Math.atan2(distance.y, distance.x);
		animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 });
	};

	const mouseMove = (e) => {
		const { clientX, clientY } = e;
		if (isHoveredRef.current && activeTargetRef.current) {
			const { left, top, height, width } =
				activeTargetRef.current.getBoundingClientRect();
			//center position of the stickyElement
			const center = { x: left + width / 2, y: top + height / 2 };

			//distance between the mouse pointer and the center of the custom cursor and
			const distance = { x: clientX - center.x, y: clientY - center.y };

			//rotate
			rotate(distance);

			//stretch based on the distance
			const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
			const newScaleX = transform(absDistance, [0, height / 2], [1, 1.3]);
			const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8]);
			scale.x.set(newScaleX);
			scale.y.set(newScaleY);

			//move mouse to center of stickyElement + slightly move it towards the mouse pointer

			mouseX.set(center.x + distance.x * 0.1);
			mouseY.set(center.y + distance.y * 0.1);
		} else {
			//move custom cursor to center of stickyElement
			mouseX.set(clientX);
			mouseY.set(clientY);
		}
	};

	const handleEnter = (el) => {
		isHoveredRef.current = true;
		activeTargetRef.current = el;
		setIsHovered(true);
	};

	const handleLeave = (e) => {
		setIsHovered(false);
		isHoveredRef.current = false;
		activeTargetRef.current = null;
		animate(
			cursor.current,
			{ scaleX: 1, scaleY: 1 },
			{ duration: 0.1 },
			{ type: "spring" },
		);
	};

	useEffect(() => {
		window.addEventListener("mousemove", mouseMove);
		window.stickyCursor = { handleEnter, handleLeave };
		return () => {
			window.removeEventListener("mousemove", mouseMove);
			delete window.stickyCursor;
		};
	}, []);

	const template = ({ rotate, scaleX, scaleY }) => {
		return `translate(-50%, -50%) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
	};

	return (
		<div className={styles.cursorContainer}>
			<motion.div
				style={{
					left: cursorX,
					top: cursorY,

					background: isHovered ? "transparent" : "",
					mixBlendMode: isHovered ? "difference" : "",
				}}
				animate={{ width: cursorSize, height: cursorSize }}
				className={styles.cursor}></motion.div>
			<motion.div
				transformTemplate={template}
				style={{
					left: followerX,
					top: followerY,
					scaleX: scale.x,
					scaleY: scale.y,
					mixBlendMode: isHovered ? "difference" : "",
				}}
				animate={{ width: cursorSize * 2.5, height: cursorSize * 2.5 }}
				ref={cursor}
				className={styles.cursor_follower}></motion.div>
		</div>
	);
};
export default StickyCursor;
