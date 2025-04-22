import { IEvents } from '../base/events';
import { cloneTemplate } from '../../utils/utils';

export class Form<T> {
	protected _form: HTMLFormElement;
	protected _formName: string;
	protected _fields: NodeListOf<HTMLInputElement>;
	protected _submitButton: HTMLButtonElement;
	protected _errors: HTMLSpanElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this._form = cloneTemplate(template);
		this._formName = this._form.name;
		this._fields = this._form.querySelectorAll('input');
		this._submitButton = this._form.querySelector('button[type="submit"]');
		this._errors = this._form.querySelector('.form__errors');

		this._form.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;

			this.events.emit(`${this._formName}Input:change`, {
				field,
				value,
			});

		});

		this._submitButton.addEventListener('click', (e: Event) => {
			e.preventDefault();

			this.events.emit(`${this._formName}:submit`);
		});

	}

	clearInputs() {
		for (const input of this._fields) {
			input.value = '';
		}
	}

	disableSubmitButton() {
		this._submitButton.disabled = true;
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this._formName}Input:change`, {
			field,
			value,
		})
	}

	set valid(isValid: boolean) {
		this._submitButton.disabled = !isValid;
	}

	set errors(value: string) {
		this._errors.textContent = String(value);
	}

	render(): HTMLElement {
		return this._form;
	}
}