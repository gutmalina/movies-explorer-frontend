// const {
//   BASE_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : '//localhost:3001',
//   MOVIES_URL = process.env.NODE_ENV === 'production' ? process.env.MOVIES_URL : '//api.nomoreparties.co',
// } = process.env;

const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`;
const MOVIES_URL = `${window.location.protocol}${process.env.MOVIES_URL || '//api.nomoreparties.co'}`;

module.exports = {
  BASE_URL,
  MOVIES_URL,
};
