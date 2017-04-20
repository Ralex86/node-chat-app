var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0; // condition sur chaine caracter room
};

module.exports = {isRealString};
