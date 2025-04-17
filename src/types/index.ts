export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
export type TOrderInfo = Pick<IOrder, 'address'>;
export type TContactsInfo = Pick<IContacts, 'phone' | 'email'>;

export enum Payment {
	ONLINE = 'Онлайн',
	OFFLINE = 'При получении'
}

export interface IView {
	render(data?: object): HTMLElement;
}

export interface IHeader {
	counter: number;
	cartButton: HTMLButtonElement;
}

export interface IPage {
	header: HTMLElement;
	catalog: HTMLElement;
	locked: boolean;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
	checkValidation<T>(data: Record<keyof T, string>): boolean;
}

export interface ApiResponse {
	items: IProduct[];
}

export interface ICart {
	items: IProduct[];
	add(item: IProduct): void;
	delete(id: string): void;
	refreshOrder(): void;
	getTotalPrice(): number;
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
	index: string;
	category: Category;
	title: string;
	price: number | null;
	selected: boolean;
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

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IOrder extends IFormState {
	payment: Payment;
	address: string;
}

export interface IContacts extends IFormState {
	email: string;
	phone: string;
}