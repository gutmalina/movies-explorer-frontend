const {
  BASE_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : '//localhost:3001',
  MOVIES_URL = process.env.NODE_ENV === 'production' ? process.env.MOVIES_URL : '//api.nomoreparties.co',
} = process.env;

module.exports = {
  BASE_URL,
  MOVIES_URL,
};
