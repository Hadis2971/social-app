import isEmpty from 'is-empty';

export const handleEmptyInput = (input) => {
  for (let key in input) {
    if (isEmpty(input[key])) input[key] = '';
  }
};
