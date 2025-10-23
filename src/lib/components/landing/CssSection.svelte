<script lang="ts">
	let steps = [
		{
			title: '1. Основи стилів',
			desc: 'Познайомимось з селекторами, властивостями та кольорами.'
		},
		{
			title: '2. Гра з макетом',
			desc: 'Flexbox, Grid і адаптив — зробимо дизайн зручним і гнучким.'
		},
		{
			title: '3. Анімації та ефекти',
			desc: 'Застосуємо переходи, keyframes, hover-ефекти, щоб оживити сторінку.'
		}
	];
</script>

<section
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 px-6 py-20 text-white"
>
	<!-- 🔹 Анімований градієнт -->
	<div
		class="animate-gradient absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-blue-500/20 to-cyan-500/20 opacity-50"
	></div>

	<!-- 🔹 Плаваючі фігури (показують креативність CSS) -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
		<div class="shape shape-1 bg-gradient-to-tr from-pink-400 to-purple-400"></div>
		<div class="shape shape-2 bg-gradient-to-tr from-blue-400 to-cyan-400"></div>
		<div class="shape shape-3 bg-gradient-to-tr from-yellow-400 to-pink-400"></div>
	</div>

	<!-- 🔹 Основний контент -->
	<div class="relative z-10 max-w-3xl space-y-8 text-center">
		<h1 class="text-4xl font-bold sm:text-5xl">
			Опануй <span class="text-cyan-300">CSS</span> — стиль, колір і рух
		</h1>

		<p class="text-lg leading-relaxed text-slate-100">
			Дізнайся, як створювати гармонійний дизайн, анімувати елементи та робити сайти привабливими.
			Від перших стилів — до ефектних анімацій.
		</p>

		<div class="grid gap-6 pt-10 md:grid-cols-3">
			{#each steps as step}
				<div
					class="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:bg-white/20"
				>
					<h2 class="mb-3 text-xl font-semibold text-cyan-300">{step.title}</h2>
					<p class="text-sm text-slate-200">{step.desc}</p>
				</div>
			{/each}
		</div>

		<a
			href="/css"
			class="mt-10 rounded-full bg-cyan-500 px-8 py-3 font-medium shadow-lg transition hover:bg-cyan-600"
		>
			Почати навчання
		</a>
	</div>
</section>

<style>
	/* 🔸 Анімований градієнтний рух */
	@keyframes gradientMove {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
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

	.shape-1 {
		top: 10%;
		left: 15%;
		animation-delay: 0s;
	}
	.shape-2 {
		bottom: 15%;
		right: 10%;
		animation-delay: 4s;
	}
	.shape-3 {
		top: 50%;
		left: 60%;
		animation-delay: 2s;
	}

	@keyframes floatShape {
		0% {
			transform: translateY(0) scale(1);
		}
		100% {
			transform: translateY(-30px) scale(1.2);
		}
	}
</style>
