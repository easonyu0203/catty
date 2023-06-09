<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		LightSwitch,
		Avatar,
		AppRail,
		AppRailAnchor,
		AppRailTile
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { db, auth, handleSignInWithGoogle, handleSignOut } from '$lib/firebase';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { FirebaseApp, User } from 'sveltefire';
	import { setModeUserPrefers, setModeCurrent } from '@skeletonlabs/skeleton';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const loginToast: ToastSettings = {
		message: 'Login successfully!',
		background: 'variant-filled-success'
	};
	const loginFailedToast: ToastSettings = {
		message: 'Login Error!',
		background: 'variant-filled-error'
	};
	const logoutToast: ToastSettings = {
		message: 'Logout successfully!',
		background: 'variant-filled-success'
	};
	const logoutFailToast: ToastSettings = {
		message: 'Logout Error!',
		background: 'variant-filled-error'
	};

	setModeUserPrefers(true);
</script>

<Modal />
<Toast />

<FirebaseApp {auth} firestore={db}>
	<AppShell>
		<svelte:fragment slot="header">
			<AppBar border="border-b-2 border-primary-300">
				<svelte:fragment slot="lead">
					<strong class="text-xl uppercase"><a href="/">浪我遇見貓</a></strong>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<LightSwitch />
					<div class=" flex items-center">
						<a
							class="btn-icon btn-sm bg-initial"
							href="https://www.instagram.com/emt_tough"
							target="_blank"
							rel="noreferrer"
						>
							<i class="fa-brands fa-instagram fa-xl" />
						</a>
						<a
							class="btn-icon btn-sm bg-initial"
							href="https://github.com/easonyu0203/catty"
							target="_blank"
							rel="noreferrer"
						>
							<i class="fa-brands fa-github fa-xl" />
						</a>
					</div>
					<div class=" flex space-x-3 pl-2">
						<User let:user>
							<button
								on:click={() => {
									try {
										handleSignOut();
									} catch (error) {
									} finally {
										if (user) {
											toastStore.trigger(logoutFailToast);
										} else {
											toastStore.trigger(logoutToast);
										}
									}
								}}
								class="btn btn-sm variant-ghost-surface"
							>
								登出
							</button>
							<Avatar
								width="w-8"
								src={user.photoURL ? user.photoURL : ''}
								initials={user.displayName ? user.displayName[0] : 'U'}
							/>
							<div slot="signedOut">
								<button
									on:click={async () => {
										try {
											await handleSignInWithGoogle();
										} catch (error) {
										} finally {
										}
									}}
									class="btn btn-sm variant-ghost-surface"
								>
									登入
								</button>
							</div>
						</User>
					</div>
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<slot />
	</AppShell>
</FirebaseApp>
