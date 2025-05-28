"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export const useLenisScroll = () => {
	useEffect(() => {
		const lenis = new Lenis({
			smooth: true,
			lerp: 0.2,
			autoResize: true,
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);
};
