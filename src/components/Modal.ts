import { IModal, IView } from '../types';
import { IEvents } from './base/events';
import * as events from 'node:events';

class Modal implements IModal {
	protected _content: HTMLElement;

	constructor(selector: string, protected events: IEvents) {}

	set content(value: HTMLElement) {
		this._content = value;
	}

	showModal() {
		this._content.classList.add('modal-open');
	}

	closeModal() {
		this._content.classList.remove('modal-open');
		this._content = null;

		this.events.emit('modal:close');
	}
}

class SuccessModal implements IView {

	protected _content: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {}

	close() {
		this._content.classList.remove('modal-closed');
		this._content = null;
	}

	render(): HTMLElement {
		this.container.classList.add('modal-open');
		this.events.emit('order:success');

		return this.container;
	}
}

class ModalWithForm {
	protected _form: HTMLFormElement;
	protected _formName: string;
	protected _fields: NodeListOf<HTMLInputElement>;
	protected _submitButton: HTMLButtonElement;
	protected _errors: Record<string, HTMLElement>;

	constructor(protected container: HTMLElement, protected events: IEvents) {}

	setValid(isValid: boolean): void {
		this._submitButton.disabled = isValid;
	}

	close(): void {
		this.container.classList.remove('modal-open');
	}

	render(): HTMLElement {
		this.container.classList.add('modal-open');
		this.events.emit('cart:order');

		return this.container;
	}
}