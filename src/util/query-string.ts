export const getQueryStringParams = (object: any) => {
  const keys = Object.keys(object);
  let newObject = Object.assign({});

  keys.forEach((key) => {
    if (!!object[key]) {
      newObject[key] = object[key];
    }
  });

  return new URLSearchParams(newObject).toString();
};
