export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

enum Payment {
	ONLINE = 'Онлайн',
	OFFLINE = 'При получении'
}

export interface IAppState {
	cart: IProduct[];
	store: IProduct[];
	order: IOrderForm;
	formErrors: FormErrors;

	addToCart(item: IProduct): void;
	deleteFromCart(item: IProduct): void;
	clearCart(): void
	getCartAmount(): void;
	getCartTotalPrice(): void;
	setItems(): void;
	refreshCart(): void;

}

export interface IView {
	render(data?: object): HTMLElement;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface ApiResponse {
	items: IProduct[];
}

export interface ICart {
	items: IProduct[];
	add(item: IProduct): void;
	delete(item: IProduct): void;
}

export interface IProduct {
	id: string;
	category: Category;
	title: string;
	image: string;
	price: number | null;
	selected: boolean;
}

export interface ICard {
	id: string;
	title: HTMLElement;
	category: HTMLElement;
	image: HTMLImageElement;
	price: number | null;
	selected: boolean;
}

export interface ICartItem {
	id: string;
	title: string;
	price: number | null;
	deleteButton: HTMLButtonElement;
}

export interface ICatalog {
	items: IProduct[];
	setItems(item: IProduct[]): void;
	getProducts(id: string): IProduct;
}

export interface IOrderForm {
	payment: Payment;
	address: string;
	email: string;
	phone: string;
}