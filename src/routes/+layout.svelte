<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class=" flex h-dvh flex-col bg-gray-400 font-mono">
	<header class=" bg-amber-200 ">
		<div class="container mx-auto">
			<nav>
				<ul class="flex gap-5 font-medium underline">
					<li>
						<a href="/">Landing page</a>
					</li>
				</ul>
			</nav>
		</div>
	</header>

	<main class=" flex-auto bg-blue-200 py-5 overflow-y-scroll">
		<div class="container mx-auto">
			{@render children()}
		</div>
	</main>

	<footer class=" bg-emerald-200">
		<div class="container mx-auto">
			Курсу не буде буде платформа і мій шлях як я іду що цілі
		</div>
	</footer>
</div>
