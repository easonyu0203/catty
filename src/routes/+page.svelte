<script lang="ts">
	import { gsap, ScrollTrigger } from '$lib/gsap';
	import { onMount } from 'svelte';

	const intro_speechs = [
		{ id: 'line0', content: 'let Save Stray Cat' },
		{ id: 'line1', content: 'With a little love' },
		{ id: 'line2', content: 'Help them, Help us' }
	];

	onMount(() => {
		// const tl = gsap.timeline();
		// intro_speechs.forEach((speech, index) => {
		// 	tl.from(`#${speech.id}`, {
		// 		duration: 1,
		// 		y: '200%'
		// 	});
		// });
		// tl.from('#gif', {
		// 	duration: 1,
		// 	opacity: 0
		// });
		// tl.delay(1);
		// tl.from('#start_btn', {
		// 	duration: 1,
		// 	x: 200
		// });
	});
</script>

<div
	id="section0"
	class="container h-full mx-auto flex flex-col justify-center items-center space-y-3 relative"
>
	{#each intro_speechs as speech}
		<div class=" overflow-hidden p-2">
			<h1 id={speech.id} class="h1">{speech.content}</h1>
		</div>
	{/each}

	<div id="gif" class="absolute overflow-hidden h-[98%]" style="z-index: -1;">
		<img class=" opacity-90" src="/cat1.gif" alt="Animation GIF" />
	</div>

	<div id="start_btn" class=" pt-36">
		<button class="btn variant-filled"> <h2 class="h2">LET'S START</h2></button>
	</div>
</div>
