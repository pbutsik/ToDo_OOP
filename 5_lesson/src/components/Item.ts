import { IItem } from "../types";

export class Item {

    // элемент разметки карточки
    protected itemElement: HTMLElement;
    // элемент названия карточки
    protected title: HTMLElement;
    // айди дела
    protected _id: string;

    // те параметры что прописываются в конструкторе должны передаваться при создании экземпляра класса
    // можем использовать в любом методе класса
    constructor (template: HTMLTemplateElement) {
        // клонируем шаблон дела (карточку) html элемент
        this.itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
        // находим элемент где выводится текст
        this.title = this.itemElement.querySelector('.todo-item__text');
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

    // метод возвращает разметку карточки
    render(item: IItem) {
        // заполняем элемент
        this.name = item.name;
        // заполняем элемент
        this.id = item.id;
        return this.itemElement;
    }

}