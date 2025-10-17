<script lang="ts">
	let htmlCode: string = `<h1>Привіт, світ!</h1> 
                            <h2>Привіт, світ!</h2>
                            <h3>Привіт, світ!</h3>
                            <h4>Привіт, світ!</h4>
                            <h5>Привіт, світ!</h5>
                            <h6>Привіт, світ!</h6>
                            `;
	// let cssCode: string = 'h1 { color: red; }';
	// let jsCode: string = "console.log('Hello from JS')";

	let srcDoc: string = '';

	function runCode() {
		srcDoc = `
			<html>
			
			<body>${htmlCode}</body>
			
			</html>
			`;
		}
		// <style>${cssCode}</style>
		// <script>${jsCode}<script>
</script>

<div class="flex flex-col gap-4 mb-4">
	<p>HTML заголовки визначаються тегами від <code>&lt;h1&gt;</code> до <code>&lt;h6&gt;</code>:</p>

	<p>
		<code>&lt;H1&gt;</code> визначає найбільш важливі заголовки, а <code>&lt;h6&gt;</code> визначає
		найменш важливі заголовки (<code>&lt;h1&gt;</code> заголовки повинні бути основними заголовками,
		потім слідують заголовки <code>&lt;h2&gt;</code> і так далі). Браузери автоматично додають порожній
		простір до і після кожного заголовка.
	</p>

	<p>
		Пошукові системи використовують ваші заголовки для індексації структури і змісту веб-сторінок.
		Тому важливо використовувати заголовки, щоб показати структуру документа.
	</p>

	<p>
		Теги <code>&lt;h1&gt;</code> -<code>&lt;h6&gt;</code> відносяться до блокових елементів, вони завжди
		починаються з нового рядка, а після них інші елементи відображаються на наступному рядку. Крім того,
		перед заголовком і після нього додається порожній простір.
	</p>
</div>

<div class="grid grid-cols-2 gap-4">
	<div class="flex flex-col gap-2">
		<label class="flex flex-col">
			HTML

			<textarea name="html" bind:value={htmlCode} class="border p-2 h-32"></textarea>
		</label>

		<!-- <label class="flex flex-col">
			CSS

			<textarea name="css" bind:value={cssCode} class="border p-2 h-32"></textarea>
		</label>

		<label class="flex flex-col">
			JS

			<textarea name="js" bind:value={jsCode} class="border p-2 h-32"></textarea>
		</label> -->

		<button onclick={runCode} class="mt-2 cursor-pointer rounded bg-blue-500 p-2 text-white">
			Запустити код
		</button>
	</div>

	<iframe class="h-full w-full rounded border" title="Live code preview" srcDoc={srcDoc}></iframe>
</div>
