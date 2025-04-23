export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export interface IView {
	render(data?: object): HTMLElement;
}

export interface IHeader {
	counter: number;
	cartButton: HTMLButtonElement;
}

export interface IPage {
	header: HTMLElement;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface IFormState<T> {
	valid: boolean;
	errors: T
}

export interface ApiResponse {
	items: IProduct[];
}

export interface ICart {
	items: IProduct[];
	add(item: IProduct): void;
	delete(id: string): void;
	clearCart(): void;
	getTotalPrice(): number;
}

export interface IProduct {
	id: string;
	index?: number;
	category?: Category;
	title: string;
	image?: string;
	description?: string;
	price: number | null;
	isInCart: boolean;
}

export interface IActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICardsCatalog {
	products: IProduct[];

	setItems(items: IProduct[]): void;
	getItem(id: string): IProduct;
}

export interface IModal {
	content: HTMLElement;

	showModal(): void;
	closeModal(): void;
}

export interface IOrder {
	payment: string;
	address: string;
}

export interface IContacts {
	email: string;
	phone: string;
}