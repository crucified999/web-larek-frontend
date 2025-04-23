import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { API_URL} from './utils/constants';
import { Page, Header } from './components/Views/Page'
import { Cart } from './components/Models/Cart'
import { CartView } from './components/Views/Cart';
import { CardsCatalog } from './components/Models/CardsCatalog';
import { Card, StoreCard, CardPreview } from './components/Views/Card';
import { Modal, SuccessModal } from './components/Views/Modal';
import { OrderForm } from './components/Views/Order';
import { ContactsForm } from './components/Views/Contacts';
import { ApiResponse, IContacts, IOrder, IProduct } from './types';
import { Order } from './components/Models/Order';
import { Contacts } from './components/Models/Contacts';

const cardCatalogTemplate: HTMLTemplateElement = document.querySelector(`#card-catalog`);
const cardPreviewTemplate: HTMLTemplateElement = document.querySelector(`#card-preview`);
const cardBasketTemplate: HTMLTemplateElement = document.querySelector(`#card-basket`);
const cartTemplate: HTMLTemplateElement = document.querySelector(`#basket`);
const modalContainer: HTMLElement = document.querySelector(`#modal-container`);
const orderFormTemplate: HTMLTemplateElement = document.querySelector(`#order`);
const contactsFormTemplate: HTMLTemplateElement = document.querySelector(`#contacts`);
const successModalTemplate: HTMLTemplateElement = document.querySelector(`#success`);


const headerContainer: HTMLElement = document.querySelector('.header');
const pageContainer: HTMLElement = document.body as HTMLElement;

const api = new Api(API_URL);
const events = new EventEmitter();

const cart = new Cart(events);
const cardsCatalog = new CardsCatalog(events);
const orderData = new Order(events);
const contactsData = new Contacts(events);

const header = new Header(headerContainer, events);
const page = new Page(pageContainer, events);
const cartView = new CartView(cartTemplate, events);
const modal = new Modal(modalContainer, events);
const order = new OrderForm(orderFormTemplate, events);
const contacts = new ContactsForm(contactsFormTemplate, events);
const success = new SuccessModal(successModalTemplate, events);

api
	.get('/product')
	.then((data: ApiResponse) => {
			cardsCatalog.setItems(data.items);
	})
	.catch((err) => {
		console.log(err);
	});


events.on('cards:changed', (items: IProduct[]) => {

	page.catalog = items.map((item: IProduct) => {

		const card = new Card(cardCatalogTemplate, events, { onClick: () => events.emit('card:select', item) });

		return card.render(item);

	});

	page.header = header.render();

});

events.on('card:select', (item: IProduct) => {
	page.locked = true;

	const cardPreview = new CardPreview(cardPreviewTemplate, { onClick: () => events.emit('card:toCart', item) }).render(item);

	modal.content = cardPreview;
	modal.render();
})

events.on('modal:close', () => {
	page.locked = false;
});

events.on('card:toCart', (item: IProduct) => {
	cart.add(item);
	header.counter = cart.items.length;
	modal.closeModal();
})

events.on('cart:open', () => {

	const items = cart.items;

	const cardsBasket = items.map((item: IProduct) => {
		const cardBasket = new StoreCard(cardBasketTemplate, events, { onClick: () => events.emit('cart:delete', item) });

		cardBasket.index = items.indexOf(item) + 1;

		return cardBasket.render(item);

	});

	modal.content = cartView.render({ content: cardsBasket, price: cart.getTotalPrice() });
	modal.render();
});

events.on('cart:delete', (item: IProduct) => {
	cart.delete(item.id);
});

events.on('cart:changed', (items: IProduct[]) => {
	const cardsBasket =  items.map((item: IProduct) => {
		const cardBasket =  new StoreCard(cardBasketTemplate, events, { onClick: () => events.emit('cart:delete', item) });

		cardBasket.index = items.indexOf(item) + 1;

		return cardBasket.render(item);

	});

	modal.content = cartView.render({ content: cardsBasket, price: cart.getTotalPrice() });
});

events.on('cart:order', () => {
	modal.closeModal();
	modal.content = order.render();
	modal.render();
});

events.on('orderErrors:change', (errors: Partial<IOrder>) => {

	const { payment, address } = errors;

	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address }).filter(i => !!i).join('\n');

});

events.on('orderInput:change', (data: { field: keyof IOrder, value: string }) => {

	orderData.setField(data);

});

events.on('order:submit', () => {
	modal.content = contacts.render();
});

events.on('contactsErrors:change', (errors: Partial<IContacts>) => {

	const { email, phone } = errors;

	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ email, phone }).filter(i => !!i).join('\n');

});

events.on('contactsInput:change', (data: { field: keyof IContacts, value: string }) => {

	contactsData.setField(data);

});

events.on('contacts:submit', () => {

	api
		.post('/order', {
			items: cart.items.map((item: IProduct) => item.id),
			payment: orderData.payment,
			total: cart.getTotalPrice(),
			address: orderData.address,
			email: contactsData.email,
			phone: contactsData.phone,
		})
		.then((response: { total: number }) => {
			cart.clearCart();
			order.disableButtons();
			order.clearInputs();
			orderData.clearData();
			contactsData.clearData();
			order.disableSubmitButton();
			contacts.disableSubmitButton();
			contacts.clearInputs();
			header.counter = 0;
			modal.content = success.render({ price: response.total });
			modal.render();
		})
		.catch((err) => {
			console.log(err);
		});

});

events.on('order:success', () => {
	modal.closeModal();
});