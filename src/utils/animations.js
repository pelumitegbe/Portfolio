/* eslint-disable react/prop-types */
import * as React from "react";
import styles from "./styles.module.css";
import {
	motion,
	useAnimation,
	useInView,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";

export const AnimatedWord = ({
	text,
	el: Wrapper = "p",
	className,
	once = true,
}) => {
	const ref = React.useRef(null);
	//amount :0.5 means that at least half of the element should be in view
	//once: truee, do it once
	const isInview = useInView(ref, { once: once });
	const defaultVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.2,
				type: "tween",
			},
		},
		exit: {
			opacity: 0,
		},
	};
	return (
		<Wrapper
			className={className}
			style={{ padding: "2px 0" }}>
			<motion.span
				ref={ref}
				initial='hidden'
				animate={isInview ? "visible" : "hidden"}
				transition={{ staggerChildren: 0.02 }}
				exit='exit'>
				{text?.split("").map((char, i) => (
					<motion.span
						key={i}
						variants={defaultVariants}
						className={className}>
						{char}
					</motion.span>
				))}
			</motion.span>
		</Wrapper>
	);
};

export const AnimatedParagraph = ({
	text,
	el: Wrapper = "p",
	className = "",
}) => {
	const ref = React.useRef(null);
	const textArray = Array.isArray(text) ? text : [text];
	const isInview = useInView(ref, { once: true });
	const defaultVariants = {
		hidden: {
			opacity: 0,
			y: "100%",
			transition: {
				duration: 0,
				staggerChildren: 0,
			},
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				staggerChildren: 0.01,
				duration: 0,
				type: "spring",
			},
		},
	};
	return (
		<Wrapper className={className}>
			<motion.span
				ref={ref}
				initial='hidden'
				animate={isInview ? "visible" : "hidden"}
				transition={{ staggerChildren: 0.01, duration: 0 }}>
				{textArray?.map((line, i) => (
					<span
						key={i}
						style={{ display: "block" }}>
						{line?.split(" ").map((word, j) => (
							<span
								key={j}
								style={{ display: "inline-block", overflow: "hidden" }}>
								{word?.split("").map((char, k) => (
									<motion.span
										key={k}
										style={{ display: "inline-block" }}
										variants={defaultVariants}>
										{char}
									</motion.span>
								))}
								{/* Add a space after each line */}
								<span style={{ display: "inline-block" }}>{"\u00A0"}</span>
							</span>
						))}
					</span>
				))}
			</motion.span>
		</Wrapper>
	);
};

export const Reveal = ({ children, style = "", delay = 0.5, once = false }) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	return (
		<div
			ref={ref}
			style={{ position: "relative", overflow: "hidden", ...style }}>
			<motion.div
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 1 },
					exit: { opacity: 0 },
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: 1, delay: delay }}
				style={{ height: "100%" }}>
				{children}
			</motion.div>
		</div>
	);
};
export const RevealY = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = false,
	duration = 0.5,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const [overflowVisible, setOverflowVisible] = React.useState(false);

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	const handleAnimationComplete = () => {
		setOverflowVisible(true);
	};

	return (
		<div
			ref={ref}
			style={{
				position: "relative",
				overflow: overflowVisible ? "visible" : "hidden",
				width: "100%",
				...style,
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { y: "100%", opacity: 0 },
					visible: {
						y: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.3 },
					},
					exit: { opacity: 0 },
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: duration, delay: 0.2 }}
				onAnimationComplete={handleAnimationComplete}>
				{children}
			</motion.div>
		</div>
	);
};
export const OtherRevealY = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = false,
	duration = 0.5,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	return (
		<div
			ref={ref}
			style={{
				position: "relative",
				overflow: "hidden",
				width: "100%",
				...style,
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { y: "100%", opacity: 0 },
					visible: {
						y: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.4 },
					},
				}}
				initial='hidden'
				animate={mainControls}
				exit={{ y: "100%" }}
				transition={{ duration: duration, delay: 0.2 }}>
				{children}
			</motion.div>
		</div>
	);
};
export const TestRevealY = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = false,
	duration = 0.5,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	return (
		<motion.div
			ref={ref}
			style={{
				position: "relative",
				overflow: "hidden",
				width: "100%",
				...style,
			}}
			className={className}
			variants={{
				hidden: { y: "100%", opacity: 0 },
				visible: {
					y: 0,
					opacity: 1,
					transition: { delay: delay, type: "spring", bounce: 0.4 },
				},
			}}
			initial='hidden'
			animate={mainControls}
			exit={{ y: "100%" }}
			transition={{ duration: duration, delay: 0.2 }}>
			{children}
		</motion.div>
	);
};
export const NavRevealY = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = false,
	duration = 0.5,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const [overflowVisible, setOverflowVisible] = React.useState(false);

	const handleAnimationComplete = () => {
		setOverflowVisible(true);
	};
	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	return (
		<div
			ref={ref}
			style={{
				position: "relative",
				overflow: "hidden",
				width: "100%",
				...style,
				padding: "2px 0",
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { y: 75, opacity: 0 },
					visible: {
						y: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.5 },
					},
					exit: {
						opacity: 0,
					},
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: duration, delay: 0.2 }}
				onAnimationComplete={handleAnimationComplete}
				style={{
					position: "relative",
					overflow: overflowVisible ? "visible" : "hidden",
					width: "100%",
					...style,
				}}>
				<div style={{ display: "flex" }}>{children}</div>
			</motion.div>
		</div>
	);
};
export const MobileNavRevealY = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = false,
	duration = 0.5,
	exitDelay = 0,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const [overflowVisible, setOverflowVisible] = React.useState(false);

	const handleAnimationComplete = () => {
		setOverflowVisible(true);
	};
	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	return (
		<div
			ref={ref}
			style={{
				position: "relative",
				overflow: "hidden",
				width: "100%",
				...style,
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { y: 75, opacity: 0 },
					visible: {
						y: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.5 },
					},
					exit: {
						y: -75,
						transition: { delay: exitDelay, type: "spring", bounce: 0.2 },
					},
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: duration, delay: 0.2 }}
				onAnimationComplete={handleAnimationComplete}
				style={{
					position: "relative",
					overflow: overflowVisible ? "visible" : "hidden",
					width: "100%",
					...style,
				}}>
				<div style={{ display: "flex" }}>{children}</div>
			</motion.div>
		</div>
	);
};
export const MobileRevealY = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = false,
	duration = 0.5,
	exitDelay = 0,
	position = "relative",
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const [overflowVisible, setOverflowVisible] = React.useState(false);

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	const handleAnimationComplete = () => {
		setOverflowVisible(true);
	};

	return (
		<div
			ref={ref}
			style={{
				position: position,
				overflow: overflowVisible ? "visible" : "hidden",
				width: "100%",
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { y: "100%", opacity: 0 },
					visible: {
						y: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.5 },
					},
					exit: {
						y: -75,
						opacity: 0,
						transition: { delay: exitDelay, type: "spring", bounce: 0.2 },
					},
				}}
				style={{
					...style,
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: duration, delay: 0.2 }}
				onAnimationComplete={handleAnimationComplete}>
				{children}
			</motion.div>
		</div>
	);
};
export const StaggerChild = ({ children, delay }) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref);
	const mainControls = useAnimation();
	const liVars = {
		hidden: {
			y: 75,
		},
		visible: {
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.1, 0.4, 0.22, 1],
				delay: 0.4 * delay,
			},
		},
		exit: { opacity: 0 },
	};

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	return (
		<div
			ref={ref}
			style={{ position: "relative", overflow: "hidden" }}>
			<motion.div
				variants={liVars}
				initial='hidden'
				animate={mainControls}
				exit='exit'>
				{children}
			</motion.div>
		</div>
	);
};
export const ScaleX = ({ children, once = false, style = "" }) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const qupteVar = {
		hidden: {
			scaleX: 0,
		},
		visible: {
			scaleX: 1,
			transition: {
				duration: 1,
				ease: [0.1, 0.4, 0.22, 1],
			},
		},
	};

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	return (
		<div
			ref={ref}
			style={{ position: "relative", overflow: "hidden", ...style }}>
			<motion.div
				variants={qupteVar}
				initial='hidden'
				animate={mainControls}>
				{children}
			</motion.div>
		</div>
	);
};
export const SingleScaleX = ({ children, once = false, style = "" }) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const qupteVar = {
		hidden: {
			scaleX: 0,
		},
		visible: {
			scaleX: 1,
			transition: {
				duration: 1,
				ease: [0.1, 0.4, 0.22, 1],
			},
		},
		exit: {
			scaleX: 0,
			transition: {
				duration: 0.5,
				delay: 1,
				ease: [0.1, 0.4, 0.22, 1],
			},
		},
	};

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	return (
		<div
			ref={ref}
			style={{ position: "relative", overflow: "hidden", ...style }}>
			<motion.div
				variants={qupteVar}
				initial='hidden'
				animate={mainControls}
				exit='exit'>
				{children}
			</motion.div>
		</div>
	);
};
export const ScaleXY = ({ children, once = false, delay = 0.5, index }) => {
	const [clickedIndex, setClickedIndex] = React.useState(null);
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	// Calculate middle position dynamically based on window height
	const qupteVar = {
		hidden: {
			scaleX: 0,
			scaleY: 0,
			transition: {
				duration: 1,
				ease: [0.1, 0.4, 0.22, 1],
			},
		},
		visible: {
			scaleX: 1,
			scaleY: 1,
			transition: {
				duration: 1,
				ease: [0.1, 0.4, 0.22, 1],
				delay: delay,
			},
		},
		// exit: { opacity: 0, transition: { delay: delay } },
		exit: {
			scaleX: clickedIndex === index ? 1.5 : 1,
			scaleY: clickedIndex === index ? 1.5 : 1,
			opacity: clickedIndex === index ? 1 : 0,
			transition: {
				duration: clickedIndex === index ? 2 : 1,
				delay: clickedIndex === index ? 1 : 0,
			},
		},
	};

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);
	return (
		<div
			ref={ref}
			style={{ position: "relative" }}
			onClick={() => setClickedIndex(index)}>
			<motion.div
				variants={qupteVar}
				initial='hidden'
				exit='exit'
				animate={mainControls}>
				{children}
			</motion.div>
		</div>
	);
};
export const ScaleY = ({
	children,
	once = false,
	delay = 0.5,
	className = "",
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const qupteVar = {
		hidden: {
			scaleY: 0,
			transition: {
				duration: 5,
				ease: [0.1, 0.4, 0.22, 1],
			},
		},
		visible: {
			scaleY: 1,
			transition: {
				duration: 1,
				ease: [0.1, 0.4, 0.22, 1],
				delay: delay,
			},
		},
		exit: { scaleY: 0, transition: { delay: 0.8, duration: 0.5 } },
	};

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);
	return (
		<motion.div
			ref={ref}
			variants={qupteVar}
			initial='hidden'
			exit='exit'
			animate={mainControls}
			className={className}>
			{children}
		</motion.div>
	);
};
export const RevealLeft = ({
	children,
	className = "",
	bg = "",
	once = true,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const slideControls = useAnimation();
	React.useEffect(() => {
		if (isInView) {
			slideControls.start("visible");
		} else {
			slideControls.start("hidden");
		}
	}, [isInView, slideControls]);
	return (
		<motion.div
			ref={ref}
			className={className}
			exit={{ opacity: 0, transition: { duration: 1 } }}>
			<motion.div
				variants={{
					hidden: {
						right: 0,
					},
					visible: {
						ease: [0.1, 0.5, 0.22, 0.3],
						right: "100%",
						transition: { duration: 1 },
					},
				}}
				initial='hidden'
				animate={slideControls}
				style={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 0,
					background: bg,
				}}
				exit='exit'></motion.div>
			{children}
		</motion.div>
	);
};
export const RevealRight = ({ children, className = "", bg = "" }) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true });
	const slideControls = useAnimation();
	React.useEffect(() => {
		if (isInView) {
			slideControls.start("visible");
		} else {
			slideControls.start("hidden");
		}
	}, [isInView, slideControls]);
	return (
		<motion.div
			ref={ref}
			className={className}
			exit={{ opacity: 0, transition: { duration: 1 } }}>
			<motion.div
				variants={{
					hidden: {
						left: 0,
					},
					visible: {
						ease: [0.1, 0.5, 0.22, 0.3],
						left: "100%",
						transition: { duration: 1.5 },
					},
				}}
				initial='hidden'
				animate={slideControls}
				style={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					background: bg,
				}}></motion.div>
			{children}
		</motion.div>
	);
};
export const ShakeButton = ({
	children,
	once = false,
	className = "",
	delay = 0,
	duration = 1,
	style = "",
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const qupteVar = {
		hidden: {
			// opacity: 0,
			transition: {
				duration: 0.5,
				ease: [0.1, 0.4, 0.22, 1],
			},
		},
		visible: {
			// opacity: 1,
			rotate: [0, -10, 0, 10, 0, -10, 0, 10, 0, -10, 0, 10, 0],
			transition: {
				duration: duration,
				ease: [0.1, 0.4, 0.22, 1],
				delay: delay,
			},
		},
		hover: {
			rotate: [0, -10, 0, 10, 0, -10, 0, 10, 0, -10, 0, 10, 0],
			scale: 1.2,
			transition: {
				duration: 1,
				ease: [0.1, 0.4, 0.22, 1],
				delay: 0,
			},
		},
	};

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	return (
		<div
			ref={ref}
			style={{ position: "relative", ...className, ...style }}>
			<motion.div
				whileHover='hover'
				variants={qupteVar}
				initial='hidden'
				animate={mainControls}>
				{/* <motion.div
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            borderRadius: "10px",
            background: "var(--primary-color)"
          }}
          animate={{
            scaleX: [1, 1.2],
            scaleY: [1, 1.5],
            opacity: [0.4, 0],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        ></motion.div> */}
				{children}
			</motion.div>
		</div>
	);
};
export const PersonalityRevealH4Y = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = false,
	duration = 1,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const [overflowVisible, setOverflowVisible] = React.useState(false);

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	const handleAnimationComplete = () => {
		setOverflowVisible(true);
	};

	return (
		<div
			ref={ref}
			style={{
				overflow: overflowVisible ? "visible" : "hidden",
				width: "100%",
				...style,
			}}
			className={className}>
			<motion.h4
				variants={{
					hidden: { y: "100%", opacity: 0 },
					visible: {
						y: 0,
						opacity: 1,
						transition: {
							delay: delay,
							type: "spring",
							bounce: 0.5,
							duration: duration,
						},
					},
					exit: { opacity: 0 },
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				onAnimationComplete={handleAnimationComplete}>
				{children}
			</motion.h4>
		</div>
	);
};
export const PersonalityRevealY = ({
	children,
	delay = 0,
	className = "",
	once = false,
	duration = 0.5,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);
	return (
		<div
			ref={ref}
			style={{
				position: "relative",
				overflow: "hidden",
				width: "100%",
				padding: "10px 0",
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { y: "100%", opacity: 0 },
					visible: {
						y: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.4 },
					},
					exit: { opacity: 0 },
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: duration, delay: 0.2 }}
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "1rem",
				}}>
				{children}
			</motion.div>
		</div>
	);
};
export const SlideLeft = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = true,
	duration = 0.5,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const [overflowVisible, setOverflowVisible] = React.useState(false);

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	const handleAnimationComplete = () => {
		setOverflowVisible(true);
	};

	return (
		<div
			ref={ref}
			style={{
				position: "relative",
				overflow: overflowVisible ? "visible" : "hidden",
				...style,
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { x: "-100%", opacity: 0 },
					visible: {
						x: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.3 },
					},
					exit: { opacity: 0 },
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: duration, delay: 0.2 }}
				onAnimationComplete={handleAnimationComplete}>
				{children}
			</motion.div>
		</div>
	);
};
export const SlideRight = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = true,
	duration = 0.5,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const [overflowVisible, setOverflowVisible] = React.useState(false);

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	const handleAnimationComplete = () => {
		setOverflowVisible(true);
	};

	return (
		<div
			ref={ref}
			style={{
				position: "relative",
				overflow: overflowVisible ? "visible" : "hidden",
				...style,
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { x: "100%", opacity: 0 },
					visible: {
						x: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.2 },
					},
					exit: { opacity: 0 },
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: duration, delay: 0.2 }}
				onAnimationComplete={handleAnimationComplete}>
				{children}
			</motion.div>
		</div>
	);
};
export const MobileNavSlideRight = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = true,
	duration = 0.5,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const [overflowVisible, setOverflowVisible] = React.useState(false);

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	const handleAnimationComplete = () => {
		setOverflowVisible(true);
	};

	return (
		<div
			ref={ref}
			style={{
				overflow: overflowVisible ? "visible" : "hidden",
				...style,
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { x: "100%", opacity: 0 },
					visible: {
						x: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.3 },
					},
					exit: { x: 75 },
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: duration, delay: 0.2 }}
				onAnimationComplete={handleAnimationComplete}>
				{children}
			</motion.div>
		</div>
	);
};
export const TestSlideLeft = ({
	children,
	delay = 0,
	className = "",
	style = "",
	once = false,
	duration = 0.5,
}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: once });
	const mainControls = useAnimation();
	const [overflowVisible, setOverflowVisible] = React.useState(false);

	React.useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		} else {
			mainControls.start("hidden");
		}
	}, [isInView, mainControls]);

	const handleAnimationComplete = () => {
		setOverflowVisible(true);
	};

	return (
		<div
			ref={ref}
			style={{
				position: "relative",
				overflow: overflowVisible ? "visible" : "hidden",
				...style,
			}}
			className={className}>
			<motion.div
				variants={{
					hidden: { x: "-100%", opacity: 0 },
					visible: {
						x: 0,
						opacity: 1,
						transition: { delay: delay, type: "spring", bounce: 0.3 },
					},
					exit: { opacity: 0 },
				}}
				initial='hidden'
				animate={mainControls}
				exit='exit'
				transition={{ duration: duration, delay: 0.2 }}
				onAnimationComplete={handleAnimationComplete}>
				{children}
			</motion.div>
		</div>
	);
};

// export const CustomSlideLeft = ({
// 	children,
// 	delay = 0,
// 	className = "",
// 	style = "",
// 	once = true,
// 	duration = 0.5,
// }) => {
// 	const ref = React.useRef(null);
// 	const isInView = useInView(ref, { once: once });
// 	const { scrollYProgress } = useScroll({
// 		target: ref,
// 		offset: ["start end", "start center"],
// 	});
// 	const mainControls = useAnimation();
// 	const [overflowVisible, setOverflowVisible] = React.useState(false);

// 	React.useEffect(() => {
// 		if (isInView) {
// 			mainControls.start("visible");
// 		} else {
// 			mainControls.start("hidden");
// 		}
// 	}, [isInView, mainControls]);

// 	const handleAnimationComplete = () => {
// 		setOverflowVisible(true);
// 	};

//   // Motion transforms
// 	const x = useTransform(scrollYProgress, [0, 1], [offsetX, "0px"]);
// 	const color = useTransform(scrollYProgress, [0, 1], [fromColor, toColor]);

// 	// Optional smoothing
// 	const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

// 	return (
// 		<div
// 			ref={ref}
// 			style={{
// 				position: "relative",
// 				overflow: overflowVisible ? "visible" : "hidden",
// 				...style,
//         color,
//         x: smoothX
// 			}}
// 			className={className}>
// 			<motion.div
// 				variants={{
// 					hidden: { x: "-100%", opacity: 0 },
// 					visible: {
// 						x: 0,
// 						opacity: 1,
// 						transition: { delay: delay, type: "spring", bounce: 0.3 },
// 					},
// 					exit: { opacity: 0 },
// 				}}
// 				initial='hidden'
// 				animate={mainControls}
// 				exit='exit'
// 				transition={{ duration: duration, delay: 0.2 }}
// 				onAnimationComplete={handleAnimationComplete}>
// 				{children}
// 			</motion.div>
// 		</div>
// 	);
// };

const ScrollSlideIn = ({
	children,
	offsetX = "100px",
	as = "div",
	className = "",
	style = {},
}) => {
	const ref = React.useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "start 0.7"],
	});

	// Motion transforms
	const x = useTransform(scrollYProgress, [0, 1], [offsetX, "0px"]);

	// Optional smoothing
	const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

	// Dynamic element
	const MotionTag = motion[as];

	return (
		<MotionTag
			ref={ref}
			style={{
				x: smoothX,
				...style,
			}}
			className={className}>
			{children}
		</MotionTag>
	);
};

export default ScrollSlideIn;

export const ScrollSlideLeft = ({
	children,
	offsetX = "-100px",
	as = "div",
	className = "",
	style = {},
}) => {
	const ref = React.useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.6", "start 0.4"], // customize as needed
	});

	const x = useTransform(scrollYProgress, [0, 1], [offsetX, "0px"]);
	const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

	const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
	const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

	const MotionTag = motion[as];

	return (
		<MotionTag
			ref={ref}
			style={{
				x: smoothX,
				opacity: smoothOpacity,
				...style,
			}}
			className={className}>
			{children}
		</MotionTag>
	);
};

export const ScrollSlideRight = ({
	children,
	offsetX = "100px",
	as = "div",
	className = "",
	style = {},
}) => {
	const ref = React.useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.6", "start 0.4"],
	});

	const x = useTransform(scrollYProgress, [0, 1], [offsetX, "0px"]);
	const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

	const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
	const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

	const MotionTag = motion[as];

	return (
		<MotionTag
			ref={ref}
			style={{
				x: smoothX,
				opacity: smoothOpacity,
				...style,
			}}
			className={className}>
			{children}
		</MotionTag>
	);
};

export const ScrollSlideUp = ({
	children,
	offsetY = "50px",
	as = "div",
	className = "",
	style = {},
}) => {
	const ref = React.useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.9", "start 0.1"], // triggers when ~70% visible
	});

	const y = useTransform(scrollYProgress, [0, 1], [offsetY, "0px"]);
	const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

	const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
	const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

	const MotionTag = motion[as];

	return (
		<MotionTag
			ref={ref}
			style={{
				y: smoothY,
				opacity: smoothOpacity,
				...style,
			}}
			className={className}>
			{children}
		</MotionTag>
	);
};
export const ScrollSlideUpFast = ({
	children,
	offsetY = "50px",
	as = "div",
	className = "",
	style = {},
}) => {
	const ref = React.useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "start end"], // triggers when ~70% visible
	});

	const y = useTransform(scrollYProgress, [0, 1], [offsetY, "0px"]);
	const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

	const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
	const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

	const MotionTag = motion[as];

	return (
		<MotionTag
			ref={ref}
			style={{
				y: smoothY,
				opacity: smoothOpacity,
				...style,
			}}
			className={className}>
			{children}
		</MotionTag>
	);
};

export const Paragraph = ({ paragraph }) => {
	const container = React.useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start 0.8", "start 0.3"],
	});

	const words = paragraph.split(" ");
	return (
		<p
			ref={container}
			className={styles.paragraph}>
			{words.map((word, i) => {
				const start = i / words.length;
				const end = start + 1 / words.length;
				return (
					<Word
						key={i}
						progress={scrollYProgress}
						range={[start, end]}>
						{word}
					</Word>
				);
			})}
		</p>
	);
};

export const Word = ({ children, progress, range }) => {
	const amount = range[1] - range[0];
	const step = amount / children.length;
	return (
		<span className={styles.word}>
			{children.split("").map((char, i) => {
				const start = range[0] + i * step;
				const end = range[0] + (i + 1) * step;
				return (
					<Char
						key={`c_${i}`}
						progress={progress}
						range={[start, end]}>
						{char}
					</Char>
				);
			})}
		</span>
	);
};
export const Char = ({ children, progress, range }) => {
	const opacity = useTransform(progress, range, [0, 1]);
	return (
		<motion.span>
			<span className={styles.shadow}>{children}</span>
			<motion.span style={{ opacity: opacity }}>{children}</motion.span>
		</motion.span>
	);
};
