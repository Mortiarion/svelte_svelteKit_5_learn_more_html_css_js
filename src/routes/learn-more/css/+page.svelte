<script lang="ts">
	import { writable } from 'svelte/store';

	interface CssProperty {
		name: string;
		description: string;
		example: string;
		notes: string;
		accessibility: string;
		values: { name: string; desc: string }[];
		category: string;
		relatedProperties?: string[];
	}

	// Функція дебонсингу
	function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
		let timeout: ReturnType<typeof setTimeout>;
		return (...args: Parameters<T>) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => fn(...args), delay);
		};
	}

	// Стан компонента
	const query = writable<string>('');
	const selectedProperty = writable<CssProperty | null>(null);
	const liveCode = writable<string>('<div class="example">Приклад</div>');
	const liveCss = writable<string>('');
	const livePreview = writable<string>('');
	const activeCategory = writable<string>('all');

	// Масив CSS-властивостей
	const cssProperties: CssProperty[] = [
		// Текст
		{
			name: 'color',
			description: 'Задає колір тексту.',
			example: 'color: blue;',
			notes: 'Використовуйте назви кольорів, HEX, RGB або HSL.',
			accessibility: 'Забезпечуйте достатній контраст із фоном.',
			values: [
				{ name: 'red', desc: 'Назва кольору.' },
				{ name: '#FF0000', desc: 'HEX-код.' },
				{ name: 'rgb(255, 0, 0)', desc: 'RGB значення.' }
			],
			category: 'Текст',
			relatedProperties: ['background-color', 'opacity']
		},
		{
			name: 'font-size',
			description: 'Задає розмір шрифту.',
			example: 'font-size: 16px;',
			notes: 'Використовуйте rem або em для адаптивності.',
			accessibility: 'Уникайте занадто малих розмірів (<12px).',
			values: [
				{ name: '16px', desc: 'Фіксований розмір у пікселях.' },
				{ name: '1rem', desc: 'Відносно кореня.' },
				{ name: '100%', desc: 'Відносно батьківського елемента.' }
			],
			category: 'Текст',
			relatedProperties: ['font-family', 'line-height']
		},
		{
			name: 'font-family',
			description: 'Задає шрифт тексту.',
			example: 'font-family: Arial, sans-serif;',
			notes: 'Завжди вказуйте запасний шрифт.',
			accessibility: 'Використовуйте читабельні шрифти.',
			values: [
				{ name: 'Arial', desc: 'Назва шрифту.' },
				{ name: 'sans-serif', desc: 'Загальна категорія шрифту.' }
			],
			category: 'Текст',
			relatedProperties: ['font-size', 'font-weight']
		},
		{
			name: 'text-align',
			description: 'Вирівнює текст у блоці.',
			example: 'text-align: center;',
			notes: 'Застосовується до блочних елементів.',
			accessibility: 'Не впливає напряму на доступність.',
			values: [
				{ name: 'left', desc: 'Вирівнювання ліворуч.' },
				{ name: 'center', desc: 'Вирівнювання по центру.' },
				{ name: 'right', desc: 'Вирівнювання праворуч.' }
			],
			category: 'Текст',
			relatedProperties: ['text-justify']
		},
		// Макет
		{
			name: 'display',
			description: 'Задає тип відображення елемента.',
			example: 'display: flex;',
			notes: 'Ключова властивість для макетів.',
			accessibility: 'Перевірте, чи display: none не ховає важливий вміст.',
			values: [
				{ name: 'block', desc: 'Блочний елемент.' },
				{ name: 'inline', desc: 'Рядковий елемент.' },
				{ name: 'flex', desc: 'Гнучкий макет.' },
				{ name: 'grid', desc: 'Сітковий макет.' }
			],
			category: 'Макет',
			relatedProperties: ['flex', 'grid']
		},
		{
			name: 'flex',
			description: 'Скорочення для flexbox-властивостей.',
			example: 'flex: 1 1 auto;',
			notes: 'Комбінує flex-grow, flex-shrink і flex-basis.',
			accessibility: 'Переконайтеся, що порядок елементів логічний.',
			values: [
				{ name: '1', desc: 'flex-grow.' },
				{ name: 'auto', desc: 'flex-basis.' }
			],
			category: 'Макет',
			relatedProperties: ['display', 'justify-content', 'align-items']
		},
		{
			name: 'grid',
			description: 'Скорочення для grid-властивостей.',
			example: 'grid: 1fr 1fr / 1fr 1fr;',
			notes: 'Для створення сіток.',
			accessibility: 'Перевірте логічний порядок для screen readers.',
			values: [
				{ name: '1fr', desc: 'Фракційна одиниця.' },
				{ name: 'auto', desc: 'Автоматичний розмір.' }
			],
			category: 'Макет',
			relatedProperties: ['display', 'grid-template']
		},
		{
			name: 'margin',
			description: 'Задає зовнішні відступи.',
			example: 'margin: 10px 20px;',
			notes: 'Може бути 1-4 значення.',
			accessibility: 'Не впливає напряму.',
			values: [
				{ name: '10px', desc: 'Фіксований відступ.' },
				{ name: 'auto', desc: 'Автоматичне вирівнювання.' }
			],
			category: 'Макет',
			relatedProperties: ['padding', 'box-sizing']
		},
		{
			name: 'padding',
			description: 'Задає внутрішні відступи.',
			example: 'padding: 15px;',
			notes: 'Може бути 1-4 значення.',
			accessibility: 'Забезпечує простір для читабельності.',
			values: [
				{ name: '15px', desc: 'Фіксований відступ.' },
				{ name: '10%', desc: 'Відносно ширини батьківського елемента.' }
			],
			category: 'Макет',
			relatedProperties: ['margin', 'box-sizing']
		},
		// Стилізація
		{
			name: 'background',
			description: 'Скорочення для фонових властивостей.',
			example: 'background: url("image.jpg") no-repeat center;',
			notes: 'Комбінує колір, зображення, позицію тощо.',
			accessibility: 'Перевірте контраст із текстом.',
			values: [
				{ name: '#fff', desc: 'Колір фону.' },
				{ name: 'url("image.jpg")', desc: 'Фонове зображення.' }
			],
			category: 'Стилізація',
			relatedProperties: ['background-color', 'background-image']
		},
		{
			name: 'border',
			description: 'Задає рамку елемента.',
			example: 'border: 1px solid black;',
			notes: 'Комбінує ширину, стиль і колір.',
			accessibility: 'Корисно для виділення інтерактивних елементів.',
			values: [
				{ name: '1px', desc: 'Товщина рамки.' },
				{ name: 'solid', desc: 'Стиль рамки.' },
				{ name: 'black', desc: 'Колір рамки.' }
			],
			category: 'Стилізація',
			relatedProperties: ['border-radius', 'box-shadow']
		},
		{
			name: 'border-radius',
			description: 'Задає заокруглення кутів.',
			example: 'border-radius: 10px;',
			notes: 'Може мати 1-4 значення.',
			accessibility: 'Не впливає напряму.',
			values: [
				{ name: '10px', desc: 'Радіус заокруглення.' },
				{ name: '50%', desc: 'Круглі кути.' }
			],
			category: 'Стилізація',
			relatedProperties: ['border', 'box-shadow']
		},
		// Позиціонування
		{
			name: 'position',
			description: 'Задає тип позиціонування елемента.',
			example: 'position: absolute;',
			notes: 'Використовуйте з top, left тощо.',
			accessibility: 'Перевірте, чи не порушує логіку для screen readers.',
			values: [
				{ name: 'relative', desc: 'Відносно свого місця.' },
				{ name: 'absolute', desc: 'Відносно батьківського елемента.' },
				{ name: 'fixed', desc: 'Відносно вікна браузера.' }
			],
			category: 'Позиціонування',
			relatedProperties: ['top', 'left', 'z-index']
		},
		{
			name: 'z-index',
			description: 'Задає порядок накладання елементів.',
			example: 'z-index: 10;',
			notes: 'Працює тільки з позиціонованими елементами.',
			accessibility: 'Не впливає напряму.',
			values: [
				{ name: '10', desc: 'Ціле число.' },
				{ name: 'auto', desc: 'Автоматичний порядок.' }
			],
			category: 'Позиціонування',
			relatedProperties: ['position']
		},
		// Анімація
		{
			name: 'transition',
			description: 'Задає плавну зміну властивостей.',
			example: 'transition: all 0.3s ease;',
			notes: 'Вказуйте властивість, тривалість і функцію.',
			accessibility: 'Уникайте надмірних анімацій для чутливих користувачів.',
			values: [
				{ name: 'all', desc: 'Усі властивості.' },
				{ name: '0.3s', desc: 'Тривалість.' },
				{ name: 'ease', desc: 'Функція часу.' }
			],
			category: 'Анімація',
			relatedProperties: ['animation']
		},
		{
			name: 'animation',
			description: 'Задає анімацію елемента.',
			example: 'animation: slide 2s infinite;',
			notes: 'Потрібно визначити @keyframes.',
			accessibility: 'Додавайте prefers-reduced-motion.',
			values: [
				{ name: 'slide', desc: 'Назва анімації.' },
				{ name: '2s', desc: 'Тривалість.' },
				{ name: 'infinite', desc: 'Нескінченна анімація.' }
			],
			category: 'Анімація',
			relatedProperties: ['transition']
		}
	];

	// Унікальні категорії
	const categories = ['all', ...new Set(cssProperties.map((p) => p.category))];

	// Фільтрація властивостей
	$: filtered = cssProperties.filter(
		(p) =>
			(p.name.toLowerCase().includes($query.toLowerCase()) ||
				p.description.toLowerCase().includes($query.toLowerCase())) &&
			($activeCategory === 'all' || p.category === $activeCategory)
	);

	// Вибір властивості
	function selectProperty(prop: CssProperty) {
		selectedProperty.set(prop);
		liveCss.set(prop.example);
		livePreview.set(`<style>.example { ${$liveCss} }</style>${$liveCode}`);
	}

	// Реактивне оновлення прев’ю з дебонсингом
	const updatePreview = debounce((code: string, css: string) => {
		livePreview.set(`<style>.example { ${css} }</style>${code}`);
	}, 300);

	$: updatePreview($liveCode, $liveCss);
</script>

<svelte:head>
	<title>CSS Справочник: {$selectedProperty ? $selectedProperty.name : 'Огляд'}</title>
</svelte:head>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-center text-2xl font-bold">🎨 CSS Справочник для новачків</h1>
	<p class="my-2 text-center text-gray-600">
		Експериментуйте з CSS! Пошук, категорії, редактор, доступність.
	</p>
	<a href="/learn-more/css/common-properties" class="mb-4 block text-center text-blue-600 underline"
		>📚 Загальні CSS-властивості</a
	>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<!-- Пошук і категорії -->
		<div>
			<input
				type="text"
				placeholder="🔍 Шукай: color, font-size, flex..."
				bind:value={$query}
				class="mb-3 w-full rounded border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
			<div class="mb-3 flex flex-wrap gap-2">
				{#each categories as cat}
					<button
						onclick={() => activeCategory.set(cat)}
						class="rounded px-3 py-1 text-sm {$activeCategory === cat
							? 'bg-blue-600 text-white'
							: 'bg-gray-200 hover:bg-gray-300'}"
					>
						{cat === 'all' ? 'Всі' : cat}
					</button>
				{/each}
			</div>
			<ul class="max-h-[60vh] overflow-y-auto rounded border">
				{#each filtered as prop}
					<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
					<li
						role="button"
						tabindex="0"
						class="cursor-pointer border-b px-3 py-2 hover:bg-gray-100"
						onclick={() => selectProperty(prop)}
						onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectProperty(prop)}
					>
						<strong>{prop.name}</strong>
						— {prop.description}
					</li>
				{/each}
				{#if filtered.length === 0}
					<li class="px-3 py-2 text-gray-500">😅 Нічого не знайдено</li>
				{/if}
			</ul>
		</div>

		<!-- Деталі та редактор -->
		<div class="flex min-h-[200px] flex-col rounded border p-3">
			{#if $selectedProperty}
				<h2 class="mb-2 text-xl font-semibold">
					{$selectedProperty.name}
					<span class="text-sm text-gray-500">({$selectedProperty.category})</span>
				</h2>
				<p class="mb-2"><strong>📝 Опис:</strong> {$selectedProperty.description}</p>
				<p class="mb-2"><strong>💡 Для новачків:</strong> {$selectedProperty.notes}</p>
				<p class="mb-2"><strong>♿ Доступність:</strong> {$selectedProperty.accessibility}</p>
				{#if $selectedProperty.values.length > 0}
					<div class="mb-3">
						<strong>⚙️ Значення:</strong>
						<ul class="list-disc pl-5 text-sm">
							{#each $selectedProperty.values as val}
								<li><code>{val.name}</code> — {val.desc}</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if $selectedProperty.relatedProperties}
					<p class="mb-2">
						<strong>🔗 Пов’язані властивості:</strong>
						{$selectedProperty.relatedProperties.join(', ')}
					</p>
				{/if}
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/CSS/{$selectedProperty.name}"
					target="_blank"
					class="mb-3 block text-blue-600 underline hover:text-blue-800"
				>
					📖 Детальніше на MDN
				</a>
				<iframe
					class="mb-3 h-48 w-full rounded border"
					srcdoc={$livePreview}
					title="Попередній перегляд"
					sandbox=""
				></iframe>
				<label class="mb-1 block font-medium">📄 HTML:</label>
				<textarea
					bind:value={$liveCode}
					class="mb-3 h-24 w-full resize-none rounded border p-2 font-mono text-sm"
				></textarea>
				<label class="mb-1 block font-medium">🎨 CSS:</label>
				<textarea
					bind:value={$liveCss}
					placeholder={'color: blue;'}
					class="mb-3 h-20 w-full resize-none rounded border p-2 font-mono text-sm"
				></textarea>
				<div class="flex gap-2">
					<button
						onclick={() => {
							liveCode.set('<div class="example">Приклад</div>');
							liveCss.set($selectedProperty?.example || '');
						}}
						class="flex-1 rounded bg-gray-500 py-2 text-white hover:bg-gray-600"
					>
						Скинути
					</button>
					<button
						onclick={() => {
							const blob = new Blob([$livePreview], { type: 'text/html' });
							const url = URL.createObjectURL(blob);
							const a = document.createElement('a');
							a.href = url;
							a.download = `${$selectedProperty?.name || 'example'}.html`;
							a.click();
							URL.revokeObjectURL(url);
						}}
						class="flex-1 rounded bg-green-600 py-2 text-white hover:bg-green-700"
					>
						Завантажити HTML
					</button>
				</div>
			{:else}
				<div class="text-center text-gray-500">
					<p class="text-lg">🎯 Виберіть властивість ліворуч</p>
					<p>
						Спробуйте: <strong>color</strong>, <strong>display</strong> або
						<strong>font-size</strong>
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
