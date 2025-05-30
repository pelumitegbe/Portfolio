import styles from "./index.module.css";

export const Article = ({
	title,
	description,
	imgSrc,
	videoSrc,
	bg,
	link,
	github,
}) => {
	return (
		<div className={styles.articleContainer}>
			<div className={styles.article}>
				<video
					className={styles.bgVideo}
					autoPlay
					loop
					muted
					playsInline>
					<source
						src={videoSrc}
						type='video/mp4'
					/>
				</video>

				<div
					className={styles.textOverlay}
					style={{
						backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${imgSrc})`,
					}}
				/>
				<div className={styles.mainOverlay}>
					<h1>{title}</h1>
					<div className={styles.articleDesc}>
						<p>{description}</p>
						<div className={styles.articleBtns}>
							<a
								href={link}
								target='_blank'>
								<button>Live Site</button>
							</a>
							{github && (
								<a
									href={github}
									target='_blank'>
									<button>Source Code</button>
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
