# Проект: Mesto

## О проекте

Проект представляет собой интерактивный сервис, в котором можно добавлять и удалять фотографии, а также ставить лайки
1. С помощь запросов media было реализована адаптивное изменение страницы под разрешение
2. Был сделан рефакторинг с использованием концепции БЭМ nested: стили блока
3. Интегрированы изображения векторного формата
4. Использована система Grid Layout для позиционирования элементов по сетке
5. Добавлено сглаживание шрифтов
6. Реализован функционал открытия формы для редактирования учетных данных, закрытия формы, сохранения введенных с помощью языка программирования JavaScript
7. Реализована форма добавления карточек
8. Добавлена возможность ставить лайк на карточку, удалять карточку
9. При нажатии на карточку открывается картинка
10. Добавлено плавное открытие и закрытие всплывающих окон с помощью изменения свойства visibility
11. Сделана клиентская валидация форм с помощью JavaScript на наличие текста, длинны и введенный url с уведомлениями об ошибке
12. Заблокировано действие отправки данных из формы, если они не прошли валидацию
13. Сделано закрытие всплывающих форм (popup) нажатием на оверлей (область вне формы) и нажатием на Escape
14. События нажатия на клавишу Escape удаляется, если закрыть форму
15. Блоки с ошибками валидации span не влияют на размер контента в форме и в то же время расширяют контент, если высота более двух строк
16. Произведен рефакторинг JavaScript кода для большей гибкости и удобства читаемости.
17. Произведена реорганизация кода по обектно-ориентированном концепции.
18. Для функционала создания карточки создан класс Card, который подключен модулем из отдельного файла
19. Для настройки валидации полей создан отдельный класс FormValidator, подключен модулем из отдельного файла
20. Созданы классы Section, Popup, PopupWithImage, PopupWithForm, UserInfo, Card
21. Сделано связывание классов
22. Собрана сборка Webpack

Ссылка на GitHub Pages:
https://grigorygriko.github.io/mesto
