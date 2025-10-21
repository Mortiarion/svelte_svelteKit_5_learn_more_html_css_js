<script lang="ts">
	const tags: string[] = [
		'\u003Chtml>',
		'\u003Chead>',
		'\u003Cbody>',
		'\u003Csection>',
		'\u003Cdiv>',
		'\u003Ch1>',
		'\u003Cp>',
		'\u003Cfooter>',
		'\u003Ca>',
		'\u003Cbutton>',
		'\u003Cspan>',
		'\u003Cul>',
		'\u003Cli>',
		'\u003Cimg>',
		'\u003Cform>',
		'\u003Cinput>',
		'\u003Cscript>',
		'\u003Cstyle>',
		'\u003Clink>',
		'\u003Cmeta>',
		'\u003Cheader>',
		'\u003Cnav>',
		'\u003Carticle>',
		'\u003Caside>',
		'\u003Cmain>'
	];
</script>

<section
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-900 px-6 py-16 text-white"
>
	<!-- Анімовані теги -->
	<div class="pointer-events-none absolute inset-0 opacity-10 select-none">
		{#each tags as tag, i}
			<span
				class="animate-float absolute font-mono text-6xl text-blue-400"
				style={`top:${Math.random() * 100}%; left:${Math.random() * 100}%; animation-delay:${i * 1.5}s`}
			>
				{tag}
			</span>
		{/each}
	</div>

	<!-- Основний контент -->
	<div class="relative z-10 max-w-3xl space-y-8 text-center">
		<h1 class="text-4xl font-bold sm:text-5xl">
			Вивчи <span class="text-blue-400">&lt;HTML&gt;</span> через практику
		</h1>
		<p class="text-lg leading-relaxed text-slate-300">
			Власний інтерактивний довідник і зверстаємо сайт з нуля. Пояснимо все що буде відбуватись і
			чому.
		</p>
		<button
			class="mt-10 rounded-full bg-blue-500 px-8 py-3 font-medium shadow-lg transition hover:bg-blue-600"
		>
			Почати навчання
		</button>
	</div>
</section>

<style lang="postcss">
	@keyframes float {
		0% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(5deg);
		}
		100% {
			transform: translateY(0px) rotate(0deg);
		}
	}
	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
</style>
