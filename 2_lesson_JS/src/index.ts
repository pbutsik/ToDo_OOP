import { createItem } from "./components/item";
import "./styles/styles.css"
import { todos } from "./utils/constants";

// <ul class="todos__list">
// </ul>
const contentElement = document.querySelector('.todos__list')

// шаблон дела
const template = document.querySelector('#todo-item-template') as HTMLTemplateElement

// обходим массив дел и для каждого элемента создаем элемент разметки дела
todos.forEach(item => {
  // создание карточки
  const itemElement = createItem(template, item)
  // добавляем в секцию document.querySelector('.todos__list')
  contentElement.prepend(itemElement);
})