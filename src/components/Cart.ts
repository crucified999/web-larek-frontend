import { IProduct, ICart, IView, ApiResponse } from '../types';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';


class Cart implements ICart {

	items: IProduct[] = [];

	constructor(protected events: IEvents) {}

	add(item: IProduct): void {
		this.items.push(item);

		this.events.emit('cart:changed', this.items);
	}

	delete(id: string) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].id === id) {
				this.items.splice(i, 1);
				break;
			}
		}

		this.events.emit('cart:changed', this.items);
		this.events.emit('cart:delete');
	}

	refreshOrder() {
		this.items = [];

		this.events.emit('cart:changed', this.items);
	}

	getTotalPrice() {
		let total = 0;

		for (let i = 0; i < this.items.length; i++) {
			total += this.items[i].price;
		}

		return total;
	}
}

class CartView implements IView {
	protected _content: HTMLElement;

	constructor(protected container: HTMLElement) {}

	render(data: { items: HTMLElement[] }): HTMLElement {

		data.items.forEach((item) => {
			this._content.appendChild(item);
		});

		this.container.appendChild(this._content);

		return this.container;
	}
}