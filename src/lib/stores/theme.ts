import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | null; // null — поки не визначено

const theme = writable<Theme>(null);

if (browser) {
	const saved = localStorage.getItem('theme') as Theme | null;
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const initial = saved ?? (prefersDark ? 'dark' : 'light');

	theme.set(initial);

	theme.subscribe((value) => {
		if (!value) return;
		document.documentElement.classList.toggle('dark', value === 'dark');
		localStorage.setItem('theme', value);
	});

	// слідкуємо за змінами системної теми
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		theme.update((current) => current ?? (e.matches ? 'dark' : 'light'));
	});
}

export { theme };
