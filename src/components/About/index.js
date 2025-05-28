import React from "react";
import styles from "./index.module.css";
import { FaUserGraduate, FaCode, FaCodeBranch } from "react-icons/fa";
import ExperienceItem from "./ExperienceItem";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import ScrollSlideIn, {
	Paragraph,
	ScrollSlideUpFast,
} from "@/utils/animations";

const About = () => {
	const experience = [
		{
			date: "August 2024 - Present",
			icon: FaUserGraduate,
			title: "Teaching Assistant",
			company: "Saint Louis University",
			description:
				"I've worked on various projects, including creating custom SharePoint solutions, developing web applications using React, Next.js, and TypeScript, and building RESTful APIs using Node.js and Express.js. I've also collaborated with other developers to maintain and improve the codebase.",
			stack: [
				{ title: "React" },
				{ title: "Typescript" },
				{ title: "Next js" },
				{ title: "Node JS" },
			],
		},
		{
			date: "November 2022 - July 2024",
			icon: FaCode,
			title: "Full-Stack Developer",
			company: "Lotus Beta Analytics",
			description:
				"I've worked on various projects, including creating custom SharePoint solutions, developing web applications using React, Next.js, and TypeScript, and building RESTful APIs using Node.js and Express.js. I've also collaborated with other developers to maintain and improve the codebase.",
			stack: [
				{ title: "React" },
				{ title: "Typescript" },
				{ title: "Next js" },
				{ title: "Node JS" },
			],
		},
		{
			date: "November 2022 - July 2024",
			icon: FaCodeBranch,
			title: "IT & Security Intern",
			company: "CardCentre Nigeria Limited",
			description:
				"I've worked on various projects, including creating custom SharePoint solutions, developing web applications using React, Next.js, and TypeScript, and building RESTful APIs using Node.js and Express.js. I've also collaborated with other developers to maintain and improve the codebase.",
			stack: [{ title: "WordPress" }, { title: "HTML" }, { title: "CSS" }],
		},
	];

	const stack = [
		{ title: "React", image: "/images/react.svg" },
		{ title: "TypeScript", image: "/images/typescript.png" },
		{ title: "Next JS", image: "/images/nextjs.svg" },
		{ title: "Node JS", image: "/images/node.png" },
		{ title: "Mongo DB", image: "/images/mongo.png" },
		{ title: "SQL Server", image: "/images/sql.png" },
		{ title: "Tailwind CSS", image: "/images/tailwind.png" },
		{ title: "GitHub", image: "/images/github.png" },
		{ title: "Docker", image: "/images/docker.png" },
		{ title: "SPFX", image: "/images/sharepoint.svg" },
	];

	const chunkSizes = [1, 2, 3, 4];

	let index = 0;
	const groupedStack = [];

	while (index < stack.length) {
		for (const size of chunkSizes) {
			if (index >= stack.length) break;
			groupedStack.push(stack.slice(index, index + size));
			index += size;
		}
	}

	const svgRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: svgRef,
		offset: ["start 80%", "end 70%"],
	});
	const fasterPath = useTransform(scrollYProgress, [0, 1], [0, 1.2]);

	// Optional: Smooth out scroll tracking
	const pathLength = useSpring(fasterPath, {
		stiffness: 100,
		damping: 30,
	});

	return (
		<div className={`${styles.about} page bg2`}>
			{/* <span>ABOUT</span> */}
			<div className={styles.about_text}>
				<ScrollSlideIn as='h1'>About me</ScrollSlideIn>
				<Paragraph paragraph="I'm a full-stack developer who loves turning ideas into real, functional web applications. With experience in React, Next.js, Node.js, and TypeScript, I focus on creating smooth, user-friendly interfaces and building solid backends. I've also worked with SharePoint, helping teams work smarter and more efficiently. I'm always exploring new technologies and finding creative ways to solve problems. Let's build something great together!" />
			</div>
			<div
				className={`${styles.experience} g1`}
				ref={svgRef}>
				<div className={styles.svgContainer}>
					<motion.svg
						viewBox='0 0 212 975'
						fill='none'
						className={styles.svg}>
						<motion.path
							d='M114.001 0.49998C114.001 0.49998 114.001 64.5 20.0009 147.5C-73.9994 230.5 220.501 412 196.001 290.5C171.501 169 20.0009 316.5 20.0009 425.5C20.0009 534.5 193.002 766.5 209.501 615C226 463.5 62.5 604.5 64 704.5C65.5 804.5 152 761 155 788C158 815 45.5018 815.5 86.5009 877.5C127.5 939.5 86.5009 974.5 86.5009 974.5'
							initial={{ pathLength: 0 }}
							style={{ pathLength }}
						/>
					</motion.svg>
				</div>

				<ScrollSlideIn as='h1'>Experience</ScrollSlideIn>
				{experience?.map((item, i) => (
					<ExperienceItem
						experience={item}
						index={i}
						key={i}
					/>
				))}
			</div>
			<div className={styles.stack}>
				<div className={styles.stack_text}>
					<div>
						<ScrollSlideIn as='h1'>Stack</ScrollSlideIn>
						<ScrollSlideUpFast>
							<p>
								Here are some of the key technologies I work with. I'm always
								eager to learn and explore new tools, so feel free to reach out
								if you'd like to discuss tech or collaborate!
							</p>
						</ScrollSlideUpFast>
						<ScrollSlideUpFast>
							<button>Contact me</button>
						</ScrollSlideUpFast>
					</div>
				</div>
				<div className={styles.stack_list}>
					{groupedStack?.map((group, i) => (
						<div
							key={i}
							className={styles.stack_group}>
							{group.map((item, i) => {
								// const IconComponent = item.icon;
								return (
									<div
										key={i}
										className={styles.stack_item}>
										<div
											className={styles.icon_container}
											data-tooltip={item.title}>
											<img
												src={item.image}
												className={styles.stack_icon}
											/>
										</div>
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default About;
