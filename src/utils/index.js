import i18 from 'i18next';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';
export { renderDate, renderDateTime } from './dateTime';


export function upFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export function toTitleCase(string) {
  return string.split(' ').map((word) => (upFirstLetter(word))).join(' ');
}


export function stringFormat(string, data) {
  let newString = string;
  Object.entries(data).forEach(([key, value]) => {
    newString = newString.replace(`{${key}}`, value);
  });
  return newString;
}


export const isEqualArray = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  if (array1.length === 0) {
    return true;
  }
  const result = array1.find((item) => !array2.includes(item));
  return result === undefined;
};

export const getLocaleField = (object, fieldName) => {
  if (i18.language === 'uk') {
    return object[fieldName] || object[`${fieldName}_uk`] || object[`${fieldName}_en`] || '---';
  }
  return object[`${fieldName}_en`] || object[fieldName] || object[`${fieldName}_uk`] || '---';
};

export const isPep = (prop) => {
  switch (prop) {
    case true:
      return i18.t('politicallyExposedPerson');
    case false:
      return i18.t('notPoliticallyExposedPerson');
    default:
      return '---';
  }
};
