import { IProduct, ICart } from '../../types';
import { IEvents } from '../base/events';


export class Cart implements ICart {

	items: IProduct[] = [];

	constructor(protected events: IEvents) {}

	add(item: IProduct): void {
		this.items.push(item);

		item.isInCart = true;

		this.events.emit('cart:changed', this.items);
	}

	delete(id: string) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].id === id) {
				this.items[i].isInCart = false;
				this.items.splice(i, 1);
				break;
			}
		}

		this.events.emit('cart:changed', this.items);
	}

	refreshOrder() {

		for (const product of this.items) {
			product.isInCart = false;
		}

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

