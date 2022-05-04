export const baseUrl = 'https://norma.nomoreparties.space/api/'
export const wsUrl = 'wss://norma.nomoreparties.space/orders'

export function getCookie(name:string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props: any = false) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name:string) {
  setCookie(name, null, { expires: -1 });
}

export function statusOrder (status:string) {
  switch (status) {
    case 'done':
      return 'Выполнен'
    case 'pending':
      return 'Готовится';
    case 'created':
      return 'Создан';
    default:
      return status;
  }
}

export const createData = (date:string) => {
  const currentDate = new Date();
  const formattedDate = new Date(date);
  const differenceData = currentDate.getTime() - formattedDate.getTime();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  let resDay = '';
  if (differenceData < oneDay)
    resDay = 'Сегодня'
  else if (differenceData < oneDay * 2)
    resDay = 'Вчера'
  else
    resDay = `${Math.trunc(differenceData / oneDay)} дня назад`;

  resDay += `, ${formattedDate.toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).substring(12)}`;
  return resDay;
}
