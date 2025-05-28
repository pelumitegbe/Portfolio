"use client";
import { useLenisScroll } from "@/utils/lenis";

export const SmoothScrollProvider = ({ children }) => {
	useLenisScroll();
	return <>{children}</>;
};
