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
</script>

<Modal />
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
							<button on:click={() => handleSignOut()} class="btn btn-sm variant-ghost-surface">
								登出
							</button>
							<Avatar
								width="w-8"
								src={user.photoURL ? user.photoURL : ''}
								initials={user.displayName ? user.displayName[0] : 'U'}
							/>
							<div slot="signedOut">
								<button
									on:click={() => handleSignInWithGoogle()}
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
