<script lang="ts">
	import ThemesToggle from '$lib/components/theme/ThemesToggle.svelte';
	import { theme } from '$lib/stores/theme';
	import '../app.css';
	import { ERoutesNames } from './routing-helpers';

	let { children } = $props();
</script>

<svelte:head>
	<!-- <meta name="theme-color" content="{($theme === 'dark' ? '#1e1e1e' : '#ffffff')}" /> -->
</svelte:head>

{#if $theme !== null}
	<div class=" flex h-dvh flex-col font-mono">
		<header class=" ">
			<div class="container mx-auto">
				<nav>
					<ul class="flex gap-5 font-medium underline">
						<li>
							<a href={ERoutesNames.root}>Landing page</a>
						</li>

						<li>
							<ThemesToggle />
						</li>
					</ul>
				</nav>
			</div>
		</header>

		<main class='flex-auto'>
			{@render children()}
		</main>

		<footer class=" ">
			<div class="container mx-auto">
				Платформа для навчання по технологіям HTML, CSS, JS, SVELTE 5, SVELTEKIT,TS, NODE.JS,
				EXPRESS, POSTGRESS DB
			</div>
		</footer>
	</div>
{/if}
