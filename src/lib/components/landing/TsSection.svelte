<script lang="ts">
	import { onMount } from "svelte";

	let steps = [
		{
			title: "1. Основи TypeScript",
			desc: "Зрозуміємо типи, інтерфейси, функції, класи та generics."
		},
		{
			title: "2. Перетворення коду",
			desc: "Навчимося додавати типи у JavaScript-проекти, щоб уникати помилок."
		},
		{
			title: "3. Практика з Svelte",
			desc: "Інтегруємо TypeScript у SvelteKit і створимо надійні компоненти."
		}
	];
</script>

<section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-950 via-sky-900 to-indigo-900 text-white px-6 py-20">

	<!-- 🔹 Анімована сітка -->
	<div class="absolute inset-0 bg-grid opacity-[0.05]"></div>

	<!-- 🔹 Плаваючі “типи” -->
	<div class="absolute inset-0 opacity-10 select-none pointer-events-none font-mono text-blue-300">
		{#each Array(10) as _, i}
			<span
				class="absolute text-2xl animate-float"
				style={`top:${Math.random()*100}%; left:${Math.random()*100}%; animation-delay:${i}s`}
			>
				{['type', 'interface', 'extends', 'T', 'number', 'string', 'Record', 'Partial'][Math.floor(Math.random()*8)]}
			</span>
		{/each}
	</div>

	<!-- 🔹 Основний контент -->
	<div class="relative z-10 text-center max-w-3xl space-y-8">
		<h1 class="text-4xl sm:text-5xl font-bold">
			Пиши надійний код з <span class="text-sky-400">TypeScript 🧠</span>
		</h1>

		<p class="text-lg text-slate-200 leading-relaxed">
			TypeScript допоможе тобі мислити як інженер: передбачати помилки, документувати код і створювати міцні програми.  
			Крок за кроком навчимося типізувати логіку й компоненти.
		</p>

		<div class="grid md:grid-cols-3 gap-6 pt-10">
			{#each steps as step}
				<div class="bg-white/10 border border-sky-400/20 rounded-2xl p-6 backdrop-blur-md hover:scale-105 hover:bg-white/20 transition-transform duration-300">
					<h2 class="text-xl font-semibold mb-3 text-sky-400">{step.title}</h2>
					<p class="text-slate-200 text-sm">{step.desc}</p>
				</div>
			{/each}
		</div>

		<button
			class="mt-10 px-8 py-3 bg-sky-500 hover:bg-sky-600 rounded-full font-medium shadow-lg transition"
		>
			Почати навчання
		</button>
	</div>
</section>

<style>
	/* 🧠 Анімована сітка (background-grid pattern) */
	.bg-grid {
		background-image: linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 40px 40px;
		animation: gridMove 15s linear infinite;
	}

	@keyframes gridMove {
		0% { background-position: 0 0; }
		100% { background-position: 40px 40px; }
	}

	/* 🔹 Плаваючі елементи типів */
	@keyframes float {
		0% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(3deg); }
		100% { transform: translateY(0) rotate(0deg); }
	}
	.animate-float {
		animation: float 10s ease-in-out infinite;
	}
</style>
