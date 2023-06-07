<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
	import { auth, db } from '$lib/firebase';
	import { onMount } from 'svelte';
	import Post from '$lib/components/Post.svelte';
	import type { IProfile } from '$lib/types/Profile';

	export let title: string = '[title]';
	export let subtitle: string = '';
	export let content: string = '[content]';
	export let createDate: string = new Date().toLocaleDateString();
	export let authUid: string = '';

	const getPostAsync = async () => {
		const q = query(collection(db, 'profiles'), where('uid', '==', authUid));
		const querySnapshot = await getDocs(q);
		const profile = querySnapshot.docs[0].data() as IProfile;

		return profile;
	};

	let promise = getPostAsync();
</script>

{#await promise}
	<section class="card w-full">
		<div class="p-4 space-y-4">
			<div class="placeholder" />
			<div class="grid grid-cols-3 gap-8">
				<div class="placeholder" />
				<div class="placeholder" />
				<div class="placeholder" />
			</div>
			<div class="grid grid-cols-4 gap-4">
				<div class="placeholder" />
				<div class="placeholder" />
				<div class="placeholder" />
				<div class="placeholder" />
			</div>
		</div>
	</section>
{:then authorProfile}
	<div class="card card-hover overflow-hidden">
		<header>
			<!-- {#if imgSrc !== ''}
				<img src={imgSrc} class="bg-black/50 w-full object-cover" alt={imgAlt} />
			{/if} -->
		</header>
		<div class="p-4 space-y-4">
			<h3 class="h3" data-toc-ignore>{title}</h3>
			{#if subtitle !== ''}
				<h6 class="h6">{subtitle}</h6>
			{/if}
			<article>
				<p>
					{content}
				</p>
			</article>
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-start items-center space-x-4">
			<Avatar src={authorProfile.photoURL} width="w-7" />
			<div class="flex-auto flex justify-between items-center">
				<p class=" font-semibold">By {authorProfile.displayName}</p>
				<small>On {createDate}</small>
			</div>
		</footer>
	</div>
{/await}
