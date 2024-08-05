const transformString = (str) => {
  const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const transformedStr = normalizedStr
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

  return transformedStr;
};

module.exports = transformString;
