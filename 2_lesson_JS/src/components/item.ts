// создание одного елемента разметки (дела) по предложенному темплейту
export function createItem(template: HTMLTemplateElement, name: string) {
    // клонируем шаблон дела (карточку) html элемент
    const itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
    // находим элемент где выводится текст
    const title = itemElement.querySelector('.todo-item__text')
    // заполняем элемент
    title.textContent = name;
    // возвращаем готовый элемент разметки
    return itemElement;
}
