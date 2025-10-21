<script lang="ts">
	let steps = [
		{
			title: "1. Основи стилів",
			desc: "Познайомимось з селекторами, властивостями та кольорами."
		},
		{
			title: "2. Гра з макетом",
			desc: "Flexbox, Grid і адаптив — зробимо дизайн зручним і гнучким."
		},
		{
			title: "3. Анімації та ефекти",
			desc: "Застосуємо переходи, keyframes, hover-ефекти, щоб оживити сторінку."
		}
	];
</script>

<section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 text-white px-6 py-20">

	<!-- 🔹 Анімований градієнт -->
	<div class="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-blue-500/20 to-cyan-500/20 animate-gradient opacity-50"></div>

	<!-- 🔹 Плаваючі фігури (показують креативність CSS) -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
		<div class="shape shape-1 bg-gradient-to-tr from-pink-400 to-purple-400"></div>
		<div class="shape shape-2 bg-gradient-to-tr from-blue-400 to-cyan-400"></div>
		<div class="shape shape-3 bg-gradient-to-tr from-yellow-400 to-pink-400"></div>
	</div>

	<!-- 🔹 Основний контент -->
	<div class="relative z-10 text-center max-w-3xl space-y-8">
		<h1 class="text-4xl sm:text-5xl font-bold">
			Опануй <span class="text-cyan-300">CSS</span> — стиль, колір і рух
		</h1>

		<p class="text-lg text-slate-100 leading-relaxed">
			Дізнайся, як створювати гармонійний дизайн, анімувати елементи та робити сайти привабливими.  
			Від перших стилів — до ефектних анімацій.
		</p>

		<div class="grid md:grid-cols-3 gap-6 pt-10">
			{#each steps as step}
				<div class="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-md hover:scale-105 hover:bg-white/20 transition-transform duration-300">
					<h2 class="text-xl font-semibold mb-3 text-cyan-300">{step.title}</h2>
					<p class="text-slate-200 text-sm">{step.desc}</p>
				</div>
			{/each}
		</div>

		<button
			class="mt-10 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full font-medium shadow-lg transition"
		>
			Почати навчання
		</button>
	</div>
</section>

<style>
	/* 🔸 Анімований градієнтний рух */
	@keyframes gradientMove {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}
	.animate-gradient {
		background-size: 200% 200%;
		animation: gradientMove 12s ease infinite;
	}

	/* 🔸 Плаваючі фігури */
	.shape {
		position: absolute;
		width: 180px;
		height: 180px;
		border-radius: 50%;
		filter: blur(40px);
		animation: floatShape 12s ease-in-out infinite alternate;
	}

	.shape-1 { top: 10%; left: 15%; animation-delay: 0s; }
	.shape-2 { bottom: 15%; right: 10%; animation-delay: 4s; }
	.shape-3 { top: 50%; left: 60%; animation-delay: 2s; }

	@keyframes floatShape {
		0% { transform: translateY(0) scale(1); }
		100% { transform: translateY(-30px) scale(1.2); }
	}
</style>
