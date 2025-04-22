import { IView } from '../../types';
import { cloneTemplate, handlePrice } from '../../utils/utils';
import { IEvents } from '../base/events';

export class CartView implements IView {
	protected _content: HTMLElement;
	protected _cartList: HTMLElement;
	protected _orderButton: HTMLButtonElement;
	protected _totalPrice: HTMLSpanElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this._content = cloneTemplate(template);

		this._cartList = this._content.querySelector('.basket__list');
		this._orderButton = this._content.querySelector('.basket__button');
		this._totalPrice = this._content.querySelector('.basket__price');

		this._orderButton.addEventListener('click', () => {
			this.events.emit('cart:order');
		});

	}

	render(data: { content: HTMLElement[] }): HTMLElement {

		let totalPrice = 0;

		this._cartList.replaceChildren(...data.content);

		if (data.content.length === 0) {
			this._orderButton.disabled = true;
		} else {
			this._orderButton.disabled = false;

			data.content.forEach((item) => {
				totalPrice += parseInt(item.querySelector('.card__price').textContent.split(' ').join(''));
			});
		}

		this._totalPrice.textContent = handlePrice(String(totalPrice)) + ' синапсов';

		return this._content;
	}
}