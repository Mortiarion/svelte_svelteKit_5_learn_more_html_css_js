<script lang="ts">
	import { explanations } from './components/explanations';
	import StyledButton from './components/StyledButton.svelte';
	import ExplanationList from './components/ExplanationList.svelte';
	import { fade } from 'svelte/transition';


	let { data, form }: { data: any; form: any } = $props();

	const examples = {
		header: `<header>
    <img src="logo.png" alt="Логотип сайту">

    <nav>
        <ul>
            <li><a href="/">Домашня</a></li>
            <li><a href="/about">Про нас</a></li>
            <li><a href="/contact">Контакти</a></li>
        </ul>
    </nav>

    <select>
        <option value="uk">Українська</option>
        <option value="en">English</option>
    </select>

    <button>
        <img src="user.png" alt="Іконка користувача">
    </button>

</header>`,
    
		form: `<form><label>Ім'я:</label><input type="text"><button>Відправити</button></form>`
	} as const;

	let selectedExample = $state<keyof typeof examples>('header');
	let editableHtml = $state(examples[selectedExample]);
	let isValidHtml = $state(true);

	// оновлення editableHtml при виборі прикладу
	$effect(() => {
		editableHtml = examples[selectedExample];
	});

	// покращена валідація HTML
	$effect(() => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(editableHtml, 'text/html');
		isValidHtml = doc.body.innerHTML.trim().length > 0 && !editableHtml.includes('<script');
	});

	function resetHtml() {
		editableHtml = examples[selectedExample];
	}
</script>

<svelte:head>
    <title>Вивчення на прикладах з поясненням HTML</title>
</svelte:head>

<div class="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
	<h1 class="text-3xl font-bold text-center mb-6">Вивчення HTML</h1>

	<label for="example" class="block mb-2 text-lg font-medium">Обери приклад:</label>
	<select id="example" bind:value={selectedExample} class="mb-6 border rounded p-2">
		<option value="header">Хедер</option>
		<option value="form">Форма</option>
	</select>

	<textarea
		bind:value={editableHtml}
		class="w-full h-40 border rounded p-2 font-mono text-sm {isValidHtml ? 'border-gray-300' : 'border-red-500'}"
	></textarea>

	<div class="flex justify-end my-2">
        <button
            onclick={resetHtml}
        >
            Скинути
        </button>
	</div>

	<h2 class="text-2xl font-semibold mt-6 mb-2">Результат:</h2>
	{#if isValidHtml}
		<div class="border rounded p-4 bg-white" transition:fade aria-live="polite">
			{@html editableHtml}
		</div>
	{:else}
		<p class="text-red-600 text-sm">Невалідний HTML</p>
	{/if}

	<div class="bg-blue-50 rounded p-4 mt-6">
		<h3 class="text-lg font-medium mb-2">Пояснення:</h3>
		<ExplanationList items={explanations[selectedExample]} />
	</div>
</div>

