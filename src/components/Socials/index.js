import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Magnetic from "../Magnetic/index";
import { AiOutlineMail } from "react-icons/ai";
import { motion } from "framer-motion";
import styles from "./index.module.css";

const Socials = () => {
	return (
		<motion.div
			className={`${styles.social}`}
			initial={{ x: "100%", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ delay: 2.5, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}>
			<Magnetic>
				<a
					href='mailto:pelumitegbe@gmail.com'
					target='_blank'>
					<AiOutlineMail />
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
		</motion.div>
	);
};

export default Socials;
