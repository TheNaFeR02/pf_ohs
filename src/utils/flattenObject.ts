const flattenObject = (
  obj: any,
  parentKey = "",
  result = {} as Record<string, any>
) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const propName = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], propName, result);
      } else {
        result[propName] = obj[key];
      }
    }
  }
  return result;
};

export default flattenObject;