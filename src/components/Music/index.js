import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import {
	FaPlay,
	FaPause,
	FaForward,
	FaBackward,
	FaPlus,
	FaMinus,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const playlist = [
	{
		title: "Blurry Nights",
		artist: "BoyWithUke",
		src: "/audio/blurry-nights.mp3",
	},
	{
		title: "Fairytale",
		artist: "Livingston",
		src: "/audio/fairytale.mp3",
	},
	{
		title: "Boomerang",
		artist: "Imagine Dragons",
		src: "/audio/boomerang.mp3",
	},
	{
		title: "Look Mum I Can Fly",
		artist: "Livingston",
		src: "/audio/look-mum-i-can-fly.mp3",
	},
	{
		title: "Cautionary Tales",
		artist: "Jon Bellion",
		src: "/audio/cautionary-tales.mp3",
	},
	{
		title: "The Unknown",
		artist: "Imagine Dragons",
		src: "/audio/the-unknown.mp3",
	},
	{
		title: "Woke The F*ck Up",
		artist: "Jon Bellion",
		src: "/audio/woke-the-fuck-up.mp3",
	},
	{
		title: "Like This",
		artist: "NF",
		src: "/audio/like-this.mp3",
	},
];

const Music = () => {
	const { hasInteracted } = useTheme();
	const audioRef = useRef(null);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedIndex = sessionStorage.getItem("music-currentIndex");
			const playing = sessionStorage.getItem("music-isPlaying");
			const expanded = sessionStorage.getItem("music-isExpanded");

			if (playing === null) {
				setIsPlaying(true); // First time visitor, default to playing
			} else {
				setIsPlaying(playing === "true");
			}

			// Random song if not saved
			if (savedIndex !== null) {
				setCurrentSongIndex(parseInt(savedIndex));
			} else {
				const randomIndex = Math.floor(Math.random() * playlist.length);
				setCurrentSongIndex(randomIndex);
			}

			// Default to expanded true
			if (expanded !== null) {
				setIsExpanded(expanded === "true");
			} else {
				setIsExpanded(true);
			}
		}
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (hasInteracted && isPlaying && audioRef.current) {
			audioRef.current.play().catch((e) => console.warn("Auto-play error:", e));
		}
	}, [hasInteracted, isPlaying, currentSongIndex]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.02;
		}
	}, []);

	// Save state on change
	useEffect(() => {
		if (!hydrated) return;
		sessionStorage.setItem("music-isPlaying", isPlaying);
		sessionStorage.setItem("music-currentIndex", currentSongIndex);
		sessionStorage.setItem("music-isExpanded", isExpanded);
	}, [isPlaying, currentSongIndex, isExpanded, hydrated]);

	const toggleExpand = () => setIsExpanded(!isExpanded);

	const togglePlay = () => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play().catch((e) => console.warn(e));
		}
		setIsPlaying(!isPlaying);
	};

	const playNext = () => {
		let nextIndex = (currentSongIndex + 1) % playlist.length;
		setCurrentSongIndex(nextIndex);
		setIsPlaying(true);
		setTimeout(() => audioRef.current.play(), 100);
	};

	const playPrev = () => {
		let prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
		setCurrentSongIndex(prevIndex);
		setIsPlaying(true);
		setTimeout(() => audioRef.current.play(), 100);
	};

	return (
		<motion.div
			className={`${styles.musicBox} ${isExpanded ? styles.expanded : ""}`}
			initial={{ x: "-100%", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ delay: 2, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}>
			<button onClick={toggleExpand}>
				{isExpanded ? <FaMinus /> : <FaPlus />}
			</button>

			<div
				className={`${styles.personImageContainer} ${
					isExpanded ? styles.expanded : styles.collapsed
				}`}>
				<img
					src='/images/radiobox.png'
					alt='Person with music player'
				/>
			</div>

			<audio
				ref={audioRef}
				src={playlist[currentSongIndex].src}
				onEnded={playNext}
				// autoPlay
			/>

			<div className={styles.visualizer}>
				{[0, 1, 2].map((i) => (
					<span
						key={i}
						className={`${styles.bar} ${isPlaying ? styles.playing : ""}`}
						style={{
							animationDelay: isPlaying ? `${i * 0.2}s` : "0s",
						}}
					/>
				))}
			</div>

			{isExpanded && (
				<div className={styles.songDetails}>
					<h4>{playlist[currentSongIndex].title}</h4>
					<p>{playlist[currentSongIndex].artist}</p>
				</div>
			)}

			{isExpanded && (
				<div className={styles.expandedContent}>
					<div onClick={playPrev}>
						<FaBackward />
					</div>
					<div onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</div>
					<div onClick={playNext}>
						<FaForward />
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default Music;
