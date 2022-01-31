import Cookies from 'js-cookie';

export const setCookie = (object) => {
  const [ key ] = Object.keys(object);
  const [ value ] = Object.values(object);
  Cookies.set(key, value);
}

export const getCookie = (name) => {
  return Cookies.get(name);
}

export const removeCookie = (name) => {
  Cookies.remove(name);
}

export const hasCookie = (name) => {
  return !!Cookies.get(name);
}