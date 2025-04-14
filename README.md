# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Архитектура

Код приложения разделен на слои согласно парадигме MVP.

- слой представления отвечает, отвечает за отображение данных на странице.
- слой данных, отвечает за хранение данных и изменение данных.
- презентер, отвечает за связь представления и данных.

# Базовый код

### Класс Api

Содержит в себе базовую логику отправки запросов на сервер. В конструктор передается базовый адрес сервера 
(ссылка в формате URL) и опциональный объект с заголовками запроса.

- `get` - выполняет `GET`-запрос по указанному ендпоинту и возвращает промис с объектом, которым ответил сервер&
- `post` - по умолчанию выполняет `POST`-запрос (если в третьем параметре метода не указан иной метод) и отправляет данные на сервер по указанному ендпоинту.

### Класс EventEmitter

Класс имплементирует интерфейс IEvents.\

```typescript
interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

Брокер событий, позволяет инициировать, устанавливать и снимать обработчики на различные события. Класс используется в
презентере для обработки событий и в слоях приложения для генерации событий.

- `emit<T extends object>(eventName: string, data?: T)` - позволяет инициировать событие с данными.
- ` on<T extends object>(eventName: EventName, callback: (event: T) => void)` - устанавливает обработчик на событие.
- `off(eventName: EventName, callback: Subscriber)` - cнимает обработчик с события.
- ` trigger<T extends object>(eventName: string, context?: Partial<T>)` - делает коллбек триггер, генерирующий событие при вызове.

## Слой данных

### Класс CardsCatalog

Класс имплементирует интерфейс ICardsCatalog.\

```typescript
interface ICardsCatalog {
	products: IProduct[];

	setCards(items: ICard[]): void;
	getCard(id: string): ICard;
}
```

Класс отвечает за хранение и логику работы с карточками товаров.\
Конструктор принимает объект брокера событий.\
В полях класса хранятся следующие данные:

- `_products: IProduct[]` - массив карточек товаров
- `events: IEvents` - объект брокера событий для инициализации событий при изменении данных

Так же класс предоставляет набор методов для работы с этими данными:

- `setCards(items: ICard[]): void` - добавляет в `_items` карточки товаров, данные которых приходят с сервера
- `getCard(id: string): ICard` - позволяет выбрать карточку товара по ее уникальному номеру


### Класс Сart

Класс имплементирует интерфейс ICart.

```typescript
interface ICart {
	items: string[];
	add(id: string): void;
	delete(id: string): void;
	refreshOrder(): void;
	getTotalPrice(): number;
}
```

Класс отвечает за хранение и изменение элементов, находящихся в корзине.\
Конструктор принимает объект брокера событий.\
В полях класса хранятся следующие данные:

-  `items: string[]` - хранит массив уникальных номеров товаров, добавленных в корзину

Так же класс предоставляет набор методов для работы с этими данными:

- `add(id: string): void` - добавляет в корзину товар по его уникальному номеру
- `delete(id: string): void` - удаляет из корзины товар по его уникальному номеру\
(если количество товара больше 1, то уменьшает количество на 1)
- `refreshOrder(): void` - очищает корзину после успешного оформления заказа
- `getTotalPrice(): number` - возвращает общую стоимость товаров, находящихся в корзине

### Класс Order

Класс имплементирует интерфейс IOrder.

```typescript
interface IFormState {
	valid: boolean;
	errors: string[];
}

interface IOrder extends IFormState {
	payment: Payment;
	address: string;
}
```

Класс отвечает за хранение информации о заказе.\
Конструктор принимает экземпляр класса `EventEmitter`.

Поля класса:

- `payment: Payment` - способ оплаты, который выбрал пользователь
- `address: string` - адрес доставки
- `valid: boolean` - флаг валидности формы
- `errors: string[]` - текста ошибок

Методы:

- `validate(): void` - метод валидации формы
- `get payment(): Payment` - геттер для способа оплаты
- `get address(): string` - геттер адреса

### Класс Contacts

Класс имплементирует интерфейс IContacts.

```typescript
interface IFormState {
	valid: boolean;
	errors: string[];
}

interface IOrder extends IFormState {
	phone: string;
	email: string;
}
```

Класс отвечает за хранение контактов пользователя.\
Конструктор принимает экземпляр класса `EventEmitter`.

Поля класса:

- `phone: string` - номер телефона пользователя
- `email: string` - адрес электронной почты пользователя
- `valid: boolean` - флаг валидности формы
- `errors: string[]` - текста ошибок

Методы:

- `validate(): void` - метод валидации формы
- `get phone(): string` - геттер номера телефона
- `get email(): string` - геттер адреса электронной почты

## Классы-представления

### Класс CartView

Класс имплементирует интерфейс IView.

```typescript
interface IView {
	render(data?: object): HTMLElement;
}
```

Класс отвечает за отображение корзины на главной странице.\
Конструктор принимает контейнер.

Методы:

- `render(data: { items: HTMLElement[] }): HTMLElement` - возвращает контейнер корзины с товарами.

### Класс Modal

Класс имплементирует интерфейс IModal.

```typescript
interface IModal {
	content: HTMLElement;

	showModal(): void;
	closeModal(): void;
}
```

Класс реализует модальное окно. Конструктор принимает селектор, по которому модальное окно будет идентифицировано в разметке\
и экземпляр класса `EventEmitter` для инициализации событий. 

`constructor(selector: string, events: IEvents)`

Поля класса: 

- `content: HTMLELement` - контент модального окна
- `events: IEvents` - объект брокера событий

Так же класс реализует набор методов:

- `showModal(): void` - позволяет открыть модальное окно
- `closeModal(): void` - позволяет закрыть модальное окно
- `set content(value: HTMLElement)` - сеттер для контента модального окна

### Класс SuccessModal

Предназначен для уведомления пользователя об успешной покупке.\
Конструктор принимает контейнер.

Поля класса:

- `content: HTMLElement` - контент модального окна

Методы:

- `close(): void` - закрывает модальное окно, дополнительно очищает поля ввода форм
- `render(data: object): HTMLElement` - возвращает контейнер модального окна и показывает его пользователю

### Класс ModalWithForm

Предназначен для реализации модального окна с формой, содержащей поля ввода.\
При сабмите инициирует событие, передавая в него объект с данными из полей ввода формы.\
При изменении данных в полях ввода формы инициирует событие изменения данных.\
Предоставляет методы для отображения ошибок при некорректно введенных данных в поля формы и управления доступностью\
кнопки отправки формы (свойством disabled у кнопки сабмита)

Поля класса: 

- `form: HTMLFormElement` - элемент формы
- `formName: string` - название формы (значение атрибута name у формы в верстке)
- `fields: NodeListOf<HTMLInputElement>` - поля ввода формы
- `submitButton: HTMLButtonElement` - кнопка отправки формы
- `errors: Record<string, HTMLElement>` - объект, хранящий все элементы для вывода ошибок под полями формы\
с привязкой к атрибуту name у поля ввода в верстке

Методы:

- `setValid(isValid: boolean): void` - изменяет активность кнопки сабмита


### Класс ModalOrderConfirm

Расширяет класс Modal. Предназначен для модального окна с формой с подтверждения оплаты заказа.\
При открытии модального окна сохраняет полученный в параметрах обработчик, который передается для выполнения\
при сабмите формы.

Поля класса:

- `_form: HTMLFormElement` - элемент формы
- `formName: string` - название формы (значение атрибута name у формы в верстке)
- `submitButton: HTMLButtonElement` - кнопка отправки формы
- `handleSubmit: Function` - функция, на выполнение которой запрашивается подтверждения

Методы:

- `setValid(isValid: boolean): void` - изменяет активность кнопки сабмита
- `showModal(handleSubmit: Function)` - переопределение родительского метода `showModal`, принимает функцию-обработчик, \
которая передается при инициации события подтверждения оплаты

### Класс Card

Класс имплементирует интерфейс IView.

```typescript
interface IView {
	render(data?: object): HTMLElement;
}
```

Класс отвечает за отображение карточки на главной странице.\
В конструктор класса передается DOM-элемент темплейта и экземпляр класса `EventEmitter` для инициации событий.\
Полями класса являются элементы разметки элементов карточки товара.

Методы:

- `render(data: IProduct): HTMLElement` - возвращает элемент карточки с заполненными атрибутами


### Класс CardPreview

Класс имплементирует интерфейс IView.

```typescript
interface IView {
	render(data?: object): HTMLElement;
}
```

Отвечает за отображение превью карточки товара.
Конструктор принимает DOM-элемент темплейта превью карточки и экземпляр класса `EventEmitter` для инициации событий.
Полями класса являются элементы разметки элементов превью карточки товара.

Методы:

- `render(data: ICardPreview): HTMLElement` - возвращает элемент карточки с заполненными атрибутами

### Класс StoreCard 

Класс имплементирует интерфейс IView.

```typescript
interface IView {
	render(data?: object): HTMLElement;
}
```
Отвечает за отображение элемента карточки товара в корзине.
Конструктор принимает DOM-элемент темплейта карточки товара в корзине и экземпляр класса `EventEmitter` для инициации событий.
Полями класса являются элементы разметки элементов карточки товара в корзине.

Методы:

- `render(data: IStoreCard): HTMLElement` - возвращает элемент карточки с заполненными атрибутами

### Класс CardsCatalog

Класс имплементирует интерфейс IView.

```typescript
interface IView {
	render(data?: object): HTMLElement;
}
```

Отвечает за отображения каталога с карточками на главной странице.\
В конструктор принимает контейнер, в котором будут располагаться карточки товаров.

Методы:

- `render(data: ICardsCatalog): HTMLElement` - возращает контейнер с карточками

### Класс Header

Класс имплементирует интерфейс IHeader.

```typescript
interface IHeader {
	counter: number;
	cartButton: HTMLButtonElement;
}
```

Класс отвечает за отображения хедера главной страницы.\
Конструктор принимает контейнер.\

Поля класса:

- `counter: number` - счетчик, показывающий количество товаров в корзине
- `cartButton: HTMLButtonElement` - кнопка открытия корзины

Методы:

- `set counter(value: number)` - сеттер счетчика корзины с товарами
- `set cartButton(value: HTMLButtonElement)` - сеттер кнопки открытия корзины с товарами

### Класс Page

Класс имплементирует интерфейс IPage.

```typescript
interface IPage {
	header: HTMLElement;
	catalog: HTMLElement;
	locked: boolean;
}
```

Класс отвечает за отображение главной страницы приложения.\
Конструктор принимает контейнер и экземпляр класса `EventEmitter`.\

Поля класса:

- `header: HTMLElement` - хедер главной страницы
- `catalog: HTMLElement` - каталог с карточками товаров
- `locked: boolean` - флаг доступа прокрутки страницы

Методы класса:

- `set header(value: HTMLElement)` - сеттер для хедера страницы
- `set catalog(value: HTMLElement)` - сеттер для каталога с карточками товаров
- `set locked(value: boolean)` - сеттер для блокировки прокрутки страницы 
- `render(): HTMLElement` - возвращает главную страницы с заполненными хедером и каталогом

## Cлой коммуникации

### Класс AppApi

Конструктор принимает экземпляр класса Api и предоставляет методы, реализующие взаимодействие с сервером.

## Взаимодействие компонентов

Код, описывающий взаимодействие представления и данных между собой находится в файле `/src/index.ts`,\
выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий, генерируемых с помощью брокера событий и обработчика этих событий, описанных\
в `/src/index.ts`\
В `/src/index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами-моделями данных)*

- `cart:changed` - изменение количества товара в корзине
- `cards:changed` - загрузка товаров из сервера и их добавление в каталог товаров

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, \
отвечающими за представления)*

- `card:select` - пользователь нажимает на карточку, что приводит к открытию модального окна
- `card:toCart` - пользователь помещает товар в корзину, что приводит к обновлению счетчика товаров в корзине
- `cart:open` - пользователь нажимает на иконку корзины, что приводит к отображению модального окна со списком товаров
- `cart:delete` - пользователь удаляет товар из корзины, что приводит к обновлению счетчика товаров в корзине
- `cart:order` - пользователь нажимает на кнопку `Оформить`, что приводит к открытию модального окна с формой\
для заполнения адреса и способа оплаты
- `order:submit` - пользователь нажимает на кнопку далее, что приводит к открытию модального окна с формой\
для заполнения адреса электронной почты и номера телефона пользователя
- `order:success` - открывается модальное окно, информирующее пользователя об успешной оплате
- `contacts:submit` - пользователь нажимает на кнопку `Оплатить`, что приводит к открытию модального окна\
с подтверждением успешной покупки
- `input:changed` - пользователь вводит данные в форму, что приводит к появлению ошибок (если пользователь\
вводит некорректные данные)
- `modal:close` - пользователь закрывает модальное окно