// const BASE_URL = 'https://api.webdiploma.nomoredomains.xyz'
const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`
const MOVIES_URL = 'https://api.nomoreparties.co'

module.exports = {
  BASE_URL,
  MOVIES_URL,
}
