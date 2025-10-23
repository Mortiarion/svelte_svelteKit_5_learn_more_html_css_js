<script lang="ts">
	import type { Explanation } from './explanations';

	let { items }: { items: Explanation } = $props();
</script>

<div class="space-y-6">
	<div>
		<h4 class="text-lg font-semibold text-blue-700 mb-2">HTML пояснення</h4>
		<ul class="list-disc space-y-2 pl-6 text-gray-700">
			{#each items.html as htmlItem}
				<li class="rounded p-2 hover:bg-blue-100 transition">{htmlItem}</li>
			{/each}
		</ul>
	</div>

	<div>
		<h4 class="text-lg font-semibold text-green-700 mb-2">CSS пояснення</h4>
		<ul class="list-disc space-y-2 pl-6 text-gray-700">
			{#each items.css as cssItem}
				<li class="rounded p-2 hover:bg-green-100 transition">{cssItem}</li>
			{/each}
		</ul>
	</div>
</div>
