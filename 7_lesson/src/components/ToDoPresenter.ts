import { IToDoModel } from '../types';
import { IViewItem, IViewItemConstructor } from './Item';
import { IForm, IFormConstructor } from './Form';
import { IPage } from './Page';
import { IPopup } from './Popup';

// презентер нужен что бы соединить слои MVP

export class ItemPresenter {
	protected itemTemplate: HTMLTemplateElement;
	protected formTemplate: HTMLTemplateElement;
	protected todoForm: IForm;
	protected todoEditForm: IForm;

	constructor(
        // модель с данными
		protected model: IToDoModel,
        // конструктор формы для создания новых форм
		protected formConstructor: IFormConstructor,
        // страница где отображаются компоненты
		protected viewPageContainer: IPage,
        // конструктор нашего карточки
		protected viewItemConstructor: IViewItemConstructor,
        // ссылка на экземпляр класса попапа
		protected modal: IPopup,
        ) {
            // находим нужные теиплейты и сохраняем в полях класса
            this.itemTemplate = document.querySelector(
                '#todo-item-template'
            ) as HTMLTemplateElement;
            this.formTemplate = document.querySelector(
                '#todo-form-template'
            ) as HTMLTemplateElement;
        }

        // метод инициализации
        // наполнение страницы
        init() {
            // создаем форму
            this.todoForm = new this.formConstructor(this.formTemplate)
            // устанавливаем обработчик
            this.todoForm.setHandler(this.handleSubmitForm.bind(this));
            this.todoForm.buttonText = 'Добавить';
            this.todoForm.placeholder = 'Следующее дело';
            // рендерим ее разметку (формы)
            this.viewPageContainer.formContainer = this.todoForm.render();

            // создаем еще один экземпляр формы
            // Форма это компонент
            this.todoEditForm = new this.formConstructor(this.formTemplate);
            this.todoEditForm.buttonText = 'Изменить';
            this.todoEditForm.placeholder = 'Новое название';
        }

        // обработчки формы добавления дела
        handleSubmitForm(data: string) {
            // добавляем в модель
            this.model.addItem(data);
            // рендерим страницу
            this.renderView();
            // очищаем форму
            this.todoForm.clearValue();
        }

        // обработчки формы редактирования дела
        handleSubmitEditForm(data: string, id: string) {
            this.model.editItem(id, data);
            this.renderView();
            this.todoEditForm.clearValue();
            this.modal.close();
        }
    
        // обработчик копирования
        handleCopyItem(item: IViewItem) {
            const copyedItem = this.model.getItem(item.id)
            this.model.addItem(copyedItem.name);
            this.renderView();
        }
    
        // обработчки удаления
        handleDeleteItem(item: IViewItem) {
            this.model.removeItem(item.id);
            this.renderView();
        }    

        // обработчик редактирования
        handleEditItem(item: IViewItem) {
            // находим айди дела в модели
            const editedItem = this.model.getItem(item.id)
            // устанавливаем значение в форме у поля ввода то которое сейчас у карточки найденной
            this.todoEditForm.setValue(editedItem.name);
            // генерируем контент для модального окна
            this.modal.content = this.todoEditForm.render();
            // устанавливаем обработчик для сабмита формы
            this.todoEditForm.setHandler((data: string) => this.handleSubmitEditForm(data, item.id))
            // открываем окно
            this.modal.open();
        }
    
        renderView() {
            const itemList = this.model.items.map((item) => {
                // создаем новые карточки через интерфейс конструктора
                const todoItem = new this.viewItemConstructor(this.itemTemplate);
                // установка слушателя
    			todoItem.setCopyHandler(this.handleCopyItem.bind(this))
                // установка слушателя
    			todoItem.setDeleteHandler(this.handleDeleteItem.bind(this))
                // установка слушателя
                todoItem.setEditHandler(this.handleEditItem.bind(this))
                const itemElement = todoItem.render(item);
                return itemElement;
            }).reverse();
    
            // сохраняем в туду контейнер
            this.viewPageContainer.todoContainer = itemList;
        }
    }
