import validate from 'validate.js'
import { IContacts, IOrder } from '../../types';
import { IEvents } from '../base/events';
import { constraintsContacts } from '../../utils/constants';
import { data } from 'autoprefixer';


export class Contacts implements IContacts {

	valid: boolean;
	errors: IContacts = {
		email: '',
		phone: '',
	};

	protected _email: string;
	protected _phone: string;

	constructor(protected events: IEvents) {}

	private checkValidation() {

		this.errors.email = this.checkEmail(this._email);
		this.errors.phone = this.checkPhone(this._phone);

		this.events.emit('contactsErrors:change', this.errors);

	}

	private checkEmail(value: string) {
		const result = validate.single(value, constraintsContacts.email);

		if (result) {
			return result[0];
		} else {
			return '';
		}
	}

	private checkPhone(value: string) {
		const result = validate.single(value, constraintsContacts.phone);

		if (result) {
			return result[0];
		} else {
			return '';
		}
	}

	setField(data: { field: keyof IContacts, value: string }) {
		switch (data.field) {
			case 'email':
				this._email = data.value;
				break;
			case 'phone':
				this._phone = data.value;
				break;
		}

		this.checkValidation();
	}

	clearData() {
		for (const key in this) {
			if (typeof this[key] === 'string') {
				this[key] = null;
			}
		}
	}

	set phone(value: string) {
		this._phone = value;
	}

	get phone() {
		return this._phone;
	}

	set email(value: string) {
		this._email = value;
	}

	get email() {
		return this._email;
	}

}