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
					<i class="fa-solid fa-book fa-2xl" />
				</svelte:fragment>
				<div class="pt-1">
					<span>知識庫</span>
				</div>
			</AppRailAnchor>
			<AppRailAnchor href="/" bind:group={currentTile} name="tile-2" value={1}>
				<svelte:fragment slot="lead">
					<i class="fa-solid fa-users fa-2xl" />
				</svelte:fragment>
				<div class="pt-1">
					<span>AI 幫手</span>
				</div>
			</AppRailAnchor>
			<AppRailAnchor href="/" bind:group={currentTile} name="tile-3" value={2}>
				<svelte:fragment slot="lead">
					<i class="fa-regular fa-comments fa-2xl" />
				</svelte:fragment>
				<div class="pt-1">
					<span>論壇</span>
				</div>
			</AppRailAnchor>
		</AppRail>
	</svelte:fragment>
	<slot />
</AppShell>
