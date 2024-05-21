import { IItem } from "../types";

export class Item {

     // элемент разметки карточки
    protected itemElement: HTMLElement;
    // элеиент названия карточки
    protected title: HTMLElement;

    // те параметры что прописываются в конструкторе должны передаваться при создании экземпляра класса
    // можем использовать в любом методе класса
    constructor (template: HTMLTemplateElement) {
        // клонируем шаблон дела (карточку) html элемент
        this.itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
        // находим элемент где выводится текст
        this.title = this.itemElement.querySelector('.todo-item__text');
    }

    // метод возвращает разметку карточки
    render(item: IItem) {
        // заполняем элемент
        this.title.textContent = item.name;
        return this.itemElement;
    }

}