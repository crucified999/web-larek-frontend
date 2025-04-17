import { ICardsCatalog, IProduct, IView } from '../types';
import { IEvents } from './base/events';

class CardsCatalog implements ICardsCatalog {

	products: IProduct[] = [];

	constructor(protected events: IEvents) {}

	setItems(items: IProduct[]) {
		this.products = items;

		this.events.emit('cards:changed', this.products);
	}

	getItem(id: string): IProduct {
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].id === id) {
				return this.products[i];
			}
		}
	}
}

class CardsCatalogView implements IView {

	constructor(protected container: HTMLElement) {}

	render(data: HTMLElement[]): HTMLElement {
		this.container.replaceChildren(...data);

		return this.container;
	}
}