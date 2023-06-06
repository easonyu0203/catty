<script lang="ts">
	import { page } from '$app/stores';
	import { AppShell } from '@skeletonlabs/skeleton';

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');

	const docs_sections = [
		{
			section: '行為照顧',
			pages: [
				{ title: '基本照顧知識', path: 'care-basic-knowledge' },
				{ title: '照顧適應', path: 'care-adaptation' },
				{ title: '收養照顧', path: 'care-adopt' }
			]
		},
		{
			section: '環境飲食',
			pages: [
				{ title: '環境捕捉', path: 'env-capture' },
				{ title: '飲食環境', path: 'env-food' },
				{ title: '環境準備', path: 'env-environment-preparation' }
			]
		},
		{
			section: '醫療照顧',
			pages: [
				{ title: '貓疫苗', path: 'cat-vaccine' },
				{ title: '貓愛滋病', path: 'cat-aids' },
				{ title: '健康檢查', path: 'health-examination' }
			]
		}
	];
</script>

<AppShell slotSidebarLeft=" p-4 border-r-2 border-primary-300 bg-surface-100-800-token w-56">
	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav space-y-2">
			{#each docs_sections as doc_section}
				<h4 class="h4">{doc_section.section}</h4>
				<ul>
					{#each doc_section.pages as page}
						<li>
							<a href={`/main/docs/${page.path}`}>
								<div class="flex-auto">{page.title}</div>
							</a>
						</li>
					{/each}
				</ul>
				<hr class="py-4" />
			{/each}
		</nav>
	</svelte:fragment>
	<slot />
</AppShell>
