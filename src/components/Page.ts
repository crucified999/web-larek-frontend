import { IHeader, IPage } from '../types';


class Header implements IHeader {
	protected _counter = 0;
	protected _cartButton: HTMLButtonElement;

	constructor(protected container: HTMLElement) {}

	set counter(value: number) {
		this._counter = value;
	}

	set cartButton(value: HTMLButtonElement) {
		this._cartButton = value;
	}
}

class Page implements IPage {

	protected _header: HTMLElement;
	protected _catalog: HTMLElement;
	protected _locked: boolean;

	constructor(protected container: HTMLElement) {}

	set header(value: HTMLElement) {
		this._header = value;
	}

	set catalog(value: HTMLElement) {
		this._catalog = value;
	}

	set locked(value: boolean) {
		this._locked = value;
	}

	render(): HTMLElement {
		this.container.replaceChildren(...[this._header, this._catalog]);

		return this.container;
	}

}