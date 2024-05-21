import { IItem, IToDoModel } from "../types";
import { EventEmitter } from "./EventEmitter";

// сделаем класс модели данных дочерним от event emitter
export class ToDoModel extends EventEmitter implements IToDoModel{
    // массив данных - дел
    // прямой доступ к данным не предоставляем, только через сеттер
    protected _items: IItem[]

    // при создании класса Model будет пустой массив
    constructor() {
        // конструктор родителя супер
        super();
        this._items = [];
    }

    // сохранить массив дел
    set items(data: IItem[]) {
        this._items = data;
        // при каждом изменении данных мы генерируем событие
        this.emit('changed');
    }

    // получить массив дел
    get items() {
        return this._items;
    }

    // добавление элемента в массив
    addItem (data: string)  {
        // ищет максимальный id и добавляет 1
        const uniqueId: number = Math.max(...this._items.map(item => Number(item.id))) + 1;
        // создаем объект дела 
        const newItem: IItem = {id: String(uniqueId), name: data};
        // добавили в массив дел
        this._items.push(newItem)
        // при каждом изменении данных мы генерируем событие
        this.emit('changed');
        // возвращаем созданный объект дела
        return newItem
    };

    // удаление элемента из массива
    removeItem (id: string) {
        // фильструем массив, оставляя все кроме того у которого id равен передаммому
        this._items = this._items.filter(item => item.id !== id)
        this.emit('changed');
    }

    // редактирование название 
    editItem (id: string, name: string) {
        const editedItem = this._items.find(item => item.id === id);
        editedItem.name = name;
        this.emit('changed');
    }
    
    // получить данные элемента
    getItem(id: string) {
        return this._items.find(item => item.id === id)
    }

}