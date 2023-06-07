<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import {
		doc,
		getDoc,
		collection,
		query,
		where,
		getDocs,
		deleteDoc,
		addDoc
	} from 'firebase/firestore';
	import { auth, db } from '$lib/firebase';
	import { onMount } from 'svelte';
	import Post from '$lib/components/Post.svelte';
	import type { IProfile } from '$lib/types/Profile';
	import { docStore, collectionStore, userStore } from 'sveltefire';
	import type { IThumb } from '$lib/types/IPost';

	export let id: string = '';
	export let title: string = '[title]';
	export let subtitle: string = '';
	export let content: string = '[content]';
	export let createDate: string = new Date().toLocaleDateString();
	export let authUid: string = '';

	const user = userStore(auth);

	let thumb_up_count = 0;
	let thumb_down_count = 0;

	const user_thumbs = collectionStore<IThumb>(
		db,
		query(collection(db, 'thumbs'), where('uid', '==', $user?.uid), where('postId', '==', id))
	);
	const thumb_ups = collectionStore<IThumb>(
		db,
		query(collection(db, 'thumbs'), where('postId', '==', id), where('isUp', '==', true))
	);
	const thumb_downs = collectionStore<IThumb>(
		db,
		query(collection(db, 'thumbs'), where('postId', '==', id), where('isUp', '==', false))
	);

	$: console.log($user_thumbs);

	$: thumb_up_count = $thumb_ups?.length;
	$: thumb_down_count = $thumb_downs?.length;
	$: is_user_up_thumbs = $user_thumbs?.filter((thumb) => thumb.isUp).length > 0;
	$: is_user_down_thumbs = $user_thumbs?.filter((thumb) => !thumb.isUp).length > 0;

	const toggleUp = async () => {
		if (is_user_up_thumbs) {
			// remove thumb
			const thumb = $user_thumbs?.filter((thumb) => thumb.isUp)[0];
			await deleteDoc(doc(db, 'thumbs', thumb.id));
		} else {
			// add thumb
			const thumb: IThumb = {
				uid: $user?.uid,
				postId: id,
				isUp: true
			};
			await addDoc(collection(db, 'thumbs'), thumb);
		}

		if (is_user_down_thumbs) {
			// remove thumb
			const thumb = $user_thumbs?.filter((thumb) => !thumb.isUp)[0];
			await deleteDoc(doc(db, 'thumbs', thumb.id));
		}
	};

	const toggleDown = async () => {
		if (is_user_down_thumbs) {
			// remove thumb
			const thumb = $user_thumbs?.filter((thumb) => !thumb.isUp)[0];
			await deleteDoc(doc(db, 'thumbs', thumb.id));
		} else {
			// add thumb
			const thumb: IThumb = {
				uid: $user?.uid,
				postId: id,
				isUp: false
			};
			await addDoc(collection(db, 'thumbs'), thumb);
		}

		if (is_user_up_thumbs) {
			// remove thumb
			const thumb = $user_thumbs?.filter((thumb) => thumb.isUp)[0];
			await deleteDoc(doc(db, 'thumbs', thumb.id));
		}
	};

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
		<footer class="flex justify-between items-center">
			<div class="p-4 flex justify-around items-center space-x-4">
				<Avatar src={authorProfile.photoURL} width="w-7" />
				<div class="flex-auto flex flex-col justify-center items-start">
					<div class=" font-semibold">By {authorProfile.displayName}</div>
					<small class=" text-xs">On {createDate}</small>
				</div>
			</div>

			<div class="p-4 space-x-4 flex">
				<div class={`text-center flex items-center rounded-lg space-x-2`}>
					<button
						on:click={() => toggleUp()}
						class={`btn-icon relative bottom-[1px] ${
							is_user_up_thumbs ? 'variant-filled-success' : 'hover:variant-filled-success'
						} `}
					>
						<i class="fa-regular fa-thumbs-up fa-xl" />
					</button>
					<small>{thumb_up_count.toLocaleString()}</small>
				</div>
				<div class={` text-center flex items-center rounded-lg px-2  space-x-2`}>
					<button
						on:click={() => toggleDown()}
						class={`btn-icon relative top-[1px] ${
							is_user_down_thumbs ? 'variant-filled-warning' : 'hover:variant-filled-warning'
						}`}
					>
						<i class=" fa-regular fa-thumbs-down fa-xl" />
					</button>
					<small>{thumb_down_count.toLocaleString()}</small>
				</div>
			</div>
		</footer>
	</div>
{/await}
