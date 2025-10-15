# 🛍️ Fake Store API - Интернет-магазин электроники и одежды

<div align="center">

![Fake Store](https://img.shields.io/badge/Fake-Store-blue?style=for-the-badge&logo=shoppingcart)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![Redux](https://img.shields.io/badge/State-Redux-purple?style=for-the-badge&logo=redux)
![Responsive](https://img.shields.io/badge/Design-Responsive-green?style=for-the-badge&logo=css3)

**Современный интернет-магазин с красивым UI и полным функционалом**

[Демо](#-демо) • [Особенности](#-особенности) • [Установка](#-установка) • [Использование](#-использование) • [Технологии](#-технологии)

</div>

## ✨ Особенности

### 🎨 Превосходный пользовательский интерфейс
- **Современный дизайн** с плавными анимациями
- **Полная адаптивность** для всех устройств
- **Интуитивная навигация** между категориями и товарами
- **Красивые карточки** товаров с hover-эффектами

### 🛒 Полнофункциональная корзина
- ✅ Добавление/удаление товаров
- ✅ Счетчик товаров в реальном времени
- ✅ Модальное окно корзины
- ✅ Сохранение состояния в LocalStorage

### 🔧 Технические возможности
- **Redux State Management** для предсказуемого состояния
- **Модульная архитектура** с разделением на слайсы
- **Обработка ошибок** с красивыми уведомлениями
- **Ленивая загрузка** изображений

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 16+ 
- npm или yarn

### Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/depst0r/Fake-Store-API.git

# Переход в директорию
cd Fake-Store-API

# Установка зависимостей
npm install

# Запуск development сервера
npm run dev

# Или сборка для production
npm run build


Fake-Store-API/
├── src/
│   ├── js/
│   │   ├── app.js              # Основной файл приложения
│   │   └── components/         # Компоненты UI
│   ├── store/
│   │   ├── store.js            # Redux store
│   │   └── slices/             # Redux slices
│   ├── ui/
│   │   └── errorHandler.js     # Обработка ошибок
│   └── utils/
│       └── icons.js            # SVG иконки
├── assets/
│   ├── img/                    # Изображения
│   └── styles/                 # CSS/SCSS стили
└── index.html                  # Главная страница

```
🎮 Использование
📱 Основной функционал

    Просмотр категорий - Выберите интересующую категорию товаров

    Фильтрация товаров - Легко находите нужные товары по категориям

    Добавление в корзину - Просто нажмите "В корзину" на любом товаре

    Управление корзиной - Откройте корзину для просмотра и оформления заказа

// Пример добавления товара в корзину
function addToCart(product) {
    // Автоматическое обновление интерфейса
    // Уведомление об успешном добавлении
    // Сохранение в LocalStorage
}

🛠 Технологии
<div align="center">
Технология	Назначение
https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black	Основной язык программирования
https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white	Управление состоянием приложения
https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white	Стилизация и анимации
https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white	Структура приложения
https://img.shields.io/badge/Webpack-8DD6F9?style=flat&logo=webpack&logoColor=black	Сборка проекта
</div>
