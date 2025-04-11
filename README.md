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

# Документация

## 1. Основные типы данных.

### Category

Определяет категории товаров.

```
type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
```

- ``` софт-скил ``` — товары, связанные с программными навыками.

- ``` хард-скил ``` — товары, связанные с аппаратными навыками.

- ``` дополнительное ``` — сопутствующие товары.

- ``` кнопка ``` — виртуальные товары.

- ``` другое ``` — прочие товары.

### FormErrors

Используется для валидации формы заказа.

```
type FormErrors = Partial<Record<keyof IOrderForm, string>>;
```
- Хранит ошибки валидации для каждого поля формы (address, email, phone, payment).

- ``` Partial<> ``` означает, что не все поля обязательны.

## 2. Перечисления

### Payment

```
enum Payment {
    ONLINE = 'Онлайн',
    OFFLINE = 'При получении'
}
```

- ``` ONLINE ``` - для оплаты онлайн
- ``` OFFLINE ``` - для оплаты при получении

## 3. Интерфейсы

### IAppState

Описывает глобальное состояние приложения.

```
interface IAppState {
    cart: IProduct[];          // Товары в корзине
    store: IProduct[];         // Все товары в магазине
    order: IOrderForm;         // Данные заказа
    formErrors: FormErrors;    // Ошибки валидации формы

    // Методы:
    addToCart(item: IProduct): void;       // Добавить товар в корзину
    deleteFromCart(item: IProduct): void; // Удалить товар из корзины
    clearCart(): void;                    // Очистить корзину
    getCartAmount(): void;                // Получить количество товаров в корзине
    getCartTotalPrice(): void;            // Получить общую стоимость корзины
    setItems(): void;                     // Загрузить товары в магазин
    refreshCart(): void;                  // Обновить состояние корзины
}
```

### IView

Базовый интерфейс для отображения компонентов.

```
interface IView {
  render(data?: object): HTMLElement;
}
```

### IFormState

Описывает состояние формы.

```
interface IFormState {
    valid: boolean;    // Флаг валидности формы
    errors: string[];  // Список ошибок
}
```

### ApiResponse 

Описывает интерфейс данных, полученных с сервера.

```
interface ApiResponse {
  items: IProduct[] // Товары, полученные с сервера
}
```

### ICart

Описывает интерфейс корзины с товарами.

```
interface ICart {
  items: IProduct[]; // Товары, находящиеся в корзине
  add(item: IProduct): void; // Метод добавления товара в корзину
  dekete(item: IProduct): void; // Метод удаления товара из корзины
}
```

### IProduct 

Описывает интерфейс товара.

```
interface IProduct {
    id: string;           // Уникальный идентификатор
    category: Category;   // Категория (см. `Category`)
    title: string;        // Название товара
    image: string;        // URL изображения
    price: number | null; // Цена (может быть null, если товар бесценный)
    selected: boolean;    // Флаг выбора (товар уже есть в корзине или нет)
{
```

### ICard

Описывает интерфейс карточки товара.

```
interface ICard {
    id: string;                   // ID товара
    title: HTMLElement;           // DOM-элемент названия
    category: HTMLElement;        // DOM-элемент категории
    image: HTMLImageElement;      // DOM-элемент изображения
    price: number | null;         // Цена (может быть null, если товар бесценный)
    selected: boolean;            // Флаг выбора (товар уже есть в корзине или нет)
}
```

### ICartItem

Описывает интерфейс товара в корзине.

```
interface ICartItem {
    id: string;                       // ID товара
    title: string;                    // Название
    price: number | null;             // Цена
    deleteButton: HTMLButtonElement;  // Кнопка удаления
}
```

### ICatalog 

Описывает интерфейс каталога с товарами на главной странице.

```
interface ICatalog {
    items: IProduct[];                     // Список товаров
    setItems(item: IProduct[]): void;      // Установить товары
    getProducts(id: string): IProduct;     // Получить товар по ID
} 
```

### IOrderForm

Форма заказа товара.

```
interface IOrderForm {
    payment: Payment;  // Способ оплаты (см. `Payment`)
    address: string;   // Адрес доставки
    email: string;     // Email покупателя
    phone: string;     // Телефон покупателя
}
```
