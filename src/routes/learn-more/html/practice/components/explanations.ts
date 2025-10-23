interface IExplanations {
    header: {
        tag: string;
        desc: string;
        semantics: string;
        attributes: string;
        example: string;
    }[];
    form: {
        tag: string;
        desc: string;
        semantics: string;
        attributes: string;
        example: string;
    }[];
}

export const explanations: IExplanations = {
    header: [
        {
            tag: '<header>',
            desc: 'Контейнер для верхньої частини сторінки (логотип, меню).',
            semantics: 'Семантичний тег для вступного вмісту. Покращує SEO.',
            attributes: '<code>id</code>, <code>class</code>, <code>aria-label</code>. Наприклад, <code>&lt;header id="main-header"&gt;</code>.',
            example: 'Хедер сайту: <code>&lt;header&gt;&lt;nav&gt;...&lt;/nav&gt;&lt;/header&gt;</code>.'
        },
        {
            tag: '<img>',
            desc: 'Вставляє зображення (логотип, іконка).',
            semantics: 'Потребує <code>alt</code> для доступності.',
            attributes: '<code>src</code>, <code>alt</code>, <code>width</code>. Наприклад, <code>&lt;img src="logo.png" alt="Логотип"&gt;</code>.',
            example: 'Логотип: <code>&lt;img src="logo.png" alt="Логотип"&gt;</code>.'
        },
        {
            tag: '<nav>',
            desc: 'Контейнер для навігаційних посилань.',
            semantics: 'Семантичний тег для меню. Використовуй <code>aria-label</code>.',
            attributes: '<code>id</code>, <code>aria-label</code>. Наприклад, <code>&lt;nav aria-label="Головне меню"&gt;</code>.',
            example: 'Меню: <code>&lt;nav&gt;&lt;ul&gt;...&lt;/ul&gt;&lt;/nav&gt;</code>.'
        },
        {
            tag: '<ul>',
            desc: 'Ненумерований список для пунктів меню.',
            semantics: 'Семантичний тег для списків із <code>&lt;li&gt;</code>.',
            attributes: '<code>id</code>, <code>class</code>. Наприклад, <code>&lt;ul id="menu"&gt;</code>.',
            example: 'Список: <code>&lt;ul&gt;&lt;li&gt;...&lt;/li&gt;&lt;/ul&gt;</code>.'
        },
        {
            tag: '<li>',
            desc: 'Елемент списку в <code>&lt;ul&gt;</code>.',
            semantics: 'Позначає пункт списку.',
            attributes: '<code>id</code>, <code>class</code>. Наприклад, <code>&lt;li class="menu-item"&gt;</code>.',
            example: 'Пункт: <code>&lt;li&gt;&lt;a href="/about"&gt;Про нас&lt;/a&gt;&lt;/li&gt;</code>.'
        },
        {
            tag: '<a>',
            desc: 'Гіперпосилання для переходу.',
            semantics: 'Семантичний тег для навігації. Потребує <code>href</code>.',
            attributes: '<code>href</code>, <code>target</code>, <code>aria-current</code>. Наприклад, <code>&lt;a href="/home"&gt;</code>.',
            example: 'Посилання: <code>&lt;a href="/contact"&gt;Контакти&lt;/a&gt;</code>.'
        },
        {
            tag: '<select>',
            desc: 'Випадаючий список для вибору опції.',
            semantics: 'Семантичний тег для форм.',
            attributes: '<code>id</code>, <code>name</code>, <code>required</code>. Наприклад, <code>&lt;select name="language"&gt;</code>.',
            example: 'Мова: <code>&lt;select&gt;&lt;option&gt;Українська&lt;/option&gt;&lt;/select&gt;</code>.'
        },
        {
            tag: '<option>',
            desc: 'Опція в <code>&lt;select&gt;</code>.',
            semantics: 'Позначає варіант вибору.',
            attributes: '<code>value</code>, <code>selected</code>. Наприклад, <code>&lt;option value="uk"&gt;</code>.',
            example: 'Опція: <code>&lt;option value="en"&gt;English&lt;/option&gt;</code>.'
        }
    ],
    form: [
        {
            tag: '<form>',
            desc: 'Контейнер для елементів форми.',
            semantics: 'Семантичний тег для надсилання даних.',
            attributes: '<code>action</code>, <code>method</code>. Наприклад, <code>&lt;form action="/submit"&gt;</code>.',
            example: 'Реєстрація: <code>&lt;form method="POST"&gt;</code>.'
        },
        {
            tag: '<label>',
            desc: 'Опис для поля введення.',
            semantics: 'Покращує доступність із <code>for</code>.',
            attributes: '<code>for</code>, <code>id</code>. Наприклад, <code>&lt;label for="name"&gt;</code>.',
            example: 'Поле: <code>&lt;label for="email"&gt;Електронна пошта:&lt;/label&gt;</code>.'
        },
        {
            tag: '<input>',
            desc: 'Поле для введення даних.',
            semantics: 'Потребує <code>label</code> для доступності.',
            attributes: '<code>type</code>, <code>id</code>, <code>name</code>. Наприклад, <code>&lt;input type="text"&gt;</code>.',
            example: 'Поле: <code>&lt;input type="text" id="name"&gt;</code>.'
        },
        {
            tag: '<button>',
            desc: 'Елемент для відправлення форми.',
            semantics: 'Позначає дію. Вказуй <code>type</code>.',
            attributes: '<code>type</code>, <code>disabled</code>. Наприклад, <code>&lt;button type="submit"&gt;</code>.',
            example: 'Кнопка: <code>&lt;button type="submit"&gt;Надіслати&lt;/button&gt;</code>.'
        }
    ]
};