import styles from "./index.module.css";
import { FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.logo}>
				<img
					src='/images/logo.png'
					alt='Logo'
				/>
			</div>
			<p>
				&copy; {new Date().getFullYear()}{" "}
				<a
					href='https://www.linkedin.com/in/pelumitegbe'
					target='_blank'>
					Pelumi
				</a>{" "}
				All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
