// в интерфейсе описываем весь обязательный функционал формы
import { EventEmitter, IEvents } from "./EventEmitter";

export interface IForm extends IEvents{
	// текст кнопки
	buttonText: string;
	// текст подсказки
	placeholder: string;
	// метод для установки обработчика
	// setHandler(handleFormSubmit: Function): void;
	render(): HTMLFormElement;
	setValue(data: string): void;
	getValue(): string;
	clearValue(): void;
}

export interface IFormConstructor {
    new (formTemplate: HTMLTemplateElement): IForm;
}

export class Form extends EventEmitter implements IForm{
	protected formElement: HTMLFormElement;
	protected inputField: HTMLInputElement;
	protected submitButton: HTMLButtonElement;

	constructor(formTemplate: HTMLTemplateElement) {
        super();
		this.formElement = formTemplate.content
			.querySelector('.todos__form')
			.cloneNode(true) as HTMLFormElement;
		this.inputField = this.formElement.querySelector('.todo-form__input');
		this.submitButton = this.formElement.querySelector(
			'.todo-form__submit-btn'
		);
		this.formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
			// генерируем событие
			this.emit('submit', {value: this.inputField.value});
		});
	}

	// возвращает элемент формы
	render() {
		return this.formElement;
	}

	// записать данные в поле
	setValue(data: string) {
		this.inputField.value = data;
	}

	// получить значение поля ввода
	getValue() {
		return this.inputField.value;
	}

	// очистить форму
	clearValue() {
		this.formElement.reset();
	}

	// поменять текст кнопки
	set buttonText(data: string) {
		this.submitButton.textContent = data;
	}

	// поменять подсказку
	set placeholder(data: string) {
		this.inputField.placeholder = data;
	}
}
