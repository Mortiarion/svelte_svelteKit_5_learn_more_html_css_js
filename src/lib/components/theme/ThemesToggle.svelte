<script lang="ts">
	import { theme } from '$lib/stores/theme';

	// Use Svelte's auto-subscription: reference $theme directly (do not declare it)
	function toggleTheme() {
		theme.set($theme === 'dark' ? 'light' : 'dark');
	}
</script>

<button
	onclick={toggleTheme}
	class="rounded-xl bg-gray-200"
	aria-label="Toggle theme"
>
	{#if $theme === 'dark'}
		🌙
	{:else}
		☀️
	{/if}
</button>
