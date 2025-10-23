export type Explanation = {
	html: string[];
	css: string[];
};

export type ExampleKey = 'header' | 'form';

export const explanations: Record<ExampleKey, Explanation> = {
	header: {
		html: [
			'Тег <header> використовується для верхньої частини сторінки.',
			'<nav> містить навігаційні посилання.'
		],
		css: [
			'Flexbox вирівнює елементи горизонтально.',
			'Блакитний фон робить дизайн чистішим.'
		]
	},
	form: {
		html: [
			'Тег <form> використовується для збору даних користувача.',
			'Тег <input> створює поле введення тексту.'
		],
		css: [
			'Використано колонки через flex-direction: column;',
			'Кнопка має градієнтний фон для акценту.'
		]
	}
};
