import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Magnetic = ({ children }) => {
	const magRef = useRef(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouse = (e) => {
		const { clientX, clientY } = e;
		const { height, width, left, top } = magRef.current.getBoundingClientRect();
		const middleX = clientX - (left + width / 2);
		const middleY = clientY - (top + height / 2);
		setPosition({ x: middleX * 0.3, y: middleY * 0.3 });

		// StickyCursor communication
		if (window?.stickyCursor?.handleEnter) {
			window.stickyCursor.handleEnter(magRef.current);
		}
	};

	const reset = () => {
		setPosition({ x: 0, y: 0 });

		// Remove sticky target
		if (window?.stickyCursor?.handleLeave) {
			window.stickyCursor.handleLeave();
		}
	};

	useEffect(() => {
		const node = magRef.current;
		if (!node) return;

		node.style.display = "inline-block"; // prevent breaking layout
	}, []);

	const { x, y } = position;

	return (
		<motion.div
			style={{ position: "relative", display: "inline-block" }}
			ref={magRef}
			onMouseMove={handleMouse}
			onMouseLeave={reset}
			animate={{ x, y }}
			transition={{ type: "spring", stiffness: 350, damping: 5, mass: 0.5 }}>
			{children}
		</motion.div>
	);
};

export default Magnetic;
