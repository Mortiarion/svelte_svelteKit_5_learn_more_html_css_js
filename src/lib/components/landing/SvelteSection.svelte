<script lang="ts">
	import { onMount } from "svelte";

	let steps = [
		{
			title: "1. Основи Svelte 5",
			desc: "Зрозуміємо реактивність через $state, $derived, $props і learn-by-doing підхід."
		},
		{
			title: "2. Робота з SvelteKit",
			desc: "Маршрути, сторінки, серверні дії (actions) та API — створимо повноцінний застосунок."
		},
		{
			title: "3. Практика проекту",
			desc: "Збудуємо власний дашборд або блог із збереженням даних і деплоєм."
		}
	];
</script>

<section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-orange-900 via-red-800 to-pink-700 text-white px-6 py-20">

	<!-- 🔥 Плаваючі символи Svelte -->
	<div class="absolute inset-0 opacity-10 select-none pointer-events-none font-mono text-orange-300">
		{#each Array(10) as _, i}
			<span
				class="absolute text-2xl animate-float"
				style={`top:${Math.random()*100}%; left:${Math.random()*100}%; animation-delay:${i}s`}
			>
				{['$state', '$derived', '$props', '+page.svelte', '+layout.ts', 'use:', 'action', 'load()', 'store', 'SSR'][Math.floor(Math.random()*10)]}
			</span>
		{/each}
	</div>

	<!-- 🔹 Реактивний glowing backdrop -->
	<div class="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-pink-400/20 to-red-500/20 animate-pulse opacity-50"></div>

	<!-- Основний контент -->
	<div class="relative z-10 text-center max-w-3xl space-y-8">
		<h1 class="text-4xl sm:text-5xl font-bold">
			Створи майбутнє з <span class="text-orange-400">Svelte 5</span> та <span class="text-pink-300">SvelteKit 🚀</span>
		</h1>

		<p class="text-lg text-slate-100 leading-relaxed">
			Ми поєднаємо всю силу HTML, CSS, JS і TypeScript у сучасному фреймворку,  
			щоб створити реальні, швидкі та елегантні веб-застосунки.
		</p>

		<div class="grid md:grid-cols-3 gap-6 pt-10">
			{#each steps as step}
				<div class="bg-white/10 border border-orange-400/20 rounded-2xl p-6 backdrop-blur-md hover:scale-105 hover:bg-white/20 transition-transform duration-300">
					<h2 class="text-xl font-semibold mb-3 text-orange-300">{step.title}</h2>
					<p class="text-slate-200 text-sm">{step.desc}</p>
				</div>
			{/each}
		</div>

		<button
			class="mt-10 px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-medium shadow-lg transition"
		>
			Почати навчання
		</button>
	</div>
</section>

<style>
	/* 🔸 Реактивна анімація “плаваючих понять” */
	@keyframes float {
		0% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(4deg); }
		100% { transform: translateY(0) rotate(0deg); }
	}
	.animate-float {
		animation: float 9s ease-in-out infinite;
	}
</style>
