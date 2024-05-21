import { Form } from "./components/Form"
import { Item } from "./components/Item"
import { Page } from "./components/Page"
import { ToDoModel } from "./components/ToDoModel"
import "./styles/styles.css"
import { todos } from "./utils/constants"

// куда вывести контент формы и карточек
const contentElement = document.querySelector('.content') as HTMLElement

// темплейт карточки
const itemTemplate = document.querySelector(
  '#todo-item-template'
) as HTMLTemplateElement;
// темплайт формы
const formTemplate = document.querySelector(
  '#todo-form-template'
) as HTMLTemplateElement;

// экземпляр класса Page передаем в него элемент для управления
const page = new Page(contentElement)

// создаем экземляр класса ToDoModel
const todoArray = new ToDoModel();
// сохраняем в массив массив карточек из констант
// сработает сеттер
todoArray.items = todos;

// создаем экземпляр формы Класс создает разметку используя теплейт
const todoForm = new Form(formTemplate)
// задать обработчик сабмита, использует метод класса Form
todoForm.setHandler(handleSubmitForm)

// установить разметку формы на странице
page.formContainer = todoForm.render();


// обработчик для создания новых дел
function handleSubmitForm(data: string) {
  // добавить дело из формы
  todoArray.addItem(data);
  todoForm.clearValue();
  // массив изменился, нужно перерисовать страничку
  renderTodoItems();
  }

// устанавливает массив разметок карточек на страницу
function renderTodoItems() {
  // взяли массив обьектов карточек, прошлись покаждой и создали экземпляр карточки
  page.todoContainer = todoArray.items.map(item => {
  const todoItem = new Item(itemTemplate);
  // вернули разметку куарточки
  const itemElement = todoItem.render(item)
  return(itemElement)
}).reverse();
}

// для начальной отрисовки карточек из массива полученного из константы
renderTodoItems();