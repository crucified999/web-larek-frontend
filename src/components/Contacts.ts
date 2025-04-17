import validate from 'validate.js'
import { IContacts, TContactsInfo } from '../types';
import { IEvents } from './base/events';
import { constraintsContacts, constraintsOrder } from '../utils/constants';


class Contacts implements IContacts {

	valid: boolean;
	errors: string[];

	protected _email: string;
	protected _phone: string;

	constructor(protected events: IEvents) {}

	checkValidation<TContactsInfo>(data: Record<keyof TContactsInfo, string>) {
		this.valid = !validate(data, constraintsContacts);

		return this.valid;
	}

	checkPhone(value: string) {
		const result = validate.single(value, constraintsContacts.phone);

		if (result) {
			this.errors = result;

			return this.errors[0];
		} else {
			return '';
		}
	}

	checkEmail(value: string) {
		const result = validate.single(value, constraintsContacts.email);

		if (result) {
			this.errors = result;

			return this.errors[0];
		} else {
			return '';
		}
	}

	get phone() {
		return this._phone;
	}

	get email() {
		return this._email;
	}

}