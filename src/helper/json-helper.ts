export const convertToJson = (response: string) => {
  const result = {};
  const pairs = response.split(';');

  pairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    result[key.trim()] = value.trim();
  });

  return result;
};
