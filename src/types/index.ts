export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
// export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

enum Payment {
	ONLINE = 'Онлайн',
	OFFLINE = 'При получении'
}

export interface IView {
	render(data?: object): HTMLElement;
}

export interface IHeader {
	cart: ICart;
	homePage: HTMLAnchorElement;
}

export interface IPage {
	header: IHeader;
	catalog: ICardsCatalog;
	locked: boolean;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface ApiResponse {
	items: IProduct[];
}

export interface ICart {
	items: Map<string, number>;
	add(id: string): void;
	delete(id: string): void;
}

export interface IProduct {
	id: string;
	category: Category;
	title: string;
	image: string;
	price: number | null;
	selected: boolean;
}

export interface ICardPreview extends IProduct {
	description: string;
}

export interface IStoreCard {
	id: string;
	category: Category;
	title: string;
	price: number | null;
	selected: boolean;
}

// export interface ICard {
// 	id: string;
// 	category: Category;
// 	title: string;
// 	image: string;
// 	price: number | null;
// 	selected: boolean;
// }

export interface ICartItem {
	id: string;
	title: string;
	price: number | null;
	deleteButton: HTMLButtonElement;
}

export interface ICardsCatalog {
	products: IProduct[];

	setCards(items: IProduct[]): void;
	getCard(id: string): IProduct;
}

export interface IModal {
	content: HTMLElement;

	showModal(): void;
	closeModal(): void;
}

// export interface IModalWithForm {
// 	form: HTMLFormElement;
// 	formName: string;
// 	fields: NodeListOf<HTMLInputElement>;
// 	submitButton: HTMLButtonElement;
// 	errors: Record<string, HTMLElement>;
// }

// export interface IOrderForm {
// 	payment: Payment;
// 	address: string;
// 	email: string;
// 	phone: string;
// }