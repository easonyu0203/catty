<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { gsap } from '$lib/gsap';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const steps = [
		{
			id: 'step0',
			header: '照顧流浪貓的基本知識',
			content:
				'流浪貓是許多城市中常見的現象。這些無家可歸的貓咪經常面臨著飢餓、寒冷和疾病的困境。作為動物愛好者和關懷者，我們可以採取積極的行動，幫助這些可憐的生物。其中一種方式就是收養流浪貓，給予他們一個溫暖和愛的家。然而，在收養流浪貓之前，我們必須先具備基本的貓咪照顧知識。以下是三個重要的基本知識，讓我們一起來了解。'
		},
		{
			id: 'step1',
			header: '提供舒適環境和適當飲食',
			content:
				'我們要了解如何照顧貓咪。貓咪需要定期的食物和水，清潔的環境以及愛和關懷。為貓提供均衡的飲食，定期清潔貓砂盆，定期刷洗貓毛，以及提供適當的玩具和伴侶，是照顧貓咪的基本要點。'
		},
		{
			id: 'step2',
			header: '安全居住與飲食需求',
			content:
				'環境和飲食也很重要。貓咪需要一個安全、舒適的居住環境。提供一個適當大小的貓窩，給予他們一個屬於自己的空間。此外，了解貓咪的飲食需求也是非常重要的。不同年齡和健康狀況的貓咪可能需要不同種類的食物和飲食頻率。'
		},
		{
			id: 'step2',
			header: '醫療相關知識：生病時的處理方法和預防措施',
			content:
				'當貓咪生病時應該怎麼辦。預防和保持貓咪的健康狀態是非常重要的。帶貓咪定期檢查並接種疫苗，以防止常見的疾病。同時，了解一些常見的貓咪疾病症狀和處理方法，並維護良好的衛生標準，將有助於提供最佳的醫療照護。'
		},
		{
			id: 'step2',
			header: '學習基本知識，給予流浪貓安全和溫暖的家',
			content:
				'在收養流浪貓之前，學習並掌握這些基本知識是非常重要的。透過正確的照顧和關愛，我們可以給予流浪貓們一個安全和溫暖的家，並幫助他們改善生活品質。讓我們一起行動起來，為這些可愛的生物帶來改變。'
		}
	];

	onMount(() => {
		const tl = gsap.timeline();

		for (let i = 0; i < 3; i++) {
			tl.from(`#intro${i}`, {
				duration: 0.1,
				height: 0
			})
				.from(`#intro${i}`, {
					duration: 1,
					opacity: 0
				})
				.delay(1)
				.to(`#intro${i}`, {
					duration: 1,
					opacity: 0
				})
				.to(`#intro${i}`, {
					duration: 0.1,
					height: 0
				});
		}

		tl.delay(0.2).from('#steps', {
			duration: 1,
			opacity: 0,
			y: 200
		});
	});

	const finish_steps = () => {
		gsap
			.timeline()
			.to('#steps', {
				duration: 1,
				opacity: 0,
				y: -200
			})
			.to('#steps', {
				duration: 0.1,
				height: 0,
				onComplete: () => {
					goto('/info-cards');
				}
			});
	};
</script>

<div class=" container h-full flex flex-col items-center justify-center m-auto">
	<div class=" flex flex-col space-y-4">
		<div class=" overflow-hidden">
			<h1 id="intro0" class="h1">想要幫助貓咪~想養貓貓~</h1>
		</div>
		<div class=" overflow-hidden">
			<h1 id="intro1" class="h1">可是...什麼都不懂</h1>
		</div>
		<div class=" overflow-hidden">
			<h1 id="intro2" class="h1">別擔心！讓我們來教你!</h1>
		</div>
	</div>
	<div id="steps" class=" w-[50%] max-w-3xl">
		<Stepper on:complete={finish_steps}>
			{#each steps as step}
				<Step>
					<svelte:fragment slot="header">{step.header}</svelte:fragment>
					{step.content}
				</Step>
			{/each}
		</Stepper>
	</div>
</div>
