<script lang="ts">
	import { writable } from 'svelte/store';

	interface Tag {
		name: string;
		description: string;
		example: string;
		notes: string;
		accessibility: string;
		commonAttributes: { name: string; desc: string }[];
		type: 'block' | 'inline';
		category: string;
		relatedTags?: string[]; // Нове: пов'язані теги
		quiz?: { question: string; options: string[]; correct: number; explanation: string }[]; // Нове: квіз
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
	const selectedTag = writable<Tag | null>(null);
	const liveCode = writable<string>('');
	const liveCss = writable<string>('');
	const livePreview = writable<string>('');
	const activeCategory = writable<string>('all');

	// Масив тегів із застарілими
	const tags: Tag[] = [
		// Документ
		{
			name: 'html',
			description: 'Кореневий елемент HTML-документа.',
			example: '<!DOCTYPE html><html lang="uk"><body>Вміст</body></html>',
			notes: 'Завжди починайте з <!DOCTYPE html>.',
			accessibility: 'Атрибут lang допомагає екранним читачам.',
			commonAttributes: [{ name: 'lang', desc: 'Мова документа (uk, en тощо).' }],
			type: 'block',
			category: 'Документ'
		},
		{
			name: 'head',
			description: 'Містить метадані документа (не відображається на сторінці).',
			example: '<head><title>Мій сайт</title></head>',
			notes: 'Використовуйте для CSS, JS, SEO.',
			accessibility: 'Не впливає напряму на доступність.',
			commonAttributes: [],
			type: 'block',
			category: 'Документ'
		},
		{
			name: 'body',
			description: 'Основний вміст, який бачить користувач.',
			example: '<body><h1>Привіт!</h1></body>',
			notes: 'Дозволяється лише один body на сторінку.',
			accessibility: 'Основний контент для screen readers.',
			commonAttributes: [{ name: 'class', desc: 'Для стилізації.' }],
			type: 'block',
			category: 'Документ'
		},
		{
			name: 'title',
			description: 'Назва документа, відображається у вкладці браузера.',
			example: '<title>Моя сторінка</title>',
			notes: 'Важливо для SEO та вкладок браузера.',
			accessibility: 'Читається screen readers.',
			commonAttributes: [],
			type: 'block',
			category: 'Документ'
		},
		{
			name: 'meta',
			description: 'Задає метадані, наприклад, кодування чи опис.',
			example: '<meta charset="UTF-8">',
			notes: 'Атрибут charset є обов’язковим для кодування.',
			accessibility: 'name="description" покращує SEO.',
			commonAttributes: [
				{ name: 'charset', desc: 'Кодування (UTF-8).' },
				{ name: 'name', desc: 'Тип метаданих.' }
			],
			type: 'block',
			category: 'Документ'
		},
		{
			name: 'link',
			description: 'Підключає зовнішні ресурси, наприклад, CSS або іконки.',
			example: '<link rel="stylesheet" href="style.css">',
			notes: 'Використовуйте для зовнішніх стилів.',
			accessibility: 'Не впливає напряму.',
			commonAttributes: [
				{ name: 'rel', desc: 'Тип зв’язку (stylesheet тощо).' },
				{ name: 'href', desc: 'Шлях до ресурсу.' }
			],
			type: 'block',
			category: 'Документ'
		},
		{
			name: 'style',
			description: 'Визначає вбудовані CSS-стилі.',
			example: '<style>h1 { color: blue; }</style>',
			notes: 'Краще для невеликих стилів, інакше використовуйте CSS-файли.',
			accessibility: 'Не впливає напряму.',
			commonAttributes: [],
			type: 'block',
			category: 'Документ'
		},
		{
			name: 'script',
			description: 'Підключає або вставляє JavaScript-код.',
			example: '<script>console.log("Привіт!");</\script>',
			notes: 'Розміщуйте в кінці body для швидшого завантаження.',
			accessibility: 'Додавайте aria-describedby для інтерактивних скриптів.',
			commonAttributes: [{ name: 'src', desc: 'Шлях до зовнішнього JS.' }],
			type: 'block',
			category: 'Документ'
		},
		// Структура
		{
			name: 'div',
			description: 'Універсальний контейнер для групування вмісту.',
			example: '<div>Контейнер</div>',
			notes: 'Використовуйте для макетів, але уникайте надмірного використання.',
			accessibility: 'Додавайте role для семантики, якщо потрібно.',
			commonAttributes: [
				{ name: 'class', desc: 'Для стилізації.' },
				{ name: 'id', desc: 'Унікальний ідентифікатор.' }
			],
			type: 'block',
			category: 'Структура'
		},
		{
			name: 'span',
			description: 'Універсальний контейнер для вбудованого вмісту.',
			example: '<span>Текст</span>',
			notes: 'Не змінює структуру рядка.',
			accessibility: 'Використовуйте для стилізації тексту.',
			commonAttributes: [{ name: 'class', desc: 'Для стилізації.' }],
			type: 'inline',
			category: 'Структура'
		},
		{
			name: 'header',
			description: 'Шапка сторінки або секції.',
			example: '<header><h1>Логотип</h1></header>',
			notes: 'Семантичний тег для верхньої частини.',
			accessibility: 'Автоматично розпізнається screen readers.',
			commonAttributes: [],
			type: 'block',
			category: 'Структура'
		},
		{
			name: 'footer',
			description: 'Підвал сторінки або секції.',
			example: '<footer>© 2025</footer>',
			notes: 'Для контактів або копірайту.',
			accessibility: 'Автоматично розпізнається.',
			commonAttributes: [],
			type: 'block',
			category: 'Структура'
		},
		{
			name: 'main',
			description: 'Основний вміст документа.',
			example: '<main>Стаття</main>',
			notes: 'Лише один на сторінку.',
			accessibility: 'Фокус для screen readers.',
			commonAttributes: [],
			type: 'block',
			category: 'Структура'
		},
		{
			name: 'section',
			description: 'Логічна секція з тематичним вмістом.',
			example: '<section><h2>Розділ</h2></section>',
			notes: 'Зазвичай містить заголовок.',
			accessibility: 'Автоматично семантичний.',
			commonAttributes: [],
			type: 'block',
			category: 'Структура'
		},
		{
			name: 'article',
			description: 'Самостійний вміст, наприклад, пост.',
			example: '<article><h2>Пост</h2></article>',
			notes: 'Для блогів чи новин.',
			accessibility: 'Автоматично семантичний.',
			commonAttributes: [],
			type: 'block',
			category: 'Структура'
		},
		{
			name: 'nav',
			description: 'Навігаційна секція.',
			example: '<nav><a href="/">Головна</a></nav>',
			notes: 'Для меню чи посилань.',
			accessibility: 'Автоматично розпізнається як навігація.',
			commonAttributes: [],
			type: 'block',
			category: 'Структура'
		},
		{
			name: 'aside',
			description: 'Боковий вміст, наприклад, сайдбар.',
			example: '<aside>Сайдбар</aside>',
			notes: 'Для реклами чи додаткової інформації.',
			accessibility: 'Автоматично розпізнається як доповнення.',
			commonAttributes: [],
			type: 'block',
			category: 'Структура'
		},
		// Текст
		{
			name: 'h1',
			description: 'Головний заголовок сторінки.',
			example: '<h1>Заголовок</h1>',
			notes: 'Використовуйте лише один h1 на сторінку.',
			accessibility: 'Основний для SEO та screen readers.',
			commonAttributes: [],
			type: 'block',
			category: 'Текст'
		},
		{
			name: 'h2',
			description: 'Підзаголовок другого рівня.',
			example: '<h2>Підзаголовок</h2>',
			notes: 'Для розділів сторінки.',
			accessibility: 'Дотримуйтесь ієрархії заголовків.',
			commonAttributes: [],
			type: 'block',
			category: 'Текст'
		},
		{
			name: 'p',
			description: 'Абзац тексту.',
			example: '<p>Текст абзацу.</p>',
			notes: 'Автоматично додає відступи.',
			accessibility: 'Автоматично семантичний.',
			commonAttributes: [],
			type: 'block',
			category: 'Текст'
		},
		{
			name: 'a',
			description: 'Гіперпосилання.',
			example: '<a href="/">Головна</a>',
			notes: 'Атрибут href є обов’язковим.',
			accessibility: 'Підтримує клавіатурну навігацію.',
			commonAttributes: [
				{ name: 'href', desc: 'Адреса посилання.' },
				{ name: 'target', desc: 'Куди відкрити (_blank тощо).' }
			],
			type: 'inline',
			category: 'Текст'
		},
		{
			name: 'strong',
			description: 'Важливий текст із семантичним акцентом.',
			example: '<strong>Важливо!</strong>',
			notes: 'Краще за b для семантики.',
			accessibility: 'Screen readers наголошують.',
			commonAttributes: [],
			type: 'inline',
			category: 'Текст'
		},
		{
			name: 'em',
			description: 'Текст із акцентом (курсив).',
			example: '<em>Акцент</em>',
			notes: 'Краще за i для семантики.',
			accessibility: 'Голосовий акцент у screen readers.',
			commonAttributes: [],
			type: 'inline',
			category: 'Текст'
		},
		{
			name: 'br',
			description: 'Перенос рядка.',
			example: 'Рядок 1<br>Рядок 2',
			notes: 'Уникайте частого використання, краще CSS.',
			accessibility: 'Може заплутати screen readers.',
			commonAttributes: [],
			type: 'inline',
			category: 'Текст'
		},
		{
			name: 'hr',
			description: 'Горизонтальна лінія для розділення.',
			example: '<hr>',
			notes: 'Для візуального розділення вмісту.',
			accessibility: 'Автоматично семантичний.',
			commonAttributes: [],
			type: 'block',
			category: 'Текст'
		},
		// Списки
		{
			name: 'ul',
			description: 'Ненумерований (маркований) список.',
			example: '<ul><li>Елемент</li></ul>',
			notes: 'Використовуйте для некритичних списків.',
			accessibility: 'Автоматично семантичний.',
			commonAttributes: [],
			type: 'block',
			category: 'Списки'
		},
		{
			name: 'ol',
			description: 'Нумерований список.',
			example: '<ol><li>Крок 1</li></ol>',
			notes: 'Для послідовностей чи інструкцій.',
			accessibility: 'Автоматично семантичний.',
			commonAttributes: [{ name: 'type', desc: 'Тип нумерації (1, a, A).' }],
			type: 'block',
			category: 'Списки'
		},
		{
			name: 'li',
			description: 'Елемент списку.',
			example: '<ul><li>Пункт</li></ul>',
			notes: 'Використовуйте в ul або ol.',
			accessibility: 'Автоматично семантичний.',
			commonAttributes: [],
			type: 'block',
			category: 'Списки'
		},
		// Форми
		{
			name: 'form',
			description: 'Форма для введення даних.',
			example: '<form><input type="text"></form>',
			notes: 'Для логінів, реєстрацій тощо.',
			accessibility: 'Додавайте label для всіх полів.',
			commonAttributes: [
				{ name: 'action', desc: 'Куди відправити дані.' },
				{ name: 'method', desc: 'GET або POST.' }
			],
			type: 'block',
			category: 'Форми'
		},
		{
			name: 'input',
			description: 'Поле введення (текст, чекбокси тощо).',
			example: '<input type="text" placeholder="Введіть текст">',
			notes: 'Понад 20 типів (text, email, checkbox).',
			accessibility: 'Обов’язковий label або aria-label.',
			commonAttributes: [
				{ name: 'type', desc: 'Тип поля.' },
				{ name: 'placeholder', desc: 'Підказка.' }
			],
			type: 'inline',
			category: 'Форми'
		},
		{
			name: 'button',
			description: 'Кнопка для дій.',
			example: '<button>Натисни</button>',
			notes: 'Використовуйте type="submit" у формах.',
			accessibility: 'Підтримує клавіатурну навігацію.',
			commonAttributes: [{ name: 'type', desc: 'submit, button, reset.' }],
			type: 'inline',
			category: 'Форми'
		},
		{
			name: 'label',
			description: 'Підпис для полів форми.',
			example: '<label for="x">Ім’я</label><input id="x">',
			notes: 'Покращує UX і доступність.',
			accessibility: 'Обов’язковий для input.',
			commonAttributes: [{ name: 'for', desc: 'ID пов’язаного поля.' }],
			type: 'inline',
			category: 'Форми'
		},
		// Медіа
		{
			name: 'img',
			description: 'Зображення.',
			example: '<img src="https://via.placeholder.com/100" alt="Кіт">',
			notes: 'Атрибут alt є обов’язковим.',
			accessibility: 'Alt описує зображення для незрячих.',
			commonAttributes: [
				{ name: 'src', desc: 'Шлях до зображення.' },
				{ name: 'alt', desc: 'Опис.' }
			],
			type: 'inline',
			category: 'Медіа'
		},
		{
			name: 'video',
			description: 'Відео-плеєр.',
			example: '<video controls><source src="video.mp4" type="video/mp4"></video>',
			notes: 'Додавайте controls для UX.',
			accessibility: 'Додавайте субтитри через <track>.',
			commonAttributes: [
				{ name: 'controls', desc: 'Панель керування.' },
				{ name: 'src', desc: 'Шлях до відео.' }
			],
			type: 'block',
			category: 'Медіа'
		},
		// Інше
		{
			name: 'details',
			description: 'Розгортаний блок (акордеон).',
			example: '<details><summary>Клік</summary><p>Текст</p></details>',
			notes: 'Зручний для FAQ чи додаткового вмісту.',
			accessibility: 'Автоматично підтримує клавіатуру.',
			commonAttributes: [{ name: 'open', desc: 'Розгорнуто за замовчуванням.' }],
			type: 'block',
			category: 'Інше'
		},
		// Застарілі
		{
			name: 'font',
			description: 'Задає шрифт, розмір і колір тексту (застарілий).',
			example: '<font face="Arial" size="3" color="red">Текст</font>',
			notes: 'Замініть на CSS (font-family, font-size, color).',
			accessibility: 'Погано для screen readers, уникайте.',
			commonAttributes: [
				{ name: 'face', desc: 'Назва шрифту.' },
				{ name: 'size', desc: 'Розмір шрифту.' },
				{ name: 'color', desc: 'Колір тексту.' }
			],
			type: 'inline',
			category: 'Застарілі'
		},
		{
			name: 'center',
			description: 'Центрує вміст (застарілий).',
			example: '<center>Центрований текст</center>',
			notes: 'Замініть на CSS (text-align: center).',
			accessibility: 'Не семантичний, уникайте.',
			commonAttributes: [],
			type: 'block',
			category: 'Застарілі'
		},
		{
			name: 'strike',
			description: 'Закреслений текст (застарілий).',
			example: '<strike>Закреслений текст</strike>',
			notes: 'Замініть на <s> або <del>.',
			accessibility: 'Менш семантичний, уникайте.',
			commonAttributes: [],
			type: 'inline',
			category: 'Застарілі'
		},
		{
			name: 'big',
			description: 'Збільшує розмір тексту (застарілий).',
			example: '<big>Великий текст</big>',
			notes: 'Замініть на CSS (font-size).',
			accessibility: 'Не семантичний, уникайте.',
			commonAttributes: [],
			type: 'inline',
			category: 'Застарілі'
		},
		{
			name: 'tt',
			description: 'Текст у стилі телетайпа (застарілий).',
			example: '<tt>Моноширинний текст</tt>',
			notes: 'Замініть на <code> або CSS (font-family: monospace).',
			accessibility: 'Не семантичний, уникайте.',
			commonAttributes: [],
			type: 'inline',
			category: 'Застарілі'
		}
	];

	// Унікальні категорії
	const categories = ['all', ...new Set(tags.map((t) => t.category))];

	// Фільтрація тегів
	$: filtered = tags.filter(
		(t) =>
			(t.name.toLowerCase().includes($query.toLowerCase()) ||
				t.description.toLowerCase().includes($query.toLowerCase())) &&
			($activeCategory === 'all' || t.category === $activeCategory)
	);

	// Вибір тегу
	function selectTag(tag: Tag) {
		selectedTag.set(tag);
		liveCode.set(tag.example);
		liveCss.set('');
		livePreview.set(`<style>${$liveCss}</style>${$liveCode}`);
	}

	// Реактивне оновлення прев’ю з дебонсингом
	const updatePreview = debounce((code: string, css: string) => {
		livePreview.set(`<style>${css}</style>${code}`);
	}, 300);

	$: updatePreview($liveCode, $liveCss);
</script>

<svelte:head>
	<title>HTML Справочник: {$selectedTag ? `<${$selectedTag.name}>` : 'Огляд'}</title>
</svelte:head>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-center text-2xl font-bold">🚀 HTML Справочник для новачків</h1>
	<p class="my-2 text-center text-gray-600">
		Експериментуйте з тегами! Категорії, CSS-редактор, доступність.
	</p>
	<a
		href="/learn-more/html/common-attributes"
		class="mb-4 block text-center text-blue-600 underline">📚 Загальні атрибути</a
	>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<!-- Пошук і категорії -->
		<div>
			<input
				type="text"
				placeholder="🔍 Шукай: div, img, form..."
				bind:value={$query}
				class="mb-3 w-full rounded border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
			<div class="mb-3 flex flex-wrap gap-2">
				{#each categories as cat}
					<button
						on:click={() => activeCategory.set(cat)}
						class="rounded px-3 py-1 text-sm {$activeCategory === cat
							? 'bg-blue-600 text-white'
							: 'bg-gray-200 hover:bg-gray-300'}"
					>
						{cat === 'all' ? 'Всі' : cat}
					</button>
				{/each}
			</div>
			<ul class="max-h-[60vh] overflow-y-auto rounded border">
				{#each filtered as tag}
					<li
						role="button"
						tabindex="0"
						class="cursor-pointer border-b px-3 py-2 hover:bg-gray-100"
						on:click={() => selectTag(tag)}
						on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectTag(tag)}
					>
						<strong>&lt;{tag.name}&gt;</strong>
						<span class="text-gray-500">({tag.type})</span>
						— {tag.description}
					</li>
				{/each}
				{#if filtered.length === 0}
					<li class="px-3 py-2 text-gray-500">😅 Нічого не знайдено</li>
				{/if}
			</ul>
		</div>

		<!-- Деталі та редактор -->
		<div class="flex min-h-[200px] flex-col rounded border p-3">
			{#if $selectedTag}
				<h2 class="mb-2 text-xl font-semibold">
					&lt;{$selectedTag.name}&gt;
					<span class="text-sm text-gray-500">({$selectedTag.type}, {$selectedTag.category})</span>
				</h2>
				<p class="mb-2"><strong>📝 Опис:</strong> {$selectedTag.description}</p>
				<p class="mb-2"><strong>💡 Для новачків:</strong> {$selectedTag.notes}</p>
				<p class="mb-2"><strong>♿ Доступність:</strong> {$selectedTag.accessibility}</p>
				{#if $selectedTag.commonAttributes.length > 0}
					<div class="mb-3">
						<strong>⚙️ Атрибути:</strong>
						<ul class="list-disc pl-5 text-sm">
							{#each $selectedTag.commonAttributes as attr}
								<li><code>{attr.name}</code> — {attr.desc}</li>
							{/each}
						</ul>
					</div>
				{/if}
				<a
					href="https://developer.mozilla.org/uk/docs/Web/HTML/Element/{$selectedTag.name}"
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
					placeholder={'h1 { color: red; }'}
					class="mb-3 h-20 w-full resize-none rounded border p-2 font-mono text-sm"
				></textarea>
				<div class="flex gap-2">
					<button
						on:click={() => {
							liveCode.set($selectedTag?.example || '');
							liveCss.set('');
						}}
						class="flex-1 rounded bg-gray-500 py-2 text-white hover:bg-gray-600"
					>
						Скинути
					</button>
					<button
						on:click={() => {
							const blob = new Blob([$livePreview], { type: 'text/html' });
							const url = URL.createObjectURL(blob);
							const a = document.createElement('a');
							a.href = url;
							a.download = `${$selectedTag?.name || 'example'}.html`;
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
					<p class="text-lg">🎯 Виберіть тег ліворуч</p>
					<p>
						Спробуйте: <strong>div</strong>, <strong>img</strong> або <strong>font</strong> (застарілий)
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
