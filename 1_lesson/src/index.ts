import "./styles/styles.css"
import { todos } from "./utils/constants"


// <ul class="todos__list">
// </ul>
const contentElement = document.querySelector('.todos__list')

// шаблон дела
const template = document.querySelector('#todo-item-template') as HTMLTemplateElement

// создание одного елемента разметки (дела)
function createItem(name: string) {
    // клонируем шаблон дела (карточку) html элемент
    const itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
    // находим элемент где выводится текст
    const title = itemElement.querySelector('.todo-item__text')
    // заполняем элемент
    title.textContent = name;
    // возвращаем готовый элемент разметки
    return itemElement;

}

// обходим массив дел и для каждого элемента создаем элемент разметки дела
todos.forEach(item => {
  const itemElement = createItem(item)
  // добавляем в секцию document.querySelector('.todos__list')
  contentElement.prepend(itemElement);
})