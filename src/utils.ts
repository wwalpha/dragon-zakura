import random from 'lodash/random';
import padStart from 'lodash/padStart';

export const getTimestamp = () => {
  const mo = new Date().getMonth() + 1;
  const dd = new Date().getDate();
  const hh = new Date().getHours();
  const mm = new Date().getMinutes();
  const ss = new Date().getSeconds();

  return `${mo}${dd}${hh}${mm}${ss}`;
};

export const getRandom = (operation: string) => {
  const num1 = random(10, 99, false);
  let num2 = 0;
  let result = 0;
  let ans = '';

  operation = operation === '' ? '+' : operation;

  if (operation === 'x') {
    num2 = random(2, 9, false);
    result = num1 * num2;
    ans = result.toString();
  } else if (operation === '÷') {
    num2 = random(2, 9, false);
    result = num1 / num2;
    ans = Math.floor(num1 / num2).toString() + (num1 % num2 == 0 ? '' : '...' + (num1 % num2).toString());
  } else if (operation === '+') {
    num2 = random(10, 99, false);
    result = num1 + num2;
    ans = result.toString();
  }

  // return [`${padStart(num1.toString(), 2, ' ')} ${operation} ${padStart(num2.toString(), 2, ' ')} = ${ans}`, ans];
  return [`${padStart(num1.toString(), 2, ' ')} ${operation} ${padStart(num2.toString(), 2, ' ')} = `, ans];
};

export const getMultiple = (): number[] => {
  const num1 = random(10, 99, false);
  const num2 = random(2, 9, false);

  if (num1 % 2 === 0) {
    return [num1, num2, Number(num1 * num2)];
  }

  return [num2, num1, Number(num1 * num2)];
};

export const getPlus = (): number[] => {
  const num1 = random(10, 99, false);
  const num2 = random(10, 99, false);

  if (num1 % 2 === 0) {
    return [num1, num2, Number(num1 + num2)];
  }

  return [num2, num1, Number(num1 + num2)];
};

export const getMinus = (): number[] => {
  const num1 = random(10, 999, false);
  const num2 = random(10, num1 > 99 ? 99 : num1, false);

  return [num1, num2, Number(num1 - num2)];
};

export const getDivider = (): number[] => {
  for (;;) {
    const num1 = random(10, 999, false);
    const num2 = random(3, 9, false);

    if (num1 % num2 !== 0) {
      continue;
    }

    return [num1, num2, Number(num1 / num2)];
  }
};
