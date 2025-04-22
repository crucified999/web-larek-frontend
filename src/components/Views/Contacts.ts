import { Form } from '../common/Form';
import { IContacts } from '../../types';
import { IEvents } from '../base/events';

export class ContactsForm extends Form<IContacts> {

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		super(template, events);
	}

}