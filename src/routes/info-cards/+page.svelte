<script lang="ts">
	import { gsap } from '$lib/gsap';
	import { onMount } from 'svelte';

	const steps = [
		{
			id: 'step1',
			title: '行為照顧',
			content: '貓咪需要定期的食物和水，清潔的環境以及愛和關懷。',
			img: '/care.jpg'
		},
		{
			id: 'step2',
			title: '環境飲食',
			content: '貓咪需要一個安全、舒適的居住環境。了解貓咪的飲食需求也是非常重要的。',
			img: '/food.jpg'
		},
		{
			id: 'step3',
			title: '醫療知識',
			content: '了解常見的貓咪疾病症狀和處理方法，並維護良好的衛生標準。',
			img: '/medical.jpg'
		}
	];

	onMount(() => {
		const tl = gsap.timeline();
		tl.from(
			steps.map((step) => `#${step.id}`),
			{
				duration: 1,
				x: '200%',
				opacity: 0,
				ease: 'power2.out',
				stagger: {
					amount: 0.5
				}
			}
		);
	});
</script>

<div class=" container h-full flex items-center justify-center space-x-10 m-auto">
	{#each steps as step}
		<div id={step.id} class=" w-[20rem]">
			<button class="card card-hover">
				<header>
					<img src={step.img} class="w-full h-64 object-cover brightness-[85%]" alt="Post" />
				</header>
				<div class="p-4 space-y-4">
					<h3 class="h3" data-toc-ignore>{step.title}</h3>
					<article>
						<p>
							{step.content}
						</p>
					</article>
				</div>
			</button>
		</div>
	{/each}
</div>
