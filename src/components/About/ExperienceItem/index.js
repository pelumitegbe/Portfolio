import React from "react";
import styles from "./index.module.css";
import {
	MobileRevealY,
	ScrollSlideLeft,
	ScrollSlideRight,
	ScrollSlideUp,
} from "@/utils/animations";

const ExperienceItem = ({ experience, index }) => {
	const Icon = experience.icon;

	const SlideComponent = index % 2 === 0 ? ScrollSlideRight : ScrollSlideLeft;

	return (
		<div className={styles.eItem}>
			<div className={styles.left}>
				<ScrollSlideUp>
					<h4>{experience.date}</h4>
				</ScrollSlideUp>
			</div>
			<div className={styles.middle}>
				<div className={styles.icon}>
					<Icon />
				</div>
				<div className={styles.line}></div>
			</div>
			<SlideComponent className={styles.right}>
				<div className={styles.header}>
					<h3>{experience.title}</h3>
					<h3>{experience.company}</h3>
				</div>
				<p>{experience.description}</p>

				<div className={styles.stack}>
					{experience.stack.map((s, i) => (
						<button
							key={i}
							className={styles.stack_item}>
							{s.title}
						</button>
					))}
				</div>
			</SlideComponent>
		</div>
	);
};

export default ExperienceItem;
