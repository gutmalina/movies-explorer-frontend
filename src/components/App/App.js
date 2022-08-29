import React from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import {useState, useEffect} from 'react';
import *as auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../../src/contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useCurrentWidth } from '../../Hooks/useCurrentWidth';
import { setFirstRender, setNextRender } from '../../Hooks/setNumberRender';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { MOVIES_URL } from '../../../src/utils/config';
import {
  GREETING_SIGNIN,
  GREETING_SIGNUP,
  MESSAGE_FILTER_NORESULT,
  MESSAGE_FILTER_ERROR,
  MESSAGE_SUCCESSFUL_UPDATE,
  MESSAGE_SERVER_ERROR,
  MESSAGE_ERROR_CONFLICT,
  MESSAGE_ERROR_CAST,
  STATUS_CODE_CAST,
  STATUS_CODE_CONFLICT,
  STATUS_CODE_SERVER,
  SHORT_MOVIES,
} from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const { pathname } = useLocation()

  /** ошибки при обработке данных */
  const [errorServer, setErrorServer] = useState('')
  const [errorNoMovies, setErrorNoMovies] = useState('');
  const [successfulMessage, setSuccessfulMessage] = useState('')

  /** состояние авторизации, загрузки данных */
  const [loggedIn, setLoggedIn] = useState(false)
  const [preloader, setPreloader] = useState(false)

  /** массивы карточек */
  const [renderMovies, setRenderMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])
  const [getResAllMovies, setGetResAllMovies] = useState(false)

  /** состояние кнопок, инпутов */
  const [disabledButton, setDisabledButton] = useState(true)
  const [inactivButtonElse, setInactivButtonElse] = useState(false)
  const [disabledInput, setDisabledInput] = useState(true)

  /** фильтр */
  const [keyword, setKeyword] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  /** отрисовка */
  const width = useCurrentWidth()
  const [renderCount, setRenderCount] = useState(setFirstRender(width))
  const nextRenderCount = setNextRender(width)

  /** Получить данные профиля и фильмы */
  useEffect(()=>{
    if(loggedIn){
      Promise
        .all([mainApi.getProfile(), mainApi.getMovies()])
        .then(([user, savedMovies]) => {
          setCurrentUser(user);
          setSavedMovies(savedOwnerMovies(savedMovies, user));
        })
        .catch((error)=>{
          setErrorNoMovies(MESSAGE_FILTER_ERROR);
          console.log(error)
        })
    }
  }, [loggedIn])

  /** отобрать фильмы сохраненные пользователем */
  const savedOwnerMovies =(movies, user)=> {
    return movies.filter((movie)=>{
      if(movie.owner === user._id){
        return movie
      }
    })
  }

  /** найти фильм в списке сохраненных для like/dislike*/
  const findMovieInSavedMovie = (id)=>{
    return savedMovies.find((movie) => movie.movieId === id)
  }

  /** присвоить булево значение результату поиска фильма в массиве сохраненных */
  const likesLoading = (id)=>{
    if(findMovieInSavedMovie(id)){
      return true
    }else{
      return false
    }
  }

  /** получить все фильмы */
  useEffect(()=>{
    setPreloader(true)
    moviesApi
      .getMovies()
       .then((movies)=>{
         localStorage.setItem('moviesAll', JSON.stringify(movies.map((movie)=>{
          const country = movie.country ? movie.country : 'none'
          const name = movie.nameEN ? movie.nameEN : movie.nameRU
          return {
            country: country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${MOVIES_URL}${movie.image.url}`,
            trailerLink: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: name,
            thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
          };}))
         );
       })
       .catch((error)=>{
         console.log(error)
       })
       .finally(()=>{
        setPreloader(false)
      })
  }, [getResAllMovies])

  /** поиск по keyword */
  const handleFilterMovies = ((keyword )=>{
    setGetResAllMovies(true)
    const allMovies = JSON.parse(localStorage.getItem('moviesAll'))
    const movies = pathname === '/movies' ? allMovies : savedMovies
    const filterMovies = movies.filter((movie)=>{
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase().trim())
    })
    if(pathname === '/movies'){
      localStorage.setItem('word', JSON.stringify(keyword));
      localStorage.setItem('checkbox', JSON.stringify(checkbox));
      localStorage.setItem('movies', JSON.stringify(filterMovies));
    }
    setRenderMovies(filterMovies)
  })

  /** поиск по checkbox */
  useEffect(()=>{
    if(checkbox){
      if(pathname === '/movies' && getResAllMovies){
        const movies = renderMovies.filter((movie) => movie.duration <= SHORT_MOVIES)
        setRenderMovies(movies)
        localStorage.setItem('checkbox', JSON.stringify(checkbox));
        localStorage.setItem('movies', JSON.stringify(movies));
      }else if(pathname === '/saved-movies' && keyword === ''){
        const movies = savedMovies.filter((movie) => movie.duration <= SHORT_MOVIES)
        setRenderMovies(movies)
      }else if(pathname === '/saved-movies' && keyword !== ''){
        const movies = renderMovies.filter((movie) => movie.duration <= SHORT_MOVIES)
        setRenderMovies(movies)
      }
    }else{
      if(pathname === '/movies'){
        handleFilterMovies(keyword)
      }else if(pathname === '/saved-movies' && keyword === ''){
        setRenderMovies(savedMovies)
      }else if(pathname === '/saved-movies' && keyword !== ''){
        handleFilterMovies(keyword)
      }
    }
  }, [checkbox, savedMovies])


  /** установить параметры запроса при изменении страницы*/
  useEffect(()=>{
    if(pathname === '/movies'){
      if(getResAllMovies){
        setRenderMovies(JSON.parse(localStorage.getItem('movies')))
        setCheckbox(JSON.parse(localStorage.getItem('checkbox')))
        setKeyword(JSON.parse(localStorage.getItem('word')))
      }else{
        setRenderMovies([])
        setCheckbox(false)
        setKeyword('')
      }
    }else if(pathname === '/saved-movies'){
      setRenderMovies(savedMovies)
      setCheckbox(false)
      setKeyword('')
    }
  }, [pathname])

  /** показать сообщение при обработке запроса */
  useEffect(()=>{
    if(renderMovies.length === 0){
      setInactivButtonElse(true);
      if(getResAllMovies){
        setErrorNoMovies(MESSAGE_FILTER_NORESULT);
      }else{
        setErrorNoMovies('')
      }
    }else{
      setErrorNoMovies('');
      setInactivButtonElse(false);
    }
  },[renderMovies])

  /** обновление данных профиля */
  const handleUpdateUser=(isDate)=>{
    mainApi
      .editProfile(isDate.email, isDate.name)
      .then(user => {
        setCurrentUser(user)
        setSuccessfulMessage(MESSAGE_SUCCESSFUL_UPDATE);
      })
      .catch((err)=>{
        if (err === STATUS_CODE_CAST) {
          return setErrorServer(MESSAGE_ERROR_CAST);
        } else if (err === STATUS_CODE_CONFLICT) {
          return setErrorServer(MESSAGE_ERROR_CONFLICT);
        }else if (err === STATUS_CODE_SERVER) {
          return setErrorServer(MESSAGE_SERVER_ERROR);
        }else{
          console.log(err)
        }
      })
      .finally(()=>{
        isDate.onRenderLoading(false)
      })
  }

  /** очистка сообщений об ошибаках profile */
  useEffect(()=>{
    if(pathname !== '/profile'){
      setErrorServer('')
      setSuccessfulMessage('')
      setDisabledInput(true)
    }
  }, [pathname])

  /**Регистрация пользователя */
  const handleRegister =(isDate)=>{
    return auth
      .register(isDate.email, isDate.password, isDate.name)
      .then((user)=>{
        handleLogin(isDate);
      })
      .catch((err)=>{
        if (err.message === 'Validation failed') {
          return setErrorServer(MESSAGE_ERROR_CAST);
        }else{
          return setErrorServer(err.message);
        }
      })
      .finally(()=>{
        isDate.onRenderLoading(false)
      })
  }

  /**Авторизация пользователя */
  const handleLogin = (isDate)=>{
    return auth
      .authorize(isDate.email, isDate.password)
      .then((data) => {
        if (data.token){
          localStorage.setItem('jwt', data.token)
          tokenCheck(isDate.email);
        }
      })
      .catch((err)=>{
        if (err.message === 'Validation failed') {
          return setErrorServer(MESSAGE_ERROR_CAST);
        }else{
          return setErrorServer(err.message);
        }
      })
      .finally(()=>{
        isDate.onRenderLoading(false)
      })
  }

  /** получение токена */
  const tokenCheck = () => {
    let jwt = localStorage.getItem('jwt')
    if(jwt){
      auth
        .getContent(jwt)
        .then((res) => {
          if (res){
            setLoggedIn(true);
          }
        })
        .catch((err)=>{
          setErrorServer(err.message);
        })
    }
  }

  /**использование токена при возврате на сайт */
  useEffect(() => {
    tokenCheck();
  }, [])

  /** сохранение фильма на сервере */
  const handleCreateMovie=(movie)=>{
    mainApi
      .createMovie(movie)
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err)=>{
        setErrorServer(err.message);
      })
      .finally(()=>{})
  }

  /** Удалить фильм на сервере */
  const handleDeleteMovie=(movie)=>{
    mainApi
      .deleteMovie(movie._id)
      .then(res => {
        setSavedMovies((movies) => movies.filter((m)=> m._id !== movie._id));
      })
      .catch((err)=>{
        setErrorServer(err.message);
      })
      .finally(()=>{})
  }

  /* Установить текущий год дя footer */
  const getYear=()=>{
    return new Date().getFullYear();
  }

  /** выход */
  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('moviesAll');
    localStorage.removeItem('movies');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('word');
    setRenderMovies([])
    setSavedMovies([])
    setGetResAllMovies(false)
    setCurrentUser('')
    setLoggedIn(false);
    setErrorServer('')
    setSuccessfulMessage('')
    setErrorNoMovies('')
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider
          value={currentUser}>
          <Header
            loggedIn={loggedIn}
            location={pathname}
          />
          <Switch>
            <Route exact path="/">
              <Main
                location={pathname}
              />
            </Route>
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}>
                <Movies
                  movies={renderMovies}
                  renderCount={renderCount}
                  setRenderCount={setRenderCount}
                  nextRenderCount={nextRenderCount}
                  likesLoading={likesLoading}
                  keyword={keyword}
                  setKeyword={setKeyword}
                  checkbox={checkbox}
                  setCheckbox={setCheckbox}
                  preloader={preloader}
                  errorNoMovies={errorNoMovies}
                  inactivButtonElse={inactivButtonElse}
                  setInactivButtonElse={setInactivButtonElse}
                  handleCreateMovie={handleCreateMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  handleFilterMovies={handleFilterMovies}
                  findMovieInSavedMovie={findMovieInSavedMovie}
                />
            </ProtectedRoute>
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}>
                <SavedMovies
                  movies={renderMovies}
                  likesLoading={likesLoading}
                  keyword={keyword}
                  setKeyword={setKeyword}
                  checkbox={checkbox}
                  setCheckbox={setCheckbox}
                  preloader={preloader}
                  errorNoMovies={errorNoMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  handleFilterMovies={handleFilterMovies}
                  location={pathname}
                />
            </ProtectedRoute>
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}>
              <Profile
                onError={errorServer || ''}
                setErrorServer={setErrorServer}
                onSuccessfulMessage={successfulMessage}
                disabledInput={disabledInput}
                setDisabledInput={setDisabledInput}
                disabledButton={disabledButton}
                setDisabledButton={setDisabledButton}
                signOut={signOut}
                handleUpdateUser={handleUpdateUser}
              />
            </ProtectedRoute>
            <Route path="/signup">
              {loggedIn ?
                <Redirect to='/movies'/>
                :
                <Register
                  title={GREETING_SIGNUP}
                  onError={errorServer || ''}
                  setErrorServer={setErrorServer}
                  disabledButton={disabledButton}
                  setDisabledButton={setDisabledButton}
                  handleRegister={handleRegister}
                />
              }
            </Route>
            <Route path="/signin">
              {loggedIn ?
                <Redirect to='/movies'/>
                :
                <Login
                  title={GREETING_SIGNIN}
                  onError={errorServer || ''}
                  setErrorServer={setErrorServer}
                  disabledButton={disabledButton}
                  setDisabledButton={setDisabledButton}
                  signOut={signOut}
                  handleLogin={handleLogin}
                />
              }
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
          <Footer
            date={getYear()}
            location={pathname}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App
