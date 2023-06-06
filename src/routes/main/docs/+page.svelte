<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('asdfs');
		goto('/main/docs/care-basic-knowledge');
	});
</script>
