import validate from 'validate.js';
import { IOrder, Payment, TOrderInfo } from '../types';
import { IEvents } from './base/events';
import { constraintsOrder } from '../utils/constants';

class Order implements IOrder {

	valid: boolean;
	errors: string[];

	protected _payment: Payment;
	protected _address: string;

	constructor(protected events: IEvents) {}

	checkValidation<TOrderInfo>(data: Record<keyof TOrderInfo, string>) {
		this.valid = !validate(data, constraintsOrder);

		return this.valid;
	}

	checkAddress(value: string) {
		const result = validate.single(value, constraintsOrder.address);

		if (result) {
			this.errors = result;

			return this.errors[0];
		} else {
			return '';
		}
	}

	get payment() {
		return this._payment;
	}

	get address() {
		return this._address;
	}
}
