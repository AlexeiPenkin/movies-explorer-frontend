import { BASE_URL_MAIN } from '../utils/constants';

// Обработка ответа от сервера
const getResponse = (response) => {
  try {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (err) {
    return err;
  }
};

// Регистрация
export const signupFetch = async (authData) => {
  const response = await fetch(`${BASE_URL_MAIN}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  return await getResponse(response);
};

// Авторизация
export const signinFetch = async (authData) => {
  const response = await fetch(`${BASE_URL_MAIN}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  return await getResponse(response);
};

// Проверка валидности токена
export const validJWTFetch = async () => {
  const response = await fetch(`${BASE_URL_MAIN}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

  return await getResponse(response);
};
