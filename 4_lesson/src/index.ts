import { Form } from "./components/Form"
import { Item } from "./components/Item"
import { ToDoModel } from "./components/ToDoModel"
import "./styles/styles.css"
import { todos } from "./utils/constants"

// <ul class="todos__list">
// </ul>
const contentElement = document.querySelector('.todos__list')

// шаблон дела
const template = document.querySelector('#todo-item-template') as HTMLTemplateElement
// элемент формы
const formElement = document.querySelector('.todos__form') as HTMLFormElement;

// экземпляр класса формы
const todoForm = new Form(formElement, handleSubmitForm)


// функция обработчик формы
// получает обьект и создает новое дело
function handleSubmitForm(data: string) {
    // создаем новое дело
    const todoItem = new Item(template);
    // генерируем разметку нового дела
    const itemElement = todoItem.render({id: '8', name: data})
    // добавляем на страницу
    contentElement.prepend(itemElement);
    // очищаем форму
    todoForm.clearValue();
  
  }

todos.forEach(item => {
  // создаем экземпляр класса Item передавая в него шаблон карточки
  const todoItem = new Item(template);
  // получив экземпляр класс вызываем у него метод рендер, передав название карточки, что бы получить разметку
  const itemElement = todoItem.render(item)
  // добавляем в секцию document.querySelector('.todos__list')
  contentElement.prepend(itemElement);
})

// создаем экземляр класса ToDoModel
const todoArray = new ToDoModel();
// сохраняем в массив массив выше
// сработает сеттер
todoArray.items = todos;
// сработает геттер
console.log(todoArray.items.map(item => item))
console.log(todoArray.addItem('Создать класс с данными'))
console.log(todoArray.items)
todoArray.removeItem('2')
console.log(todoArray.items)