export class Form {
    // элемент разметка формы
    protected formElement: HTMLFormElement;
    // элемент поля ввода формы
    protected inputField: HTMLInputElement;

    // класс будет отвечать за отображение формы и взаимодействием с пользователем
    // получить клик от пользователя и как то его обработать
    constructor(formElement: HTMLFormElement, protected handleFormSubmit: Function) {
        this.formElement = formElement;
        this.inputField = this.formElement.querySelector('.todo-form__input')
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // вызываем обработчик и передаем ему поле ввода
            this.handleFormSubmit(this.inputField.value)
        })
    }

    // возвращает элемент формы
    render() {
        return this.formElement
    }

    // записать данные в поле
    setValue(data: string) {
        this.inputField.value = data;
    }

    // получить значение поля ввода
    getValue() {
        return this.inputField.value
    }

    // очистить форму
    clearValue() {
        this.formElement.reset();
    }
}