<script lang="ts">
	import type { IPostFormData } from '$lib/types/IPost';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';

	// Form Data
	const formData: IPostFormData = {
		title: '',
		subtitle: '',
		content: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>標題(必填)</span>
				<input
					class="input outline-none p-2"
					required
					type="text"
					bind:value={formData.title}
					placeholder="標題..."
				/>
			</label>
			<label class="label">
				<span>副標題</span>
				<input
					class="input outline-none p-2"
					type="text"
					bind:value={formData.subtitle}
					placeholder="副標題..."
				/>
			</label>
			<label class="label">
				<span>內容(必填)</span>
				<textarea
					bind:value={formData.content}
					class="input outline-none p-2"
					required={true}
					name="prompt"
					id="prompt"
					placeholder="文章內容..."
					rows="5"
				/>
			</label>
		</form>
		<slot />
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<button
				class="btn {parent.buttonPositive}"
				disabled={formData.title === '' || formData.content === ''}
				on:click={onFormSubmit}>Submit Form</button
			>
		</footer>
	</div>
{/if}
