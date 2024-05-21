export interface IItem {
    // id карточки
    id: string;
    // название карточки
    name: string;
}

export interface IToDoModel {
    // массив обьектов дел
    items: IItem[];
    // добавление нового дела
    addItem: (data: string) => IItem;
    // удаление дела по id
    removeItem: (id: string) => void;
}