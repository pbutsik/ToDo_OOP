import { IItem } from "../types";

export interface IViewItem {
    id: string;
    name: string;
    render(item: IItem): HTMLElement;
    // установка слушателя на удаление
    setDeleteHandler(handleDeleteItem: Function): void;
    // установка слушателя на копирование
    setCopyHandler(handleCopyItem: Function): void;
    // установка слушателя на редактирования
    setEditHandler(handleCopyItem: Function): void;
}

// интерфейс конструктора
export interface IViewItemConstructor {
    new (template: HTMLTemplateElement): IViewItem
}

export class Item implements IViewItem{

    // элемент разметки карточки
    protected itemElement: HTMLElement;
    // элемент названия карточки
    protected title: HTMLElement;
    // элемент кнопки удаления
    protected deleteButton: HTMLButtonElement;
    // элемент кнопки копирования
    protected copyButton: HTMLButtonElement;
    // элемент кнопки редактирования
    protected editButton: HTMLButtonElement;
    // айди дела
    protected _id: string;
    // функция обработчик удаления
    protected handleDeleteItem: Function;
    // функция обработчик копирования
    protected handleCopyItem: Function;
    // функция обработчик редактирования
    protected handleEditItem: Function;

    // те параметры что прописываются в конструкторе должны передаваться при создании экземпляра класса
    // можем использовать в любом методе класса
    constructor (template: HTMLTemplateElement) {
        // клонируем шаблон дела (карточку) html элемент
        this.itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
        // находим элемент где выводится текст
        this.title = this.itemElement.querySelector('.todo-item__text');
        // находим кнопку удаления
        this.deleteButton = this.itemElement.querySelector('.todo-item__del');
        // находим кнопку копирования
        this.copyButton = this.itemElement.querySelector('.todo-item__copy');
        // находим кнопку редактирования
        this.editButton = this.itemElement.querySelector('.todo-item__edit');
    }

    // задать айди
    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id || '';
    }

    // записать название в тексконтент элемента тайтл
    set name(value: string) {
        this.title.textContent = value;
    }

    get name(): string {
        return this.title.textContent || '';
    }
    
    // метод установки слушателя
    setDeleteHandler(handleDeleteItem: Function) {
        // принимает функцию обработчки из параметров
        this.handleDeleteItem = handleDeleteItem;
        // установка обработчика на клик
        this.deleteButton.addEventListener('click', (evt) => {
            this.handleDeleteItem(this)
        })
    }

    // метод установки слушателя
    setCopyHandler(handleCopyItem: Function) {
        // принимает функцию обработчки из параметров
        this.handleCopyItem = handleCopyItem;
        // установка обработчика на клик
        this.copyButton.addEventListener('click', (evt) => {
            this.handleCopyItem(this)
        })
    }

    setEditHandler(handleEditItem: Function) {
        this.handleEditItem = handleEditItem;
        this.editButton.addEventListener('click', (evt) => {
            this.handleEditItem(this)
        })
    }

    // метод возвращает разметку карточки
    render(item: IItem) {
        // заполняем элемент
        this.name = item.name;
        // заполняем элемент
        this.id = item.id
        return this.itemElement;
    }


}