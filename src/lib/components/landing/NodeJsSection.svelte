<script lang="ts">
	let steps = [
		{
			title: "1. Основи Node.js",
			desc: "Розберемо як працює JavaScript поза браузером, модулі, файлову систему та потоки."
		},
		{
			title: "2. Express.js та сервери",
			desc: "Створимо сервер, який обробляє запити, маршрути, API та відповіді."
		},
		{
			title: "3. Робота з базою даних",
			desc: "Підключимо PostgreSQL або MongoDB та навчимося працювати з даними через ORM."
		}
	];
</script>

<section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-green-900 text-green-300 px-6 py-20">

	<!-- 💻 Плаваючі слова терміналу -->
	<div class="absolute inset-0 text-green-500/20 font-mono select-none pointer-events-none">
		{#each Array(12) as _, i}
			<span
				class="absolute text-sm md:text-lg animate-terminal"
				style={`top:${Math.random()*100}%; left:${Math.random()*100}%; animation-delay:${i}s`}
			>
				{[
					'node server.js',
					'import express from "express";',
					'await fetch("/api/data")',
					'fs.readFile()',
					'res.json({ ok: true })',
					'npm install',
					'console.log("Server running")',
					'async/await',
					'http.createServer()',
					'process.env.PORT'
				][Math.floor(Math.random()*10)]}
			</span>
		{/each}
	</div>

	<!-- 🔹 Неонове світіння фону -->
	<div class="absolute inset-0 bg-gradient-to-tl from-green-600/20 via-emerald-500/10 to-black/30 blur-2xl opacity-60 animate-pulse"></div>

	<!-- Контент -->
	<div class="relative z-10 text-center max-w-3xl space-y-8">
		<h1 class="text-4xl sm:text-5xl font-bold text-green-400">
			Поринь у серверну магію <span class="text-emerald-300">Node.js ⚙️</span>
		</h1>

		<p class="text-lg text-green-200 leading-relaxed">
			Ти навчишся створювати сервери, обробляти запити, працювати з файлами та базами даних,  
			і зрозумієш як оживає бекенд сучасних застосунків.
		</p>

		<div class="grid md:grid-cols-3 gap-6 pt-10">
			{#each steps as step}
				<div class="bg-green-950/50 border border-green-500/30 rounded-2xl p-6 backdrop-blur-md hover:scale-105 hover:bg-green-800/20 transition-transform duration-300">
					<h2 class="text-xl font-semibold mb-3 text-green-400">{step.title}</h2>
					<p class="text-green-200 text-sm">{step.desc}</p>
				</div>
			{/each}
		</div>

		<button
			class="mt-10 px-8 py-3 bg-green-600 hover:bg-green-700 rounded-full font-medium shadow-lg transition"
		>
			Почати навчання
		</button>
	</div>
</section>

<style>
	@keyframes terminal {
		0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
		50% { transform: translateY(-10px) rotate(1deg); opacity: 0.8; }
		100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
	}
	.animate-terminal {
		animation: terminal 12s ease-in-out infinite;
	}
</style>
