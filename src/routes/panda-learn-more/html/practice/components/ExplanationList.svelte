<script lang="ts">
	type Explanation = {
		tag: string;
		desc: string;
		semantics: string;
		attributes: string;
		example: string;
	};
	let { items }: { items: Explanation[] } = $props();
</script>

<ul class="list-disc space-y-4 pl-6 text-gray-700">
	{#each items as { tag, desc, semantics, attributes, example }}
		<li class="rounded p-2 transition duration-200 hover:bg-blue-100" role="listitem">
			<strong class="block text-gray-800">{tag}</strong>
			<p><strong>Призначення:</strong> {desc}</p>
			<p><strong>Семантика:</strong> {semantics}</p>
			<p><strong>Атрибути:</strong> {@html attributes}</p>
			<p><strong>Приклад:</strong> {@html example}</p>
		</li>
	{/each}
</ul>
