<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
	import { db, auth } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { FirebaseApp, Collection, userStore } from 'sveltefire';
	import Post from '$lib/components/Post.svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import FormModal from '$lib/components/FormModal.svelte';
	import type { IPost, IPostFormData } from '$lib/types/IPost';

	const user = userStore(auth);

	function modalComponentForm(): void {
		const c: ModalComponent = { ref: FormModal };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: '分享你的故事',
			body: '寫下你的心路歷程，幫助彼此',
			response: (formData: IPostFormData) => handleSubmitPost(formData)
		};
		modalStore.trigger(modal);
	}

	async function handleSubmitPost(formData: IPostFormData) {
		const post: IPost = {
			authorUid: $user!.uid,
			title: formData.title,
			subtitle: formData.subtitle,
			content: formData.content,
			createDate: new Date().toLocaleDateString(),
			timestamp: serverTimestamp()
		};

		// store to firestore
		const docRef = await addDoc(collection(db, 'posts'), post);
	}
</script>

<FirebaseApp {auth} firestore={db}>
	<div class="flex flex-col items-center justify-center pt-10 container h-full">
		<div>
			<button
				on:click={() => modalComponentForm()}
				type="button"
				class=" w-[28rem] btn variant-filled-primary">分享你的事</button
			>
		</div>
		<div class="flex flex-grow flex-col space-y-2 w-[38rem] m-auto p-8">
			<Collection ref={'posts'} let:data={posts}>
				{#each posts as post}
					<Post
						authUid={post.authorUid}
						title={post.title}
						subtitle={post.subtitle}
						content={post.content}
						createDate={post.createDate}
					/>
				{/each}
			</Collection>
		</div>
	</div>
</FirebaseApp>
