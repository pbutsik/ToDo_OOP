export interface IPage {
    formContainer: HTMLElement;
    todoContainer: HTMLElement[]; 
}

// класс нужен для управления блоками на странице
export class Page implements IPage{
    _formContainer: HTMLElement;
    _todoContainer: HTMLElement;

    // в классе храниться 2 контейнера
    // <div class="todo-form-container"></div>
    // <ul class="todos__list"></ul>
    // в кончтруктор передается контейнер main
    // <main class="content">
    constructor(protected container: HTMLElement) {
        this._formContainer = this.container.querySelector('.todo-form-container');
        this._todoContainer = this.container.querySelector('.todos__list')
    }

    // установить содержимое для списка дел
    set todoContainer(items: HTMLElement[]) {
        this._todoContainer.replaceChildren(...items);
    }

    // установить содержимое формы
    set formContainer(formElement: HTMLFormElement | null){
        if (formElement) {
            this._formContainer.replaceChildren(formElement);
        } else {
            this._formContainer.innerHTML = '';
        }
    }
}