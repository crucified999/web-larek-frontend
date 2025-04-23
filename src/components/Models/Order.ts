import validate from 'validate.js';
import { IOrder, IFormState } from '../../types';
import { IEvents } from '../base/events';
import { constraintsOrder } from '../../utils/constants';

export class Order implements IOrder, IFormState<IOrder> {

	valid: boolean;
	errors = {
		payment: '',
		address: '',
	};

	protected _payment: string;
	protected _address: string;

	constructor(protected events: IEvents) {}

	private checkValidation() {

		this.errors.payment = this.checkPayment(this._payment);
		this.errors.address = this.checkAddress(this._address);

		this.events.emit('orderErrors:change', this.errors);

	}

	private checkAddress(value: string) {
		const result = validate.single(value, constraintsOrder.address);

		if (result) {
			return result[0];
		} else {
			return '';
		}
	}

	private checkPayment(value: string) {
		if (!value) {
			return 'Выберите способ оплаты.'
		} else {
			return '';
		}
	}

	setField(data: { field: keyof IOrder, value: string }) {
		switch (data.field) {
				case 'payment':
					this._payment = data.value;
					break;
				case 'address':
					this._address = data.value;
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

	set payment(value: string) {
		this._payment = value;
	}

	get payment() {
		return this._payment;
	}

	set address(value: string) {
		this._address = value;
	}

	get address() {
		return this._address;
	}
}
