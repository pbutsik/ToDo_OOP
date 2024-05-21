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
    protected handleSubmitEditForm: (data: {value: string}) => void;

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
            // this.todoForm.setHandler(this.handleSubmitForm.bind(this));
            this.todoForm.buttonText = 'Добавить';
            this.todoForm.placeholder = 'Следующее дело';
            // рендерим ее разметку (формы)
            this.viewPageContainer.formContainer = this.todoForm.render();
            // создаем еще один экземпляр формы
            // Форма это компонент
            this.todoEditForm = new this.formConstructor(this.formTemplate);
            this.todoEditForm.buttonText = 'Изменить';
            this.todoEditForm.placeholder = 'Новое название';

            // при получении события из модели model будет выполнятся метод
            this.model.on('changed', () => {
                this.renderView();
            })

            // обработчик события сабмит
            this.todoForm.on('submit', this.handleSubmitForm.bind(this))
            this.todoEditForm.on('submit', (data: {value: string}) => this.handleSubmitEditForm(data))
            }

        
        // // обработчки формы добавления дела
        // handleSubmitForm(data: string) {
        //     // добавляем в модель
        //     this.model.addItem(data);
        //     // рендерим страницу
        //     this.renderView();
        //     // очищаем форму
        //     this.todoForm.clearValue();
        // }
        handleSubmitForm(data: {value: string}) {
            this.model.addItem(data.value);
            this.todoForm.clearValue();
        }
    
        // // обработчик копирования
        // handleCopyItem(item: IViewItem) {
        //     const copyedItem = this.model.getItem(item.id)
        //     this.model.addItem(copyedItem.name);
        //     this.renderView();
        // }

        handleCopyItem(item: {id: string}) {
            const copyedItem = this.model.getItem(item.id)
            this.model.addItem(copyedItem.name);
        }
    
        // // обработчки удаления
        // handleDeleteItem(item: IViewItem) {
        //     this.model.removeItem(item.id);
        //     this.renderView();
        // }    
        handleDeleteItem(item: {id: string}) {
            this.model.removeItem(item.id);
        }    

        // обработчик редактирования
        handleEditItem(item: {id: string}) {
            // находим айди дела в модели
            const editedItem = this.model.getItem(item.id)
            // устанавливаем значение в форме у поля ввода то которое сейчас у карточки найденной
            this.todoEditForm.setValue(editedItem.name);
            // генерируем контент для модального окна
            this.modal.content = this.todoEditForm.render();
            // создаем функцию handleSubmitEditForm
            this.handleSubmitEditForm = (data: {value: string}) => {
                this.model.editItem(item.id, data.value);
                this.todoEditForm.clearValue();
                this.modal.close();   
            }
            // открываем окно
            this.modal.open();
        }
        
        renderView() {
            const itemList = this.model.items.map((item) => {
                // создаем новые карточки через интерфейс конструктора
                const todoItem = new this.viewItemConstructor(this.itemTemplate);
                // // установка слушателя
    			// todoItem.setCopyHandler(this.handleCopyItem.bind(this))
                // // установка слушателя
    			// todoItem.setDeleteHandler(this.handleDeleteItem.bind(this))
                // // установка слушателя
                // todoItem.setEditHandler(this.handleEditItem.bind(this))
    			todoItem.on('copy', this.handleCopyItem.bind(this))
    			todoItem.on('delete', this.handleDeleteItem.bind(this))
                todoItem.on('edit', this.handleEditItem.bind(this))
                const itemElement = todoItem.render(item);
                return itemElement;
            }).reverse();
    
            // сохраняем в туду контейнер
            this.viewPageContainer.todoContainer = itemList;
        }
    }
