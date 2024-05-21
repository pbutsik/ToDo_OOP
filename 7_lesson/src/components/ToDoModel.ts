import { IItem, IToDoModel } from "../types";

export class ToDoModel implements IToDoModel{
    // массив данных - дел
    // прямой доступ к данным не предоставляем, только через сеттер
    protected _items: IItem[]

    // при создании класса Model будет пустой массив
    constructor() {
        this._items = [];
    }

    // сохранить массив дел
    set items(data: IItem[]) {
        this._items = data;
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
        // возвращаем созданный объект дела
        return newItem
    };

    // удаление элемента из массива
    removeItem (id: string) {
        // фильструем массив, оставляя все кроме того у которого id равен передаммому
        this._items = this._items.filter(item => item.id !== id)
    }

    // редактирование название 
    editItem (id: string, name: string) {
        const editedItem = this._items.find(item => item.id === id);
        editedItem.name = name;
    }
    
    // получить данные элемента
    getItem(id: string) {
        return this._items.find(item => item.id === id)
    }

}