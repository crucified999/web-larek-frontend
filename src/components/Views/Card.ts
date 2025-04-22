import { IView, IProduct, IActions } from '../../types';
import { IEvents } from '../base/events';
import { cloneTemplate } from '../../utils/utils';
import { CDN_URL, categories } from '../../utils/constants';
import { handlePrice } from '../../utils/utils';

export class Card implements IView {

	protected _content: HTMLElement;

	protected _category: HTMLSpanElement;
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLSpanElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents, actions: IActions) {
		this._content = cloneTemplate(template);

		this._category = this._content.querySelector('.card__category');
		this._title = this._content.querySelector('.card__title');
		this._image = this._content.querySelector('.card__image');
		this._price = this._content.querySelector('.card__price');

		this._content.addEventListener('click', actions.onClick);

	}



	render(data: IProduct) {

		this._category.classList.add(`card__category${categories[data.category]}`);
		this._category.textContent = data.category;
		this._title.textContent = data.title;
		this._image.src = CDN_URL + data.image;
		this._image.alt = data.title;
		this._price.textContent = data.price == null ? 'Бесценно' : handlePrice(String(data.price)) + ' синапсов';

		return this._content;
	}

}

export class CardPreview implements IView {

	protected _content: HTMLElement;

	protected _category: HTMLSpanElement;
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLSpanElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, protected actions: IActions) {
		this._content = cloneTemplate(template);

		this._category = this._content.querySelector('.card__category');
		this._title = this._content.querySelector('.card__title');
		this._image = this._content.querySelector('.card__image');
		this._price = this._content.querySelector('.card__price');
		this._description = this._content.querySelector('.card__text');
		this._button = this._content.querySelector('.card__button');

		this._button.addEventListener('click', this.actions.onClick);


	}


	render(data: IProduct) {
		this._category.classList.add(`card__category${categories[data.category]}`);
		this._category.textContent = data.category;
		this._title.textContent = data.title;
		this._image.src = CDN_URL + data.image;
		this._image.alt = data.title;
		this._price.textContent = data.price == null ? 'Бесценно' : handlePrice(String(data.price)) + ' синапсов';
		this._description.textContent = data.description;

		this._button.disabled = data.isInCart;

		if (this._button.disabled) {
			this._button.textContent = 'Товар уже в корзине';
		}

		if (this._price.textContent === 'Бесценно') {
			this._button.removeEventListener('click', this.actions.onClick);
		}

		return this._content;
	}

}

export class StoreCard implements IView {

	protected _content: HTMLElement;

	protected _index: HTMLSpanElement;
	protected _title: HTMLElement;
	protected _price: HTMLSpanElement;
	protected _deleteButton: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents, actions: IActions) {
		this._content = cloneTemplate(template);

		this._index = this._content.querySelector('.basket__item-index');
		this._title = this._content.querySelector('.card__title');
		this._price = this._content.querySelector('.card__price');
		this._deleteButton = this._content.querySelector('.basket__item-delete');

		this._deleteButton.addEventListener('click', actions.onClick);
	}

	set index(value: number) {
		this._index.textContent = String(value);
	}

	render(data: IProduct) {
		// this._index.textContent = String(data.index);
		this._title.textContent = data.title;
		this._price.textContent = data.price == null ? 'Бесценно' : handlePrice(String(data.price)) + ' синапсов';

		return this._content;
	}
}