import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin.js';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

export * from 'gsap';
export { ScrollTrigger };
