export const deepPick = (obj: any, path: string): any => {
  return path.split('.').reduce((prev, curr) => prev[curr], obj);
};

export const convertSnakeCaseToCamelCase = (str: string): string => {
  return str.replace(/_([0-9]|[a-z])/g, (_, g) => g.toUpperCase());
};

export const transformKeysToCamelCase = (obj: any): any => {
  if (!obj) {
    return obj;
  }

  if (obj instanceof Array) {
    return obj.map((item) => transformKeysToCamelCase(item));
  }

  if (obj instanceof Object) {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      newObj[convertSnakeCaseToCamelCase(key)] = obj[key];
    });
    return newObj;
  }

  return obj;
};
