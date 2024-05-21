import { Item } from "./components/Item"
import "./styles/styles.css"
import { todos } from "./utils/constants"

// <ul class="todos__list">
// </ul>
const contentElement = document.querySelector('.todos__list')

// шаблон дела
const template = document.querySelector('#todo-item-template') as HTMLTemplateElement


todos.forEach(item => {
  // создаем экземпляр класса Item передавая в него шаблон карточки
  const todoItem = new Item(template);
  // получив экземпляр класс вызываем у него метод рендер, передав название карточки, что бы получить разметку
  const itemElement = todoItem.render(item)
  // добавляем в секцию document.querySelector('.todos__list')
  contentElement.prepend(itemElement);
})