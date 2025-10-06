# Поліклініка "Здоров'я+" - Сучасний медичний сайт

Сучасний, адаптивний сайт для поліклініки, створений з використанням React + TailwindCSS.

## 🚀 Швидкий старт

### Встановлення залежностей

```bash
npm install
```

### Запуск у режимі розробки

```bash
npm start
```

Сайт буде доступний за адресою: `http://localhost:3000`

### Збірка для продакшену

```bash
npm run build
```

## 📁 Структура проекту

```
src/
├── components/          # React компоненти
│   ├── Header.js       # Верхнє меню
│   ├── Footer.js       # Футер
│   └── SocialChat.js   # Вспливаюче вікно з соцмережами
├── pages/              # Сторінки сайту
│   ├── Home.js         # Головна сторінка
│   ├── DoctorPage.js   # Сторінка лікаря
│   ├── ServicePage.js  # Сторінка послуги
│   ├── Vacancies.js    # Сторінка вакансій
│   └── Contact.js      # Сторінка контактів
├── data/               # Дані сайту
│   └── mockData.js     # Mock дані для лікарів, послуг, вакансій
├── App.js              # Основний компонент
├── index.js            # Точка входу
└── index.css           # Стилі TailwindCSS
```

## 🎨 Особливості дизайну

- **Сучасний мінімалістичний стиль** у біло-блакитних медичних відтінках
- **Повна адаптивність** для мобільних пристроїв, планшетів і комп'ютерів
- **Чиста типографіка** з приємними тінями та закругленнями
- **Інтерактивні елементи** з плавними переходами

## 📱 Функціональність

### Основні сторінки:
- **Головна** - інформація про клініку, лікарів, послуги
- **Лікарі** - детальна інформація про кожного лікаря
- **Послуги** - опис медичних послуг з цінами
- **Вакансії** - відкриті вакансії з формою подачі заявки
- **Контакти** - контактна інформація та форма зв'язку

### Додаткові функції:
- **Вспливаюче вікно чату** з посиланнями на соцмережі
- **Адаптивна навігація** з мобільним меню
- **Інтерактивні форми** для запису та зв'язку
- **Соціальні посилання** в футері

## 🔧 Налаштування та зміни

### Додавання нових лікарів

Відредагуйте файл `src/data/mockData.js`:

```javascript
export const doctors = [
  {
    id: 5, // унікальний ID
    name: "Др. Новий Лікар",
    specialty: "Спеціальність",
    experience: "X років",
    image: "URL_до_фото",
    bio: "Біографія лікаря...",
    phone: "+380 XX XXX XX XX",
    email: "email@polyclinic.ua",
    schedule: "Графік роботи"
  },
  // ... інші лікарі
];
```

### Додавання нових послуг

```javascript
export const services = [
  {
    id: 7, // унікальний ID
    title: "Назва послуги",
    description: "Опис послуги",
    price: "від XXX грн",
    features: [
      "Особливість 1",
      "Особливість 2"
    ],
    image: "URL_до_зображення"
  },
  // ... інші послуги
];
```

### Додавання нових вакансій

```javascript
export const vacancies = [
  {
    id: 4, // унікальний ID
    title: "Назва посади",
    requirements: [
      "Вимога 1",
      "Вимога 2"
    ],
    salary: "від XX XXX грн",
    type: "Тип роботи",
    description: "Опис вакансії"
  },
  // ... інші вакансії
];
```

### Зміна інформації про клініку

```javascript
export const clinicInfo = {
  name: "Назва клініки",
  address: "Нова адреса",
  phone: "+380 XX XXX XX XX",
  email: "new@email.ua",
  workingHours: "Новий графік",
  description: "Новий опис"
};
```

## 🌐 Підключення соціальних мереж

### Зміна посилань на соцмережі

В файлі `src/components/Footer.js` знайдіть масив `socialLinks`:

```javascript
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/your-page', // змініть на ваше посилання
    // ...
  },
  // ... інші соцмережі
];
```

### Зміна посилань у SocialChat

В файлі `src/components/SocialChat.js` знайдіть масив `socialOptions`:

```javascript
const socialOptions = [
  {
    name: 'Telegram',
    href: 'https://t.me/your-bot', // змініть на ваше посилання
    // ...
  },
  // ... інші опції
];
```

## 🗺️ Підключення Google Maps

### Варіант 1: Iframe (простий)

Замініть блок з картою в `src/pages/Home.js` та `src/pages/Contact.js`:

```jsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.123456789!2d30.123456789!3d50.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sYour%20Address!5e0!3m2!1sen!2sua!4v1234567890123!5m2!1sen!2sua"
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
```

### Варіант 2: React Google Maps (розширений)

1. Встановіть бібліотеку:
```bash
npm install @googlemaps/react-wrapper
```

2. Додайте API ключ у `public/index.html`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

3. Створіть компонент карти (детальні інструкції в документації бібліотеки).

## 📧 Налаштування форм

### Підключення до email сервісу

Для роботи форм зв'язку додайте обробку в `handleSubmit` функціях:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Відправка на email сервіс (наприклад, EmailJS)
  try {
    await emailjs.send('service_id', 'template_id', formData, 'user_id');
    alert('Повідомлення відправлено!');
  } catch (error) {
    alert('Помилка відправки. Спробуйте пізніше.');
  }
};
```

## 🚀 Деплой

### Netlify
1. Підключіть репозиторій до Netlify
2. Встановіть команду збірки: `npm run build`
3. Вкажіть папку: `build`

### Vercel
1. Підключіть репозиторій до Vercel
2. Vercel автоматично визначить React проект

### GitHub Pages
1. Встановіть `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Додайте скрипти в `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Запустіть деплой:
```bash
npm run deploy
```

## 🛠️ Технології

- **React 18** - основний фреймворк
- **TailwindCSS** - стилізація
- **React Router** - навігація
- **Responsive Design** - адаптивність

## 📞 Підтримка

Якщо у вас виникли питання або проблеми, звертайтеся до розробника або створюйте issue в репозиторії.

---

**Створено з ❤️ для сучасної медицини**
