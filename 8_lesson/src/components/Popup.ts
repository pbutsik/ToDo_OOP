export interface IPopup {
    content: HTMLElement;
    open(): void;
    close(): void;
}

// в попап передается любая начинка
export class Popup implements IPopup{
	protected closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	// в конструктор передаемся элемент разметки попапа
	constructor(protected container: HTMLElement) {
		// находим элемент кнопки
		this.closeButton = container.querySelector('.popup__close');
		// находим элемент где хранится контент
		this._content = container.querySelector('.popup__content');

		// на кнопку закрытия вешаем слушатель, по клику выполняется метод close
		this.closeButton.addEventListener('click', this.close.bind(this));
		// если если кликнуть в основную часть попапа тоже закроется
		this.container.addEventListener('click', this.close.bind(this));
		// на начинку попапа вешаем слушатель, по клику не закрывается из за остановки всплытия
		this.container.querySelector('.popup__container').addEventListener('click', (event) => event.stopPropagation());
	}

	// установить содержимое папопа
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	// открыть 
	open() {
		this.container.classList.add('popup_is-opened');
	}

	// закрыть
	close() {
		this.container.classList.remove('popup_is-opened');
		// очистка контента
		this.content = null;
	}
}
