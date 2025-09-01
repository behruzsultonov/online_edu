// Mock lesson data for different lesson types

export const lessonsData = {
  1: {
    id: 1,
    title: 'О курсе',
    type: 'text' as const,
    duration: '5:30',
    courseTitle: 'Полный курс по JavaScript + React - с нуля до результата',
    sectionTitle: 'Общая информация о курсе',
    content: {
      textContent: `
# О курсе

Добро пожаловать на полный курс по JavaScript и React!

## Что вы изучите

- **Основы JavaScript**: переменные, функции, объекты
- **ES6+ возможности**: стрелочные функции, деструктуризация, модули
- **React библиотека**: компоненты, состояние, пропсы
- **React Router**: навигация в SPA приложениях
- **Управление состоянием**: Context API, Redux
- **Работа с API**: fetch, axios, async/await

## Структура курса

Курс состоит из 17 разделов и более 360 уроков. Каждый раздел включает:

- Теоретические уроки
- Практические задания
- Тесты для закрепления
- Проекты для портфолио

## Требования

- Базовые знания HTML и CSS
- Желание изучать современные технологии
- Готовность практиковаться ежедневно
      `,
      annotations: [
        'Введение в курс JavaScript и React. Структура обучения, требования к студентам и ожидаемые результаты.'
      ],
      keyPoints: [
        'Курс покрывает полный стек современной фронтенд разработки',
        'Более 360 уроков с практическими заданиями',
        'Изучение от основ JavaScript до продвинутого React',
        'Создание реальных проектов для портфолио',
        'Подготовка к работе Junior Frontend разработчиком'
      ]
    },
    progress: 0,
    completed: false,
    nextLessonId: 2,
    prevLessonId: undefined
  },

  2: {
    id: 2,
    title: 'Для преподавателей и студентов',
    type: 'text' as const,
    duration: '3:15',
    courseTitle: 'Полный курс по JavaScript + React - с нуля до результата',
    sectionTitle: 'Общая информация о курсе',
    content: {
      textContent: `
# Для преподавателей и студентов

## Рекомендации для преподавателей

### Методика обучения
- **Практико-ориентированный подход**: 70% практики, 30% теории
- **Постепенное усложнение**: от простых концепций к сложным проектам
- **Интерактивность**: живое кодирование, code review, парное программирование

### Проверка знаний
- Еженедельные практические задания
- Промежуточные тесты после каждого раздела
- Финальный проект в конце курса

## Рекомендации для студентов

### Как эффективно изучать
1. **Планируйте время**: выделяйте 1-2 часа ежедневно
2. **Практикуйтесь**: повторяйте код из уроков
3. **Задавайте вопросы**: не стесняйтесь обращаться за помощью
4. **Делайте заметки**: ведите конспект важных моментов

### Ресурсы для изучения
- Документация MDN для JavaScript
- Официальная документация React
- GitHub для хранения проектов
- Stack Overflow для поиска решений
      `,
      annotations: [
        'Методические рекомендации для преподавателей и советы студентам по эффективному изучению курса.'
      ],
      keyPoints: [
        'Практико-ориентированный подход к обучению',
        'Важность регулярной практики и выполнения заданий',
        'Использование современных инструментов разработки',
        'Активное участие в сообществе разработчиков'
      ]
    },
    progress: 0,
    completed: false,
    nextLessonId: 3,
    prevLessonId: 1
  },

  3: {
    id: 3,
    title: 'Достижения курса',
    type: 'text' as const,
    duration: '4:45',
    courseTitle: 'Полный курс по JavaScript + React - с нуля до результата',
    sectionTitle: 'Общая информация о курсе',
    content: {
      textContent: `
# Достижения курса

## Что вы сможете создать

После прохождения курса вы будете способны разрабатывать:

### Веб-приложения
- **SPA (Single Page Applications)** с React
- **Интерактивные дашборды** с графиками и таблицами
- **E-commerce платформы** с корзиной и оплатой
- **Социальные сети** с постами, комментариями, лайками

### Навыки разработчика
- Написание чистого, читаемого кода
- Использование современного стека технологий
- Работа с Git и GitHub
- Отладка и тестирование приложений
- Развертывание проектов в продакшн

## Сертификат

По окончании курса вы получите:
- **Сертификат о прохождении** курса
- **Портфолио проектов** для трудоустройства
- **Рекомендации** по поиску работы

## Карьерные возможности

С полученными знаниями вы сможете претендовать на позиции:
- Junior Frontend Developer
- React Developer
- JavaScript Developer
- Full Stack Developer (с доизучением backend)
      `,
      annotations: [
        'Обзор достижений и результатов, которых можно добиться после прохождения курса. Карьерные перспективы.'
      ],
      keyPoints: [
        'Способность создавать полноценные веб-приложения',
        'Получение сертификата и портфолио проектов',
        'Подготовка к трудоустройству Junior Frontend Developer',
        'Знание современного стека фронтенд технологий'
      ]
    },
    progress: 0,
    completed: false,
    nextLessonId: 4,
    prevLessonId: 2
  },

  4: {
    id: 4,
    title: 'Введение. Знакомство с JavaScript',
    type: 'video' as const,
    duration: '12:30',
    courseTitle: 'Полный курс по JavaScript + React - с нуля до результата',
    sectionTitle: 'Ввод-вывод данных',
    content: {
      textContent: `
# Введение в JavaScript

## История JavaScript

JavaScript был создан Бренданом Эйхом в 1995 году за 10 дней для браузера Netscape Navigator.

## Применение JavaScript

### Frontend разработка
- **Интерактивность** веб-страниц
- **SPA приложения** (React, Vue, Angular)
- **Мобильные приложения** (React Native)

### Backend разработка
- **Node.js** для серверной разработки
- **API разработка** с Express.js
- **Базы данных** MongoDB, PostgreSQL

### Другие области
- **Desktop приложения** (Electron)
- **Игры** (Three.js, Phaser)
- **Машинное обучение** (TensorFlow.js)

## Особенности языка

- **Динамическая типизация**: тип переменной определяется во время выполнения
- **Прототипное наследование**: объекты могут наследовать свойства других объектов
- **Функции первого класса**: функции можно передавать как аргументы
- **Event-driven**: программирование основано на событиях
      `,
      annotations: [
        'Введение в JavaScript: история создания, области применения и ключевые особенности языка.'
      ],
      keyPoints: [
        'JavaScript - один из самых популярных языков программирования',
        'Используется для frontend, backend и мобильной разработки',
        'Динамическая типизация и гибкость языка',
        'Огромная экосистема библиотек и фреймворков'
      ]
    },
    progress: 0,
    completed: false,
    nextLessonId: 5,
    prevLessonId: 3
  },

  5: {
    id: 5,
    title: 'Команда print() и продолжение',
    type: 'text' as const,
    duration: '8:15',
    courseTitle: 'Полный курс по JavaScript + React - с нуля до результата',
    sectionTitle: 'Ввод-вывод данных',
    content: {
      textContent: `
# Команда console.log() в JavaScript

## Вывод информации

В JavaScript для вывода информации в консоль используется console.log():

console.log("Привет, мир!");
console.log(42);
console.log(true);

## Различные методы console

### Информационные сообщения
console.info("Информационное сообщение");
console.warn("Предупреждение");
console.error("Ошибка");

### Группировка сообщений
console.group("Группа сообщений");
console.log("Сообщение 1");
console.log("Сообщение 2");
console.groupEnd();

### Таблицы
const users = [
  { name: "Иван", age: 25 },
  { name: "Мария", age: 30 }
];
console.table(users);

## Форматирование вывода

const name = "Иван";
const age = 25;
console.log("Меня зовут " + name + ", мне " + age + " лет");
      `,
      annotations: [
        'Изучение методов вывода информации в JavaScript. Различные способы отладки и форматирования.'
      ],
      keyPoints: [
        'console.log() - основной способ вывода в консоль',
        'Различные методы console для разных типов сообщений',
        'Форматирование строк с помощью конкатенации',
        'Группировка и структурирование отладочной информации'
      ]
    },
    progress: 0,
    completed: false,
    nextLessonId: 6,
    prevLessonId: 4
  },

  6: {
    id: 6,
    title: 'Тест: Основы JavaScript',
    type: 'quiz' as const,
    duration: '10:00',
    courseTitle: 'Полный курс по JavaScript + React - с нуля до результата',
    sectionTitle: 'Основы JavaScript',
    content: {
      textContent: `
# Тест: Основы JavaScript

Данный тест поможет проверить ваши знания основ JavaScript. 

**Инструкция:**
- Внимательно прочитайте каждый вопрос
- Выберите правильный ответ или несколько ответов
- После прохождения теста вы получите результат и объяснения

Удачи!
      `,
      questions: [
        {
          id: 1,
          text: 'Какой из следующих способов объявления переменной является правильным в JavaScript?',
          type: 'single' as const,
          options: [
            'let myVariable = 5;',
            'variable myVariable = 5;', 
            'int myVariable = 5;',
            'var myVariable := 5;'
          ],
          correctAnswers: [0],
          explanation: 'В JavaScript для объявления переменных используются ключевые слова let, const или var. Правильный синтаксис: let myVariable = 5;'
        },
        {
          id: 2,
          text: 'Какие из следующих типов данных существуют в JavaScript? (выберите несколько)',
          type: 'multiple' as const,
          options: [
            'string',
            'number',
            'boolean',
            'integer'
          ],
          correctAnswers: [0, 1, 2],
          explanation: 'В JavaScript есть типы string, number, boolean, undefined, null, symbol и object. Отдельного типа integer нет - все числа имеют тип number.'
        },
        {
          id: 3,
          text: 'Что выведет следующий код: console.log(typeof "Hello");',
          type: 'single' as const,
          options: [
            'string',
            'text',
            'Hello',
            'undefined'
          ],
          correctAnswers: [0],
          explanation: 'Оператор typeof возвращает тип данных. Для строки "Hello" он вернет "string".'
        },
        {
          id: 4,
          text: 'Какие из следующих операторов используются для сравнения в JavaScript?',
          type: 'multiple' as const,
          options: [
            '==',
            '===',
            '!=',
            '='
          ],
          correctAnswers: [0, 1, 2],
          explanation: 'Для сравнения используются ==, ===, !=, !==. Оператор = используется для присваивания, а не для сравнения.'
        },
        {
          id: 5,
          text: 'Что такое функция в JavaScript?',
          type: 'single' as const,
          options: [
            'Блок кода, который можно выполнить по требованию',
            'Переменная для хранения данных',
            'Способ создания объектов',
            'Тип данных для чисел'
          ],
          correctAnswers: [0],
          explanation: 'Функция в JavaScript - это блок кода, который может быть вызван (выполнен) по требованию. Функции позволяют переиспользовать код.'
        }
      ]
    },
    progress: 0,
    completed: false,
    nextLessonId: 7,
    prevLessonId: 5
  },

  7: {
    id: 7,
    title: 'Логические операции',
    type: 'text' as const,
    duration: '11:20',
    courseTitle: 'Полный курс по JavaScript + React - с нуля до результата',
    sectionTitle: 'Условный оператор',
    content: {
      textContent: `
# Логические операции в JavaScript

## Основные логические операторы

### 1. Оператор И (&&)
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
    console.log("Можно водить машину");
}

### 2. Оператор ИЛИ (||)
const isWeekend = true;
const isHoliday = false;

if (isWeekend || isHoliday) {
    console.log("Можно отдыхать");
}

### 3. Оператор НЕ (!)
const isLoggedIn = false;

if (!isLoggedIn) {
    console.log("Необходимо войти в систему");
}

## Сложные логические выражения

const user = {
    age: 25,
    isActive: true,
    role: 'admin'
};

// Комплексная проверка
if ((user.age >= 18 && user.isActive) || user.role === 'admin') {
    console.log("Доступ разрешен");
}

## Оператор нулл-объединения (??)

const userName = null;
const defaultName = "Гость";

const displayName = userName ?? defaultName;
console.log(displayName); // "Гость"

## Практические примеры

### Проверка доступа
function checkAccess(user) {
    return user.isActive && 
           (user.role === 'admin' || user.role === 'moderator') &&
           user.permissions.includes('read');
}
      `,
      annotations: [
        'Изучение логических операторов в JavaScript: &&, ||, !, ??. Практическое применение в условных конструкциях.'
      ],
      keyPoints: [
        'Логические операторы позволяют создавать сложные условия',
        'Оператор ?? помогает работать с null и undefined',
        'Логические операторы широко используются в валидации',
        'Комбинирование операторов позволяет создавать мощные проверки'
      ]
    },
    progress: 0,
    completed: false,
    nextLessonId: 8,
    prevLessonId: 6
  }
};

export const getLessonData = (lessonId: number) => {
  return lessonsData[lessonId as keyof typeof lessonsData] || lessonsData[1];
};