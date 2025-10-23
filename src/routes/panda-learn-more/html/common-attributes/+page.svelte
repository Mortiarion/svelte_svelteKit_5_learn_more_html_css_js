<script lang="ts">
	// Інтерфейс для структури атрибута
	interface Attribute {
		name: string;
		description: string;
		example: string;
		tip: string;
	}

	// Список загальних HTML-атрибутів із детальними поясненнями, прикладами та порадами
	const attributes: Attribute[] = [
		{
			name: 'accesskey',
			description:
				'Дозволяє активувати елемент (наприклад, кнопку) за допомогою комбінації клавіш. Наприклад, натиснення Alt + вказана клавіша (на Windows) або Control + Option + клавіша (на Mac) активує елемент.',
			example:
				'<button accesskey="s" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-300">Спробуй Alt+S (Windows) або Control+Option+S (Mac)</button>',
			tip: 'Використовуй одинарні літери для ярликів і уникай конфліктів із комбінаціями браузера.'
		},
		{
			name: 'autocapitalize',
			description:
				'Контролює, як текст автоматично капіталізується. Наприклад, значення "words" робить першу літеру кожного слова великою, що зручно для імен або заголовків.',
			example:
				'<input autocapitalize="words" class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Введи своє ім’я" />',
			tip: 'Можливі значення: "none", "sentences", "words" або "characters".'
		},
		{
			name: 'class',
			description:
				'Додає CSS-класи для стилізації елемента. З Tailwind CSS можна швидко застосовувати стилі за допомогою утиліт.',
			example:
				'<span class="text-red-600 font-semibold bg-red-50 px-2 py-1 rounded">Червоний жирний текст</span>',
			tip: 'Використовуй Tailwind для швидкого й узгодженого стилізування.'
		},
		{
			name: 'contenteditable',
			description:
				'Дозволяє користувачу редагувати вміст елемента прямо в браузері, подібно до текстового редактора.',
			example:
				'<div contenteditable="true" class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">Клацни, щоб редагувати!</div>',
			tip: 'Використовуй значення "true" для увімкнення редагування; будь обережний, адже це дозволяє вільне введення.'
		},
		{
			name: 'data-*',
			description:
				'Зберігає користувацькі дані в елементі, які можна отримати через JavaScript. Корисно для збереження метаданих.',
			example:
				'<button data-info="приклад" class="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200" on:click={(e) => alert(e.currentTarget.dataset.info)}>Клацни, щоб побачити data-info</button>',
			tip: 'Заміни * на власну назву, наприклад, data-user-id.'
		},
		{
			name: 'dir',
			description:
				'Визначає напрямок тексту: "ltr" (зліва направо), "rtl" (справа наліво) або "auto" (браузер визначає автоматично). Корисно для багатомовних сайтів.',
			example:
				'<div dir="rtl" class="px-3 py-2 bg-gray-50 rounded-md">Текст іде справа наліво</div>',
			tip: 'Використовуй "rtl" для мов, таких як арабська чи іврит.'
		},
		{
			name: 'draggable',
			description:
				'Дозволяє перетягувати елемент мишею. Використовується для функцій drag-and-drop у вебдодатках.',
			example:
				'<div draggable="true" class="bg-gray-100 px-4 py-2 rounded-md cursor-move" on:dragstart={() => alert("Перетягування почалось!")}>Перетягни мене!</div>',
			tip: 'Поєднуй із подіями JavaScript для повноцінної роботи drag-and-drop.'
		},
		{
			name: 'hidden',
			description:
				'Повністю приховує елемент, ніби його немає в розмітці. Корисно для умовного відображення.',
			example:
				'<span hidden class="px-2 py-1 bg-gray-50 rounded">Цей текст прихований (не видно)</span>',
			tip: 'Використовуй CSS `display: none` для подібного ефекту з більшим контролем.'
		},
		{
			name: 'id',
			description:
				'Надає елементу унікальний ідентифікатор, який використовується для стилізації, JavaScript або посилань на сторінці.',
			example:
				'<div id="unique-id" class="border border-gray-300 px-3 py-2 rounded-md">Елемент із id="unique-id"</div>',
			tip: 'Переконайся, що ID унікальний на сторінці, щоб уникнути конфліктів.'
		},
		{
			name: 'inert',
			description:
				'Робить елемент неінтерактивним, тобто його не можна клікнути чи сфокусувати. Корисно для тимчасового відключення частин інтерфейсу.',
			example:
				'<button inert class="bg-gray-200 px-4 py-2 rounded-md cursor-not-allowed">Ця кнопка відключена</button>',
			tip: 'Працює в сучасних браузерах; додай запасний варіант для старих.'
		},
		{
			name: 'lang',
			description:
				'Вказує мову вмісту елемента, допомагаючи браузерам і скрінридерам правильно обробляти текст.',
			example:
				'<div lang="uk" class="px-3 py-2 bg-gray-50 rounded-md">Цей текст позначений як український</div>',
			tip: 'Використовуй стандартні коди мов, наприклад, "uk" для української.'
		},
		{
			name: 'spellcheck',
			description:
				'Вмикає або вимикає перевірку орфографії для текстових полів або редагованого вмісту.',
			example:
				'<div contenteditable="true" spellcheck="true" class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">Введи текст для перевірки орфографії</div>',
			tip: 'Встановлюй "true" або "false" залежно від потреби в перевірці.'
		},
		{
			name: 'style',
			description:
				'Додає вбудовані CSS-стилі до елемента. Використовуй рідко, адже Tailwind CSS зручніший для стилізації.',
			example: '<span style="color: green; font-weight: bold;">Зелений жирний текст</span>',
			tip: 'Уникай частого використання; надавай перевагу Tailwind для консистентності.'
		},
		{
			name: 'tabindex',
			description:
				'Контролює порядок фокусування елементів під час навігації клавіатурою (наприклад, клавішею Tab).',
			example:
				'<button tabindex="1" class="border border-gray-300 px-4 py-2 rounded-md focus:bg-blue-50 focus:ring-2 focus:ring-blue-300">Фокусуй мене першим через Tab</button>',
			tip: 'Використовуй позитивні числа для власного порядку; 0 додає елемент до природного порядку.'
		},
		{
			name: 'title',
			description:
				'Показує спливаючу підказку, коли користувач наводить курсор на елемент, додаючи додатковий контекст.',
			example:
				'<span title="Це підказка!" class="px-2 py-1 bg-gray-50 rounded hover:bg-gray-100">Наведи для підказки</span>',
			tip: 'Роби підказки короткими та інформативними.'
		},
		{
			name: 'translate',
			description:
				'Вказує, чи потрібно перекладати вміст елемента інструментами перекладу. Значення "no" запобігає перекладу.',
			example:
				'<span translate="no" class="px-2 py-1 bg-gray-50 rounded">Цей текст не перекладатиметься</span>',
			tip: 'Корисно для назв брендів або коду, які не треба перекладати.'
		}
	];

	// Стан для пошуку атрибутів
	let searchTerm: string = '';

	// Стан для відображення/приховування коду
	let showCode: { [key: string]: boolean } = {};

	// Функція для перемикання видимості коду
	function toggleCode(name: string): void {
		showCode = { ...showCode, [name]: !showCode[name] };
	}

	// Фільтрація атрибутів за пошуковим запитом
	$: filteredAttributes = attributes.filter(
		(attr: Attribute) =>
			attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			attr.description.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<div class="container mx-auto min-h-screen bg-gray-50 p-6">
	<!-- Заголовок -->
	<h1 class="mb-6 text-center text-3xl font-bold text-gray-800">Довідник HTML-атрибутів</h1>

	<!-- Пошуковий рядок -->
	<div class="mb-6">
		<input
			type="text"
			bind:value={searchTerm}
			placeholder="Пошук атрибутів..."
			class="mx-auto w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
		/>
	</div>

	<!-- Сітка атрибутів -->
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredAttributes as attr (attr.name)}
			<div class="rounded-lg bg-white p-5 shadow-md transition-shadow duration-200 hover:shadow-lg">
				<h2 class="mb-2 text-xl font-semibold text-gray-800">{attr.name}</h2>
				<p class="mb-3 text-gray-600">{attr.description}</p>
				<div class="mb-3">
					<h3 class="mb-1 text-sm font-medium text-gray-700">Результат:</h3>
					<div class="rounded-md bg-gray-100 p-3">
						{@html attr.example}
					</div>
				</div>
				<div class="mb-3">
					<button
						class="text-sm text-blue-600 hover:underline"
						on:click={() => toggleCode(attr.name)}
					>
						{showCode[attr.name] ? 'Приховати код' : 'Показати код'}
					</button>
					{#if showCode[attr.name]}
						<pre class="mt-2 overflow-x-auto rounded-md bg-gray-800 p-3 text-sm text-white">
              <code>{attr.example}</code>
            </pre>
					{/if}
				</div>
				<p class="text-sm text-gray-500 italic">Порада: {attr.tip}</p>
			</div>
		{/each}
	</div>

	{#if filteredAttributes.length === 0}
		<p class="mt-6 text-center text-gray-500">Атрибутів за запитом "{searchTerm}" не знайдено.</p>
	{/if}
</div>

<style lang='postcss'>
	:global(button:focus),
	:global(input:focus),
	:global(div:focus) {
		@apply ring-2 ring-blue-300 outline-none;
	}
	:global(.cursor-move) {
		cursor: move;
	}
	:global(.cursor-not-allowed) {
		cursor: not-allowed;
	}
	pre {
		white-space: pre-wrap;
		word-wrap: break-word;
	}
</style>
