import { BASE_URL_MAIN } from '../utils/constants';

export const headers = {
  authorization: `Bearer ${localStorage.getItem('token')}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

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

// Получение информации о пользователе GET users/me
export const getUserInfo = async () => {
  const response = await fetch(`${BASE_URL_MAIN}/users/me`, {
    headers: headers,
  });
  return await getResponse(response);
};

// Получение информации о сохраненных фильмах GET /movies
export const getMovies = async () => {
  const response = await fetch(`${BASE_URL_MAIN}/movies`, {
    headers: headers,
  });
  return await getResponse(response);
};

// Редактирование данных пользователя PATCH
export const updateUserData = async (userData) => {
  const response = await fetch(`${BASE_URL_MAIN}/users/me`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
    }),
  });
  return await getResponse(response);
};

// Добавить фильм в сохраненные POST /movies
export const addSaveMovies = async (movieData) => {
  const response = await fetch(`${BASE_URL_MAIN}/movies`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(movieData),
  });
  return await getResponse(response);
};

// Удаление фильма из сохраненных DELETE /movies/:id
export const deleteSaveMovies = async (id) => {
  const response = await fetch(`${BASE_URL_MAIN}/movies/${id}`, {
    method: 'DELETE',
    headers: headers,
  });
  return await getResponse(response);
};
