// movies storage
const localStorageMoviesKey = (user)=>{
  return `${user}-movieslist`;
}

export const setAllMoviesToStorage = (user, movies) => {
  localStorage.setItem(localStorageMoviesKey(user), JSON.stringify(movies));
}

export const getAllMoviesFromStorage = (user) => {
  let list = localStorage.getItem(localStorageMoviesKey(user));
  try {
    list = JSON.parse(list);
  }
  catch(e) {}

  return list || [];
}

const localStorageSearchKey = (user) => {
  return `${user}-movieSearch`;
}

export const setSearchToStorage = (user, value)=>{
  localStorage.setItem(localStorageSearchKey(user), value);
}
export const getSearchFromStorage = (user)=>{
  return localStorage.getItem(localStorageSearchKey(user)) || '';
}

const localStorageShortMoviesKey = (user) => {
  return `${user}-shortMovies`;
}

export const setShortToStorage = (user, state)=>{
  const value = state ? 1 : 0;
  localStorage.setItem(localStorageShortMoviesKey(user), value);
}
export const getShortFromStorage = (user)=>{
  const value = localStorage.getItem(localStorageShortMoviesKey(user));
  return parseInt(value) ? true : false;
}
