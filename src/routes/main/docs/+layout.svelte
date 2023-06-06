<script lang="ts">
	import { page } from '$app/stores';
	import { AppShell } from '@skeletonlabs/skeleton';

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!variant-filled-primary' : '';

	const docs_sections = [
		{
			section: '行為照顧',
			pages: [
				{ title: '流浪貓基本知識與照顧', path: 'care-basic-knowledge' },
				{ title: '收養管道與選擇', path: 'care-adaptation' },
				{ title: '剛到新家適應問題', path: 'care-new-home' },
				{ title: '野貓親人訓練', path: 'care-human-interact' }
			]
		},
		{
			section: '環境飲食',
			pages: [
				{ title: '養貓用品準備', path: 'env-cat-item-prepare' },
				{ title: '養貓環境準備', path: 'env-prepare' },
				{ title: '飲食建議', path: 'food-suggestion' },
				{ title: '用捕誘因與方法', path: 'food-catch-ways' }
			]
		},
		{
			section: '醫療照顧',
			pages: [
				{ title: '流浪貓收養前健康檢查', path: 'cat-pre-test' },
				{ title: '貓咪例行疫苗施打', path: 'cat-vaccine' },
				{ title: '例行驅蟲與常見寄生蟲', path: 'cat-bug' },
				{ title: '貓愛滋與貓白血病', path: 'cat-aids' }
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
							<a class={classesActive(`/main/docs/${page.path}`)} href={`/main/docs/${page.path}`}>
								{page.title}
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
