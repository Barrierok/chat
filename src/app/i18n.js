import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      common: {
        remove: 'Удалить',
        cancel: 'Отменить',
        send: 'Отправить',
        rename: 'Переименовать',
      },
      validation: {
        minMax: 'От 3 до 20 символов',
        required: 'Обязательное поле',
        minSix: 'Не менее 6 символов',
        samePassword: 'Пароли должны совпадать',
      },
      loginPage: {
        error: 'Неверные имя пользователя или пароль',
        username: 'Ваш ник',
        password: 'Пароль',
        login: 'Войти',
        noAcc: 'Нет аккаунта?',
        signup: 'Регистрация',
      },
      signupPage: {
        error: 'Такой пользователь уже существует',
        signup: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        action: 'Зарегистрироваться',
      },
      noMatchPage: {
        pageNotFound: 'Страница не найдена',
        butYouCan: 'Но вы можете перейти',
        toMainPage: 'на главную страницу',
      },
      messageForm: {
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
        placeholder: 'Введите сообщение...',
        ariaLabel: 'Новое сообщение',
        send: 'Отправить',
      },
      channel: {
        channels: 'Каналы',
        name: 'Имя канала',
        error: 'Должно быть уникальным',
        rename: 'Переименовать канал',
        remove: 'Удалить канал',
        sure: 'Уверены?',
        add: 'Добавить канал',
      },
      template: {
        logout: 'Выйти',
      },
      toasts: {
        loadError: 'Ошибка соединения',
        createSuccess: 'Канал создан',
        renameSuccess: 'Канал переименован',
        removeSuccess: 'Канал удалён',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
