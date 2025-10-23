<script lang="ts">
	let { onClick, label, ariaLabel }: { onClick?: () => void; label: string; ariaLabel: string } =
		$props();
</script>

<button
	on:click={onClick}
	class="rounded bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
	aria-label={ariaLabel}
	on:keydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') onClick?.();
	}}
>
	{label}
</button>

<style lang="postcss">
	@reference "tailwindcss";
</style>
