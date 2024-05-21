// в интерфейсе описываем весь обязательный функционал формы
export interface IForm {
	// текст кнопки
	buttonText: string;
	// текст подсказки
	placeholder: string;
	// метод для установки обработчика
	setHandler(handleFormSubmit: Function): void;
	render(): HTMLFormElement;
	setValue(data: string): void;
	getValue(): string;
	clearValue(): void;
}

export interface IFormConstructor {
    new (formTemplate: HTMLTemplateElement): IForm;
}

export class Form implements IForm{
	protected formElement: HTMLFormElement;
	protected inputField: HTMLInputElement;
	protected handleFormSubmit: Function;
	protected submitButton: HTMLButtonElement;

	constructor(formTemplate: HTMLTemplateElement) {
		this.formElement = formTemplate.content
			.querySelector('.todos__form')
			.cloneNode(true) as HTMLFormElement;
		this.inputField = this.formElement.querySelector('.todo-form__input');
		this.submitButton = this.formElement.querySelector(
			'.todo-form__submit-btn'
		);
		// обрабочик это поле класса, устанавливается методом
		this.formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.handleFormSubmit(this.inputField.value);
		});
	}

	// установить обработчик
	setHandler(handleFormSubmit: Function) {
		this.handleFormSubmit = handleFormSubmit;
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
