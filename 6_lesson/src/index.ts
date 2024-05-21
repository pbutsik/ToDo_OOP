import { Form } from "./components/Form"
import { Item } from "./components/Item"
import { Page } from "./components/Page"
import { ToDoModel } from "./components/ToDoModel"
import { ItemPresenter } from "./components/ToDoPresenter"
import "./styles/styles.css"
import { todos } from "./utils/constants"

// куда вывести контент формы и карточек
const contentElement = document.querySelector('.content') as HTMLElement;

// создаем страничку
const itemContainer = new Page(contentElement)

// создаем экземляр класса ToDoModel
const todoArray = new ToDoModel();
// сохраняем в массив массив карточек из констант
// сработает сеттер
todoArray.items = todos;

// создание презентера
const itemPresenter = new ItemPresenter(todoArray, Form, itemContainer, Item);

// создание формы и установка слушателя
itemPresenter.init();
// генерирует разметку страницы
itemPresenter.renderView();
