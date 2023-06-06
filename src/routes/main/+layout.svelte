<script lang="ts">
	import { AppShell, AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	let currentTile: number = 0;
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail
			border="border-r-2 border-primary-300"
			background="bg-surface-100-800-token"
			width="w-24"
		>
			<AppRailAnchor
				href="/info-cards"
				selected={$page.url.pathname === '/info-cards' || $page.url.pathname.includes('/docs')}
				bind:group={currentTile}
				name="tile-1"
				value={0}
			>
				<svelte:fragment slot="lead">
					<div class="flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="36"
							height="36"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-file-text"
							><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline
								points="14 2 14 8 20 8"
							/><line x1="16" y1="13" x2="8" y2="13" /><line
								x1="16"
								y1="17"
								x2="8"
								y2="17"
							/><polyline points="10 9 9 9 8 9" /></svg
						>
					</div>
				</svelte:fragment>
				<span>Docs</span>
			</AppRailAnchor>
			<AppRailAnchor href="/" bind:group={currentTile} name="tile-2" value={1}>
				<svelte:fragment slot="lead">
					<div class="flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="36"
							height="36"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-users"
							><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle
								cx="9"
								cy="7"
								r="4"
							/><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg
						>
					</div>
				</svelte:fragment>
				<span>AI Helper</span>
			</AppRailAnchor>
			<AppRailAnchor href="/" bind:group={currentTile} name="tile-3" value={2}>
				<svelte:fragment slot="lead">
					<div class="flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="36"
							height="36"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-message-square"
							><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg
						>
					</div>
				</svelte:fragment>
				<span>Chat</span>
			</AppRailAnchor>
		</AppRail>
	</svelte:fragment>
	<slot />
</AppShell>
