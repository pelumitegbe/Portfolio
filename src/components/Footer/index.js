import styles from "./index.module.css";
import React, { useState } from "react";

const Footer = () => {
	const [year, setYear] = useState("");

	React.useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer className={styles.footer}>
			<div className={styles.logo}>
				<img
					src='/images/logo.png'
					alt='Logo'
				/>
			</div>
			<p>
				&copy; {year}{" "}
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
