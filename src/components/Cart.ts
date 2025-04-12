// import { ICart } from '../types';
// import { IView } from '../types';
// import { IEvents } from './base/events';
//
//
// class Cart implements ICart {
// 	protected _items: Map<string, number> = new Map();
//
// 	constructor(protected events: IEvents) {}
//
// 	add(id: string) {
// 		if (!this._items.get(id)) {
// 			this._items.set(id, 1);
// 		} else {
// 			this._items.set(id, this._items.get(id) + 1);
// 		}
//
// 		this.events.emit('cart:changed', { items: this._items });
// 	}
//
// 	delete(id: string) {
// 		if (!this._items.get(id)) { return; }
//
// 		if (this._items.get(id) > 1) {
// 			this._items.set(id, this._items.get(id) - 1);
// 		} else if (this._items.get(id) - 1 === 0) {
// 			this._items.delete(id);
// 		}
//
// 		this.events.emit('cart:changed', { items: this._items });
// 	}
// }