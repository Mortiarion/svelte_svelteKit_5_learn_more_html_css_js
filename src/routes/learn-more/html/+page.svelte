<script lang="ts">
	import { browser } from '$app/environment'; // SvelteKit import for SSR check

	/* ----------------------
		TИПИ
	-----------------------*/
	type RelVariant = {
		value: string;
		title?: string;
		description: string;
		example: string;
		notes?: string;
	};

	type Attr = {
		name: string;
		description: string;
		example?: string;
		note?: string;
	};

	type Target = '_self' | '_blank' | '_parent' | '_top' | '';
	type ReferrerPolicy =
		| ''
		| 'no-referrer'
		| 'origin'
		| 'strict-origin-when-cross-origin'
		| 'same-origin'
		| 'strict-origin'
		| 'no-referrer-when-downgrade'
		| 'unsafe-url';
	type RelValue = string; // Allow combinations like "noopener noreferrer"

	/* ----------------------
		СТАНИ ($state / $derived)
	-----------------------*/
	let opened = $state<Record<string, boolean>>({
		overview: true,
		syntax: false,
		attributes: false,
		rel: false,
		accessibility: false,
		security: false,
		seo: false,
		examples: false,
		live: true
	});

	// Live preview controls
	let href = $state('https://example.com');
	let target = $state<Target>('_self');
	let rel = $state<RelValue>('noopener noreferrer');
	let download = $state('');
	let hreflang = $state('');
	let referrerpolicy = $state<ReferrerPolicy>('');
	let typeHint = $state('text/html');
	let linkText = $state('Перейти за посиланням');

	// HTML escape function to prevent XSS
	function escapeHtml(unsafe: string): string {
		return unsafe
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	// Construct preview HTML as derived
	let previewSrcdoc = $derived(`
<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Preview: &lt;a&gt;</title>
<style>
	body{font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;padding:24px}
	.container{max-width:760px;margin:0 auto}
	.preview-box{border:1px solid #e5e7eb;padding:16px;border-radius:8px}
	a.preview-link{display:inline-block;padding:8px 12px;border-radius:6px;background:#2563eb;color:white;text-decoration:none}
	.info{margin-top:12px;color:#374151;font-size:13px}
</style>
</head>
<body>
<div class="container">
	<h3>Live preview</h3>
	<div class="preview-box">
		<p>Натисни посилання нижче — у залежності від <code>target</code> і <code>rel</code> поведінка може відрізнятися.</p>
		<a
			class="preview-link"
			href="${escapeHtml(href)}"
			target="${escapeHtml(target === '' ? '_self' : target)}"
			${rel ? `rel="${escapeHtml(rel)}"` : ''}
			${download ? `download="${escapeHtml(download)}"` : ''}
			${hreflang ? `hreflang="${escapeHtml(hreflang)}"` : ''}
			${referrerpolicy ? `referrerpolicy="${escapeHtml(referrerpolicy)}"` : ''}
			${typeHint ? `type="${escapeHtml(typeHint)}"` : ''}
		>${escapeHtml(linkText)}</a>

		<div class="info">
			<strong>href:</strong> ${escapeHtml(href)} — 
			<strong>target:</strong> ${escapeHtml(target || '_self')} — 
			<strong>rel:</strong> ${escapeHtml(rel || '(none)')}
		</div>
	</div>

	<script>
		(() => {
			const a = document.querySelector('a.preview-link');
			if (!a) return;
			a.addEventListener('click', (e) => {
				console.log('Link clicked:', a.href, 'target=', a.target, 'rel=', a.rel);
			});
		})();
	</scr' + 'ipt>
</div>
</body>
</html>
`);

	/* ----------------------
		ДАНІ: атрибути, rel-варіанти
	-----------------------*/
	const attributes: Attr[] = [
		{
			name: 'href',
			description:
				'Основний атрибут: URL або URI-референс, на який веде посилання. Підтримує відносні та абсолютні URL, а також схеми (mailto:, tel:, file:, data: тощо).',
			example: '<a href="/about">Про нас</a>'
		},
		{
			name: 'target',
			description:
				'Де відкривати посилання. Поширені значення: _self (за замовчуванням), _blank (нова вкладка), _parent, _top або ім’я фрейма.',
			example: '<a href="https://site" target="_blank">Відкрити нову вкладку</a>',
			note: 'Якщо використовується _blank, додавай rel="noopener" або rel="noopener noreferrer"'
		},
		{
			name: 'rel',
			description:
				'Описує відносини між поточним документом і цільовим ресурсом (детальніше нижче). Може мати кілька значень через пробіл.',
			example: '<a href="https://site" rel="nofollow sponsored">Рекламне посилання</a>'
		},
		{
			name: 'download',
			description:
				'Підказує браузеру скачати ресурс замість відкриття. Можна вказати бажане ім’я файлу: download="name.pdf". Працює не у всіх крос-доменних випадках.',
			example: '<a href="/files/report.pdf" download="report-2025.pdf">Завантажити</a>'
		},
		{
			name: 'hreflang',
			description:
				'Вказує мову/регіон ресурсa (ISO-коди), наприклад "en", "fr-CA". Допомагає SEO у многомовних сайтах.',
			example: '<a href="/fr/about" hreflang="fr">Version française</a>'
		},
		{
			name: 'type',
			description: 'Підказка MIME-типу цільового ресурсу (наприклад, "application/pdf").',
			example: '<a href="/file.pdf" type="application/pdf">PDF</a>'
		},
		{
			name: 'ping',
			description:
				'Список URL (space-separated), куди браузер може відправити POST при кліку для аналітики (відправляється асинхронно). Увага: приватність/згоди.',
			example: '<a href="/buy" ping="/track/click">Купити</a>',
			note: 'Може впливати на конфіденційність. Не використовуйте без політик.'
		},
		{
			name: 'referrerpolicy',
			description:
				'Керує поведінкою заголовка Referer при переході (напр. no-referrer, origin, strict-origin-when-cross-origin і т.д.).',
			example: '<a href="https://site" referrerpolicy="no-referrer">Нема Referer</a>'
		}
	];

	const relVariants: RelVariant[] = [
		{
			value: 'noopener',
			title: 'noopener',
			description:
				'Блокує доступ відкритої сторінки до window.opener у випадку target="_blank". Рекомендується для безпеки при відкритті зовнішніх посилань.',
			example: '<a href="https://external.com" target="_blank" rel="noopener">Open safe</a>',
			notes: 'Не передає нічого додаткового, просто розриває посилання на opener.'
		},
		{
			value: 'noreferrer',
			title: 'noreferrer',
			description:
				'Не передає Referer заголовок і також блокує доступ до window.opener (якщо браузер підтримує). Використовується також для приватності.',
			example: '<a href="https://external.com" target="_blank" rel="noreferrer">Open no-referrer</a>'
		},
		{
			value: 'nofollow',
			title: 'nofollow',
			description:
				'Підказка пошуковим системам не передавати "вагу" посилання і не слідувати за ним при побудові ранжування (не гарантується, але використовують пошуковики).',
			example: '<a href="https://external.com" rel="nofollow">Do not follow</a>',
			notes: 'Корисне для коментарів, UGC, рекламних посилань.'
		},
		{
			value: 'ugc',
			title: 'ugc (User Generated Content)',
			description:
				'Позначає посилання, створене користувачем (коментарі, форуми). Дозволяє пошуковим системам розрізняти такі посилання.',
			example: '<a href="https://external.com" rel="ugc">User link</a>'
		},
		{
			value: 'sponsored',
			title: 'sponsored',
			description:
				'Позначає посилання, що є результатом реклами/комерційної співпраці. Використовується для SEO та прозорості.',
			example: '<a href="https://sponsor.com" rel="sponsored">Sponsored link</a>'
		},
		{
			value: 'alternate',
			title: 'alternate',
			description:
				'Позначає альтернативну версію ресурсу (наприклад, RSS feed або переклад). Частіше застосовується на <link> в head, але допустиме і в <a> у деяких контекстах.',
			example: '<a href="/feed.xml" rel="alternate" type="application/rss+xml">RSS</a>'
		},
		{
			value: 'author',
			title: 'author',
			description: 'Вказує на сторінку автора контенту.',
			example: '<a href="/about" rel="author">Про автора</a>'
		},
		{
			value: 'bookmark',
			title: 'bookmark',
			description: 'Позначає постійне посилання (permalink).',
			example: '<a href="/post/123" rel="bookmark">Постійне посилання</a>'
		},
		{
			value: 'help',
			title: 'help',
			description: 'Посилання на допоміжну інформацію / документацію.',
			example: '<a href="/help" rel="help">Довідка</a>'
		},
		{
			value: 'license',
			title: 'license',
			description: 'Посилання на ліцензійні умови для поточного ресурсу.',
			example: '<a href="/license" rel="license">Ліцензія</a>'
		},
		{
			value: 'next',
			title: 'next',
			description: 'Посилання на наступну сторінку у послідовності (наприклад пагінація).',
			example: '<a href="/page/2" rel="next">Наступна</a>'
		},
		{
			value: 'prev',
			title: 'prev',
			description: 'Посилання на попередню сторінку у послідовності.',
			example: '<a href="/page/1" rel="prev">Попередня</a>'
		},
		{
			value: 'tag',
			title: 'tag',
			description: 'Вказує на тег або ключове слово, пов’язане з ресурсом.',
			example: '<a href="/tags/html" rel="tag">HTML</a>'
		},
		{
			value: 'external',
			title: 'external',
			description: 'Позначає зовнішнє посилання (інший сайт). Це семантична підказка, але не стандартна для всіх випадків.',
			example: '<a href="https://external.com" rel="external">External</a>'
		}
	];

	/* ----------------------
		УТИЛІТИ / ФУНКЦІЇ
	-----------------------*/
	function toggle(section: string) {
		opened = { ...opened, [section]: !opened[section] };
	}

	function setRelValue(value: RelValue) {
		const validRels = relVariants.map((rv) => rv.value);
		const values = value
			.split(' ')
			.filter((v) => validRels.includes(v) || v);
		rel = values.join(' ');
	}

	function isValidUrl(url: string): boolean {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	function openLinkDemo() {
		if (!browser || !isValidUrl(href)) {
			if (browser) alert('Будь ласка, введіть дійсний URL');
			return;
		}
		const features = '';
		if (target === '_blank') {
			window.open(href, '_blank', features);
		} else {
			location.href = href;
		}
	}

	function downloadPreviewHtml() {
		if (!browser) return;
		const blob = new Blob([previewSrcdoc], { type: 'text/html' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'a-preview.html';
		a.click();
		URL.revokeObjectURL(url);
	}

	function reset() {
		href = 'https://example.com';
		target = '_self';
		rel = 'noopener noreferrer';
		download = '';
		hreflang = '';
		referrerpolicy = '';
		typeHint = 'text/html';
		linkText = 'Перейти за посиланням';
	}

	/* ----------------------
		МІНІ-ПРОЗРАЧНІ ПОЯСНЕННЯ (короткі)
	-----------------------*/
	const quickTips = [
		'Використовуй <button> для дій, <a href> — для навігації.',
		'Для _blank завжди додавай rel="noopener" або rel="noopener noreferrer".',
		'Anchor text має бути описовим: замість "натисни тут" — "Завантажити звіт 2025".',
		'Не використовуй href="javascript:...".'
	];
</script>

<style>
	/* TailwindCSS is used primarily, with minimal custom CSS */
	pre code {
		white-space: pre-wrap;
	}
</style>

<div class="max-w-6xl mx-auto p-6 space-y-6">
	<header class="flex items-start justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold">Довідник &lt;a&gt; — інтерактивний</h1>
			<p class="text-gray-600 mt-1">Повний опис тега <code>&lt;a&gt;</code>, атрибути, rel, A11Y, безпека, SEO та live preview.</p>
		</div>
		<div class="text-right">
			<button class="bg-blue-600 text-white px-3 py-2 rounded mr-2" on:click={downloadPreviewHtml}>Завантажити preview.html</button>
			<button class="bg-gray-200 px-3 py-2 rounded" on:click={() => { Object.keys(opened).forEach(k => opened[k]=true); opened = {...opened}; }}>Розгорнути всі</button>
		</div>
	</header>

	<!-- QUICK TIPS -->
	<section class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
		<h3 class="font-semibold">Quick tips</h3>
		<ul class="list-disc ml-5 mt-2 text-sm">
			{#each quickTips as tip}
				<li>{tip}</li>
			{/each}
		</ul>
	</section>

	<!-- ACCORDION -->
	<div class="space-y-3">
		<!-- Overview -->
		<div class="border rounded">
			<button
				class="w-full text-left p-4 flex justify-between items-center"
				on:click={() => toggle('overview')}
				aria-expanded={opened.overview}
				aria-controls="overview-section"
			>
				<div>
					<h2 class="text-lg font-semibold">Огляд &lt;a&gt;</h2>
					<p class="text-sm text-gray-600">Семантика, основне призначення, контентна модель.</p>
				</div>
				<div class="text-gray-500">{opened.overview ? '−' : '+'}</div>
			</button>
			{#if opened.overview}
				<div id="overview-section" class="p-4 border-t bg-white">
					<p class="mb-2">Тег <code>&lt;a&gt;</code> створює гіперпосилання. Якщо присутній атрибут <code>href</code>, елемент має поведінку посилання та фокусується клавіатурою.</p>
					<ul class="list-disc pl-5 text-sm space-y-1">
						<li>Підтримує текст, інлайн-елементи та зображення.</li>
						<li>Не рекомендується вкладати інші інтерактивні елементи всередину посилання.</li>
						<li>Для дій, що не змінюють URL, використовуй <code>&lt;button&gt;</code>.</li>
					</ul>
				</div>
			{/if}
		</div>

		<!-- Syntax -->
		<div class="border rounded">
			<button
				class="w-full p-4 flex justify-between items-center"
				on:click={() => toggle('syntax')}
				aria-expanded={opened.syntax}
				aria-controls="syntax-section"
			>
				<div>
					<h2 class="text-lg font-semibold">Синтаксис</h2>
					<p class="text-sm text-gray-600">Базовий синтаксис та найпоширеніші схеми URI.</p>
				</div>
				<div class="text-gray-500">{opened.syntax ? '−' : '+'}</div>
			</button>
			{#if opened.syntax}
				<div id="syntax-section" class="p-4 border-t bg-white">
					<pre class="bg-gray-100 rounded p-3 overflow-x-auto"><code>&lt;a href="URL" target="_blank" rel="noopener noreferrer"&gt;Anchor text&lt;/a&gt;</code></pre>
					<p class="mt-3 text-sm text-gray-700">Схеми: <code>https://</code>, <code>http://</code>, <code>mailto:</code>, <code>tel:</code>, <code>ftp:</code>, <code>data:</code> тощо.</p>
				</div>
			{/if}
		</div>

		<!-- Attributes -->
		<div class="border rounded">
			<button
				class="w-full p-4 flex justify-between items-center"
				on:click={() => toggle('attributes')}
				aria-expanded={opened.attributes}
				aria-controls="attributes-section"
			>
				<div>
					<h2 class="text-lg font-semibold">Атрибути (повна таблиця)</h2>
					<p class="text-sm text-gray-600">href, target, rel, download, hreflang, type, ping, referrerpolicy та інші.</p>
				</div>
				<div class="text-gray-500">{opened.attributes ? '−' : '+'}</div>
			</button>
			{#if opened.attributes}
				<div id="attributes-section" class="p-4 border-t bg-white space-y-3">
					{#each attributes as attr}
						<div class="p-3 border rounded">
							<div class="flex justify-between items-start">
								<div>
									<h4 class="font-semibold">{attr.name}</h4>
									<p class="text-sm text-gray-700 mt-1">{attr.description}</p>
									{#if attr.note}
										<p class="text-xs text-gray-500 mt-1">{attr.note}</p>
									{/if}
								</div>
								{#if attr.example}
									<pre class="bg-gray-50 rounded p-2 text-sm ml-4"><code>{attr.example}</code></pre>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- rel -->
		<div class="border rounded">
			<button
				class="w-full p-4 flex justify-between items-center"
				on:click={() => toggle('rel')}
				aria-expanded={opened.rel}
				aria-controls="rel-section"
			>
				<div>
					<h2 class="text-lg font-semibold">Атрибут <code>rel</code> — всі варіанти</h2>
					<p class="text-sm text-gray-600">Повний перелік популярних значень <code>rel</code> з описами та прикладами.</p>
				</div>
				<div class="text-gray-500">{opened.rel ? '−' : '+'}</div>
			</button>
			{#if opened.rel}
				<div id="rel-section" class="p-4 border-t bg-white space-y-3">
					<div class="grid md:grid-cols-2 gap-3">
						{#each relVariants as rv}
							<div class="border rounded p-3">
								<div class="flex justify-between">
									<h4 class="font-semibold"><code>{rv.value}</code></h4>
								</div>
								<p class="text-sm text-gray-700 mt-2">{rv.description}</p>
								{#if rv.notes}
									<p class="text-xs text-gray-500 mt-1">{rv.notes}</p>
								{/if}
								<pre class="bg-gray-50 rounded p-2 mt-2 text-sm"><code>{rv.example}</code></pre>
								<div class="mt-2 flex gap-2">
									<button class="px-2 py-1 text-sm bg-gray-100 rounded" on:click={() => setRelValue(rv.value)}>{rv.value} → set rel</button>
									<a href="#" class="px-2 py-1 text-sm text-blue-600 underline" rel={rv.value}>Приклад (несправжній)</a>
								</div>
							</div>
						{/each}
					</div>
					<div class="text-sm text-gray-600 mt-2">
						<strong>Примітка:</strong> Значення <code>rel</code> можна комбінувати через пробіли, напр. <code>rel="noopener noreferrer nofollow"</code>.
					</div>
				</div>
			{/if}
		</div>

		<!-- Accessibility -->
		<div class="border rounded">
			<button
				class="w-full p-4 flex justify-between items-center"
				on:click={() => toggle('accessibility')}
				aria-expanded={opened.accessibility}
				aria-controls="accessibility-section"
			>
				<div>
					<h2 class="text-lg font-semibold">ARIA / Доступність (A11Y)</h2>
					<p class="text-sm text-gray-600">Рекомендації для екранних рідерів, клавіатурної навігації та семантики.</p>
				</div>
				<div class="text-gray-500">{opened.accessibility ? '−' : '+'}</div>
			</button>
			{#if opened.accessibility}
				<div id="accessibility-section" class="p-4 border-t bg-white space-y-2">
					<ul class="list-disc pl-5 text-sm space-y-1">
						<li>Текст посилання має бути інформативним (не "натисни тут").</li>
						<li>Якщо посилання відкриває нову вкладку — познач це в тексті або через <code>aria-label</code> (наприклад: <code>aria-label="Відкрити у новому вікні"</code>).</li>
						<li>Не використовуйте <code>&lt;a&gt;</code> без <code>href</code> для дій — це порушує очікування користувача; краще <code>&lt;button&gt;</code>.</li>
						<li>Якщо ви використовуєте <code>&lt;a role="button"&gt;</code>, додайте <code>tabindex="0"</code> та обробку клавіш (Space/Enter).</li>
						<li>Переконайтесь, що кольори посилань відповідають вимогам контрасту WCAG.</li>
					</ul>
					<pre class="bg-gray-50 rounded p-3 text-sm"><code>&lt;a href="/download" aria-label="Завантажити звіт (відкриває в новому вікні)" target="_blank" rel="noopener"&gt;Завантажити звіт&lt;/a&gt;</code></pre>
				</div>
			{/if}
		</div>

		<!-- Security -->
		<div class="border rounded">
			<button
				class="w-full p-4 flex justify-between items-center"
				on:click={() => toggle('security')}
				aria-expanded={opened.security}
				aria-controls="security-section"
			>
				<div>
					<h2 class="text-lg font-semibold">Безпека</h2>
					<p class="text-sm text-gray-600">Ризики і захист при використанні посилань (window.opener, XSS, referrer).</p>
				</div>
				<div class="text-gray-500">{opened.security ? '−' : '+'}</div>
			</button>
			{#if opened.security}
				<div id="security-section" class="p-4 border-t bg-white space-y-3 text-sm text-gray-700">
					<p><strong>Основні загрози:</strong></p>
					<ul class="list-disc pl-5">
						<li><strong>window.opener</strong> — якщо відкриваєш посилання з <code>target="_blank"</code> і не використовуєш <code>rel="noopener"</code>, відкрита сторінка може маніпулювати сторінкою-джерелом (location.href) → phishing.</li>
						<li><strong>href="javascript:"</strong> — небезпечно, уразливість до XSS; не використовувати.</li>
						<li><strong>ping</strong> — може витікати деталі кліків в аналітику (приватність).</li>
					</ul>
					<p><strong>Рекомендації:</strong></p>
					<ul class="list-disc pl-5">
						<li>Для зовнішніх посилань відкривайте з <code>rel="noopener noreferrer"</code> при <code>target="_blank"</code>.</li>
						<li>Перевіряйте/валідуйте URL, перш ніж рендерити їх із користувацького вводу.</li>
						<li>Уникайте вбудованого JS у href; використовуйте обробники подій без інлайнового JS.</li>
					</ul>
					<pre class="bg-gray-50 rounded p-3 text-sm"><code>&lt;a href="https://external.com" target="_blank" rel="noopener noreferrer"&gt;External&lt;/a&gt;</code></pre>
				</div>
			{/if}
		</div>

		<!-- SEO -->
		<div class="border rounded">
			<button
				class="w-full p-4 flex justify-between items-center"
				on:click={() => toggle('seo')}
				aria-expanded={opened.seo}
				aria-controls="seo-section"
			>
				<div>
					<h2 class="text-lg font-semibold">SEO рекомендації</h2>
					<p class="text-sm text-gray-600">Як посилання впливають на індексацію та ранжування.</p>
				</div>
				<div class="text-gray-500">{opened.seo ? '−' : '+'}</div>
			</button>
			{#if opened.seo}
				<div id="seo-section" class="p-4 border-t bg-white space-y-2 text-sm text-gray-700">
					<ul class="list-disc pl-5">
						<li>Anchor text — важливий сигнал для пошукових систем; роби його описовим.</li>
						<li>Внутрішні посилання допомагають crawler-ам віднайти структуру сайту і важливі сторінки.</li>
						<li>Для платних / рекламних посилань використовуйте <code>rel="sponsored"</code>.</li>
						<li>Для UGC (коментарі) — використовуйте <code>rel="ugc"</code>.</li>
						<li>Для посилань, які не повинні передавати "вагу", — <code>rel="nofollow"</code>. Пам’ятай, що пошуковики можуть трактувати ці підказки по-різному.</li>
					</ul>
					<pre class="bg-gray-50 rounded p-3 text-sm"><code>&lt;a href="https://affiliate.example" rel="sponsored nofollow" target="_blank"&gt;Affiliate&lt;/a&gt;</code></pre>
				</div>
			{/if}
		</div>

		<!-- Examples -->
		<div class="border rounded">
			<button
				class="w-full p-4 flex justify-between items-center"
				on:click={() => toggle('examples')}
				aria-expanded={opened.examples}
				aria-controls="examples-section"
			>
				<div>
					<h2 class="text-lg font-semibold">Приклади (практичні кейси)</h2>
					<p class="text-sm text-gray-600">Різні сценарії: внутрішні, зовнішні, скачування, UGC, спонсоровані посилання.</p>
				</div>
				<div class="text-gray-500">{opened.examples ? '−' : '+'}</div>
			</button>
			{#if opened.examples}
				<div id="examples-section" class="p-4 border-t bg-white space-y-3 text-sm text-gray-700">
					<div class="grid md:grid-cols-2 gap-3">
						<div class="border rounded p-3">
							<h4 class="font-semibold">Внутрішнє посилання</h4>
							<pre class="bg-gray-50 rounded p-2"><code>&lt;a href="/blog/article-1"&gt;Читати статтю&lt;/a&gt;</code></pre>
							<p class="text-xs text-gray-500">SvelteKit: внутрішні посилання будуть перехоплені роутером для client-side переходів.</p>
						</div>
						<div class="border rounded p-3">
							<h4 class="font-semibold">Зовнішнє з безпекою</h4>
							<pre class="bg-gray-50 rounded p-2"><code>&lt;a href="https://external.com" target="_blank" rel="noopener noreferrer"&gt;Відкрити зовнішній ресурс&lt;/a&gt;</code></pre>
						</div>
						<div class="border rounded p-3">
							<h4 class="font-semibold">Скачування файлу</h4>
							<pre class="bg-gray-50 rounded p-2"><code>&lt;a href="/files/report.pdf" download="report-2025.pdf"&gt;Завантажити звіт&lt;/a&gt;</code></pre>
						</div>
						<div class="border rounded p-3">
							<h4 class="font-semibold">UGC / Коментарі</h4>
							<pre class="bg-gray-50 rounded p-2"><code>&lt;a href="https://user-site" rel="ugc nofollow"&gt;Посилання з коментаря&lt;/a&gt;</code></pre>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Live preview -->
		<div class="border rounded">
			<button
				class="w-full p-4 flex justify-between items-center"
				on:click={() => toggle('live')}
				aria-expanded={opened.live}
				aria-controls="live-section"
			>
				<div>
					<h2 class="text-lg font-semibold">Live preview — тестуй атрибути</h2>
					<p class="text-sm text-gray-600">Задай href, target, rel, та ін. і протестуй поведінку в preview (iframe) або відкрий в реальному вікні.</p>
				</div>
				<div class="text-gray-500">{opened.live ? '−' : '+'}</div>
			</button>
			{#if opened.live}
				<div id="live-section" class="p-4 border-t bg-white space-y-3">
					<div class="grid md:grid-cols-2 gap-4">
						<div>
							<label class="block text-sm font-medium mb-1">href</label>
							<input class="w-full rounded border p-2" bind:value={href} />
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">Link text</label>
							<input class="w-full rounded border p-2" bind:value={linkText} />
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">target</label>
							<select class="w-full rounded border p-2" bind:value={target}>
								<option value="_self">_self (same tab)</option>
								<option value="_blank">_blank (new tab)</option>
								<option value="_parent">_parent</option>
								<option value="_top">_top</option>
								<option value="">(empty)</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">rel</label>
							<input class="w-full rounded border p-2" bind:value={rel} placeholder="noopener noreferrer nofollow" />
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">download (optional)</label>
							<input class="w-full rounded border p-2" bind:value={download} placeholder="report.pdf" />
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">hreflang (optional)</label>
							<input class="w-full rounded border p-2" bind:value={hreflang} placeholder="en, fr" />
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">referrerpolicy (optional)</label>
							<select class="w-full rounded border p-2" bind:value={referrerpolicy}>
								<option value="">(default)</option>
								<option value="no-referrer">no-referrer</option>
								<option value="origin">origin</option>
								<option value="strict-origin-when-cross-origin">strict-origin-when-cross-origin</option>
								<option value="same-origin">same-origin</option>
								<option value="strict-origin">strict-origin</option>
								<option value="no-referrer-when-downgrade">no-referrer-when-downgrade</option>
								<option value="unsafe-url">unsafe-url</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">type (optional)</label>
							<input class="w-full rounded border p-2" bind:value={typeHint} placeholder="text/html" />
						</div>
					</div>

					<div class="flex gap-2 mt-3">
						<button class="bg-blue-600 text-white px-3 py-2 rounded" on:click={openLinkDemo}>Open/Go (demo)</button>
						<button class="bg-gray-200 px-3 py-2 rounded" on:click={downloadPreviewHtml}>Download preview HTML</button>
						<button class="bg-white border px-3 py-2 rounded" on:click={reset}>Reset</button>
					</div>

					<div class="mt-4 border rounded overflow-hidden">
						<div class="text-xs p-2 bg-gray-50 border-b">
							Iframe preview (sandbox). <strong>Примітка:</strong> якщо iframe у sandbox блокує відкриття в новій вкладці, використовуйте кнопку "Open/Go".
						</div>
						<iframe
							class="w-full min-h-48"
							srcdoc={previewSrcdoc}
							title="Anchor live preview"
							sandbox="allow-scripts allow-forms allow-popups"
						></iframe>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<footer class="text-sm text-gray-500 mt-6">
		<p>Цей компонент — інтерактивний довідник для <code>&lt;a&gt;</code>. Можна доповнити прикладами, ESLint/AXE правилами або тестами Playwright — скажи, якщо хочеш, і я додам.</p>
	</footer>
</div>