import { IView, IProduct, ICardPreview, IStoreCard, ICardsCatalog } from '../types';
import { IEvents } from './base/events';

class Card implements IView {

	protected _content: HTMLElement;

	category: HTMLSpanElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLSpanElement;

	constructor(protected template: HTMLTemplateElement, protected events: IEvents) {
		this._content = template.content.cloneNode(true) as HTMLElement;

		this.category = this._content.querySelector('.card__category');
		this.title = this._content.querySelector('.card__title');
		this.image = this._content.querySelector('.card__image');
		this.price = this._content.querySelector('.card__price');
	}

	render(data: IProduct) {

		this.category.textContent = data.category;
		this.title.textContent = data.title;
		this.image.src = data.image;
		this.image.alt = data.title;
		this.price.textContent = data.price == null ? 'Бесценно' : String(data.price);

		return this._content;
	}

}

class CardPreview implements IView {

	protected _content: HTMLElement;

	category: HTMLSpanElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLSpanElement;
	description: HTMLElement;

	constructor(protected template: HTMLTemplateElement) {
		this._content = template.content.cloneNode(true) as HTMLElement;
		this.category = this._content.querySelector('.card__category');
		this.title = this._content.querySelector('.card__title');
		this.image = this._content.querySelector('.card__image');
		this.price = this._content.querySelector('.card__price');
		this.description = this._content.querySelector('.card__text');

	}

	render(data: ICardPreview) {
		this.category.textContent = data.category;
		this.title.textContent = data.title;
		this.image.src = data.image;
		this.image.alt = data.title;
		this.price.textContent = String(data.price);
		this.description.textContent = data.description;

		return this._content;
	}

}

class StoreCard implements IView {

	protected _content: HTMLElement;

	index: HTMLSpanElement;
	category: HTMLSpanElement;
	title: HTMLElement;
	price: HTMLSpanElement;

	constructor(protected template: HTMLTemplateElement) {
		this._content = template.content.cloneNode(true) as HTMLElement;

		this.index = this._content.querySelector('.basket__item-index');
		this.category = this._content.querySelector('.card__category');
		this.title = this._content.querySelector('.card__title');
		this.price = this._content.querySelector('.card__price');
	}

	render(data: IStoreCard) {
		this.index.textContent = data.index;
		this.category.textContent = data.category;
		this.title.textContent = data.title;
		this.price.textContent = data.price == null ? 'Бесценно' : String(data.price);

		return this._content;
	}
}