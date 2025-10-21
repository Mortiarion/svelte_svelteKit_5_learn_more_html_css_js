<script lang="ts">
	import CssSection from '$lib/components/landing/CssSection.svelte';
	import HtmlSection from '$lib/components/landing/HtmlSection.svelte';
	import JsSection from '$lib/components/landing/JsSection.svelte';
	import NodeJsSection from '$lib/components/landing/NodeJsSection.svelte';
	import SvelteSection from '$lib/components/landing/SvelteSection.svelte';
	import TsSection from '$lib/components/landing/TsSection.svelte';
    
</script>

<h1 class="mb-5">Ландінг пейдж для того що нас очікує на платформі</h1>

<a href="/learn-more" class="underline">learn more</a>

<p class="mt-5">
	Тут буде розміщено інформацію про те що нас очікує на платформі для навчання веб розробці.
	Платформа буде містити справочну інформацію по HTML, CSS, JS, SVELTE 5, SVELTEKIT, TS, NODE.JS,
	EXPRESS, POSTGRESS DB. Кожен курс буде містити теоретичний матеріал, практичні завдання та проекти
	для закріплення знань. Платформа буде мати зручний інтерфейс, адаптивний дизайн та підтримку
	темної/світлої теми. Реєстрація на платформі буде безкоштовною, а також буде можливість отримати
	сертифікат про проходження курсу.
</p>

<p class="mt-5">
	Запрошуємо всіх бажаючих приєднатися до нашої платформи та розпочати свій шлях у світі веб
	розробки!
</p>

<p class="mt-5 italic">
	На лендінг пейдж буде короткий опис платформи і що буде на платформі і для чого. Може зробити
	розділення на блоки. Справочна інформація по технологіям. Приклади використання. Думаю що ще
	потрібно приклад сайтів. Кастомні елементи щось типу codePen. Ще в планах штучний інтелект який
	буде заточений сугубо під ці технології. Місячна підписка, річна.
</p>

<p class="mt-5 italic">
	Ще є думки зробити сторінку з іграми для html, css інших технологій щоб можна було наглядно на
	платформі потренуватись.
</p>

<HtmlSection />

<CssSection />

<JsSection />

<TsSection />

<SvelteSection />

<NodeJsSection />
