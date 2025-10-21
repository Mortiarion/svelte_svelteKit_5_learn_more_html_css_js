<script lang="ts">
	import { onMount } from 'svelte';

	let steps = [
		{
			title: "1. Основи JavaScript",
			desc: "Зрозуміємо змінні, типи даних, оператори, функції та умови."
		},
		{
			title: "2. Маніпуляції з DOM",
			desc: "Навчимося змінювати елементи сторінки, реагувати на події та створювати інтерактивність."
		},
		{
			title: "3. Практичні проекти",
			desc: "Зробимо динамічні сайти — таймер, калькулятор, слайдер і багато іншого."
		}
	];

	// ⚡ Простий ефект частинок на фоні (Canvas)
	onMount(() => {
		const canvasEl = document.getElementById('js-bg') as HTMLCanvasElement | null;
		if (!canvasEl) return;
		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		const canvas = canvasEl;
		const context = ctx;

		const particles: { x: number; y: number; dx: number; dy: number; size: number }[] = [];
		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener('resize', resize);
		resize();

		for (let i = 0; i < 60; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				dx: (Math.random() - 0.5) * 1.2,
				dy: (Math.random() - 0.5) * 1.2,
				size: Math.random() * 2 + 1
			});
		}

		function animate(ctxLocal: CanvasRenderingContext2D, canvasLocal: HTMLCanvasElement) {
			ctxLocal.fillStyle = 'rgba(15, 23, 42, 0.3)'; // slate-900 with alpha
			ctxLocal.fillRect(0, 0, canvasLocal.width, canvasLocal.height);
			ctxLocal.fillStyle = 'rgba(250, 204, 21, 0.8)'; // yellow-400
			particles.forEach(p => {
				p.x += p.dx;
				p.y += p.dy;
				if (p.x < 0 || p.x > canvasLocal.width) p.dx *= -1;
				if (p.y < 0 || p.y > canvasLocal.height) p.dy *= -1;
				ctxLocal.beginPath();
				ctxLocal.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctxLocal.fill();
			});
			requestAnimationFrame(() => animate(ctxLocal, canvasLocal));
		}
		animate(context, canvas);
	});
</script>

<section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-900 text-white px-6 py-20">

	<!-- ⚡ Динамічний фон — частинки/світло -->
	<canvas id="js-bg" class="absolute inset-0"></canvas>

	<!-- Основний контент -->
	<div class="relative z-10 text-center max-w-3xl space-y-8">
		<h1 class="text-4xl sm:text-5xl font-bold">
			Оживи свій код із <span class="text-yellow-400">JavaScript ⚡</span>
		</h1>

		<p class="text-lg text-slate-300 leading-relaxed">
			Ти навчишся створювати логіку, працювати з подіями, DOM і даними,  
			щоб сторінки ставали живими й інтерактивними.
		</p>

		<div class="grid md:grid-cols-3 gap-6 pt-10">
			{#each steps as step}
				<div class="bg-yellow-500/10 border border-yellow-400/20 rounded-2xl p-6 backdrop-blur-md hover:scale-105 hover:bg-yellow-500/20 transition-transform duration-300">
					<h2 class="text-xl font-semibold mb-3 text-yellow-400">{step.title}</h2>
					<p class="text-slate-200 text-sm">{step.desc}</p>
				</div>
			{/each}
		</div>

		<button
			class="mt-10 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-full font-medium shadow-lg transition"
		>
			Почати навчання
		</button>
	</div>
</section>
