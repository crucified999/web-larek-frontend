export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};


export const constraintsOrder = {
	address: {
		presence: { message: 'Поле не может быть пустым', allowEmpty: false },
		length: {
			max: 100,
			tooLong: 'Адрес не может содержать больше 100 символов.',
		},
		format: {
			pattern: /^(?:(?:ул\.|улица|просп\.|проспект|пр\.|бульвар|б-р|пер\.|переулок|наб\.|набережная|пл\.|площадь)\s+)?[А-Яа-яЁё\s-]+(?:\s+[дД]\.?\s*\d+)?(?:\s+[кК]\.?\s*\d+)?(?:\s+[кК]орп\.?\s*\d+)?(?:\s+[сС]тр\.?\s*\d+)?(?:\s+[оО]фис?\s*\d+)?(?:\s*,\s*[А-Яа-яЁё\s-]+)*$/,
			message: 'Неверный формат адреса: укажите город, улицу, номер дома, почтовый индекс.',
		}
	}
}

export const constraintsContacts = {
	phone: {
		presence: { message: 'Поле не может быть пустым', allowEmpty: false },
		length: {
			min: 11,
			max: 11,
			tooShort: 'Номер телефона должен содержать 11 цифр',
		},
		format: {
			pattern: /^(?:\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
			message: 'Номер телефона не может содержать букв.'
		}
	},

	email: {
		presence: { message: 'Поле не может быть пустым', allowEmpty: false },
		length: {
			min: 5,
			max: 100,
			tooShort: 'Адрес электронной почты должен содержать не менее 5 символов.',
			tooLong: 'Адрес электронной почты должен содержать не более 100 символов.',
		},
		format: {
			pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			message: 'Некоректный адрес электронной почты.',
		}
	}
}