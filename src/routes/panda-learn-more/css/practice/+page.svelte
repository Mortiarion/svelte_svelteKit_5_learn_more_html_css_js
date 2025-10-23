<script lang="ts">
	import { fade } from 'svelte/transition';
	import ExplanationList from './components/ExplanationList.svelte';
	import { explanations } from './components/explanations';

	let { data, form }: { data: any; form: any } = $props();

	const examples = {
		header: {
			html: `<header>
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
			css: `header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #f0f9ff;
	padding: 10px 20px;
	border-radius: 10px;
	border: 2px solid #93c5fd;
}

header img {
	height: 40px;
}

header nav ul {
	display: flex;
	gap: 20px;
	list-style: none;
	margin: 0;
	padding: 0;
}

header nav a {
	color: #1e40af;
	font-weight: 600;
	text-decoration: none;
}

header nav a:hover {
	text-decoration: underline;
}

select, button {
	border: 1px solid #93c5fd;
	padding: 5px 8px;
	border-radius: 6px;
	background: white;
}

button img {
	height: 24px;
}`
		},

		form: {
			html: `<form>
	<label>Ім'я:</label>
	<input type="text" placeholder="Введи ім’я">
	<button>Відправити</button>
</form>`,
			css: `form {
	display: flex;
	flex-direction: column;
	gap: 10px;
	max-width: 250px;
	padding: 20px;
	background-color: #eff6ff;
	border: 2px solid #93c5fd;
	border-radius: 12px;
}

input {
	padding: 8px;
	border: 1px solid #a5b4fc;
	border-radius: 6px;
}

input:focus {
	outline: none;
	border-color: #4338ca;
}

button {
	background: linear-gradient(to right, #3b82f6, #2563eb);
	color: white;
	padding: 8px 12px;
	border: none;
	border-radius: 6px;
	font-weight: 600;
	transition: transform 0.2s;
}

button:hover {
	transform: scale(1.05);
}`
		}
	} as const;

	let selectedExample = $state<keyof typeof examples>('header');
	let editableHtml = $state(examples[selectedExample].html);
	let editableCss = $state(examples[selectedExample].css);

	let isValidHtml = $state(true);

	// при зміні прикладу оновлюємо поля
	$effect(() => {
		editableHtml = examples[selectedExample].html;
		editableCss = examples[selectedExample].css;
	});

	// перевірка на валідність
	$effect(() => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(editableHtml, 'text/html');
		isValidHtml = doc.body.innerHTML.trim().length > 0 && !editableHtml.includes('<script');
	});

	function resetExample() {
		editableHtml = examples[selectedExample].html;
		editableCss = examples[selectedExample].css;
	}
</script>

<svelte:head>
	<title>Вивчення HTML + CSS</title>
</svelte:head>

<div class="p-8 max-w-5xl mx-auto bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen rounded-xl shadow-lg">
	<h1 class="text-4xl font-extrabold text-center text-blue-800 mb-8">
		Вивчення HTML і CSS на прикладах
	</h1>

	<div class="bg-white shadow-sm p-6 rounded-xl mb-8">
		<label class="block mb-3 text-lg font-semibold text-gray-700">Обери приклад:</label>
		<select
			bind:value={selectedExample}
			class="mb-6 border-2 border-blue-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
		>
			<option value="header">Хедер</option>
			<option value="form">Форма</option>
		</select>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<h3 class="text-lg font-semibold mb-2 text-blue-700">HTML</h3>
				<textarea
					bind:value={editableHtml}
					class="w-full h-52 border-2 rounded-lg p-3 font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 transition resize-none
					{isValidHtml ? 'border-blue-200 focus:ring-blue-300' : 'border-red-500 focus:ring-red-400'}"
				></textarea>
			</div>

			<div>
				<h3 class="text-lg font-semibold mb-2 text-blue-700">CSS</h3>
				<textarea
					bind:value={editableCss}
					class="w-full h-52 border-2 border-blue-200 rounded-lg p-3 font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
				></textarea>
			</div>
		</div>

		<div class="flex justify-end mt-4">
			<button
				onclick={resetExample}
				class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow hover:shadow-lg hover:scale-105 active:scale-95 transition"
			>
				Скинути
			</button>
		</div>
	</div>

	<div class="bg-white shadow-md rounded-xl p-6 mb-8">
		<h2 class="text-2xl font-bold mb-4 text-blue-700">Результат:</h2>
		{#if isValidHtml}
			<div class="border-2 border-blue-100 rounded-xl p-6 bg-gray-50 transition-all relative overflow-hidden" transition:fade>
				<style>{@html editableCss}</style>
				{@html editableHtml}
			</div>
		{:else}
			<p class="text-red-600 text-sm">Невалідний HTML</p>
		{/if}
	</div>

	<div class="bg-blue-50 rounded-xl border-l-4 border-blue-400 p-6 shadow-sm">
		<h3 class="text-xl font-semibold mb-3 text-blue-800">Пояснення:</h3>
		<ExplanationList items={explanations[selectedExample]} />
	</div>
</div>
