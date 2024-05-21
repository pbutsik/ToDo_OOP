
// презентер нужен что бы соединить слои MVP
import { IToDoModel } from '../types';
import { IViewItem, IViewItemConstructor } from './Item';
import { IForm, IFormConstructor } from './Form';
import { IPage } from './Page';

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
            // рендерим ее разметку (формы)
            this.viewPageContainer.formContainer = this.todoForm.render();
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

        renderView() {
            const itemList = this.model.items.map((item) => {
                // создаем новые карточки через интерфейс конструктора
                const todoItem = new this.viewItemConstructor(this.itemTemplate);
                // установка слушателя
    			todoItem.setCopyHandler(this.handleCopyItem.bind(this))
                // установка слушателя
    			todoItem.setDeleteHandler(this.handleDeleteItem.bind(this))
                const itemElement = todoItem.render(item);
                return itemElement;
            }).reverse();
            
            // сохраняем в туду контейнер
            this.viewPageContainer.todoContainer = itemList;
        }
    }
