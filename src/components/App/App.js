import React from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import {useState, useEffect} from 'react';
import *as auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../../src/contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
  const [isScreenWidth] = useState(window.screen.width)
  const { pathname } = useLocation()

  const [currentUser, setCurrentUser] = useState({})

  /** ошибки при обработке данных */
  const [isError, setIsError] = useState('')
  const [isErrorNoMovies, setIsErrorNoMovies] = useState('');
  const [isSuccessfulMessage, setIsSuccessfulMessage] = useState('')

  /** состояние авторизации, загрузки данных */
  const [loggedIn, setLoggedIn] = useState(false)
  const [isPreloader, setIsPreloader] = useState(false)

  /** массивы карточек - для отрисовки, сохраненные, в локальном хранилище, некороткометражные */
  const [isRenderMovies, setIsRenderMovies] = useState([])/** карты на отрисовку */
  const [isSavedMovies, setIsSavedMovies] = useState([])/** то что сохранено */
  const [isAllMovies, setIsAllMovies] = useState([])
  const [isFilterMovies, setIsFilterMovies] = useState([])/** массив в котором ищется карта */
  const [isLocalMovies, setIsLocalMovies] = useState([])/** */
  const [isGetResAllMovies, setIsGetResAllMovies] = useState(false)

  /** состояние кнопок */
  const [isDisabledButton, setIsDisabledButton] = useState(true)
  const [isInactivButtonElse, setIsInactivButtonElse] = useState(false)

  /** фильтр - ключевое слово, чекбокс короткометражек  */
  const [isKeyword, setIsKeyword] = useState('')
  const [isShortMovie, setIsShortMovie] = useState(false)

  /** количество карт на отрисовку */
  const [isFirstRender, setIsFirstRender] = useState('')
  const [isNextRender, setIsNextRender] = useState('')

  /** установить количество фильмов на отрисовку */
  useEffect (()=>{
    if(isScreenWidth >= 1230){
      setIsFirstRender(12);
      setIsNextRender(4);
    }else if(isScreenWidth < 1229 && isScreenWidth >= 930){
      setIsFirstRender(9);
      setIsNextRender(3);
    }else if(isScreenWidth < 929 && isScreenWidth >= 580){
      setIsFirstRender(8);
      setIsNextRender(2);
    }else{
      setIsFirstRender(5);
      setIsNextRender(2);
    }
  }, [isScreenWidth, isRenderMovies])

  /** Получить данные профиля и фильмы */
  useEffect(()=>{
    if(loggedIn){
      Promise
        .all([mainApi.getProfile(), mainApi.getMovies()])
        .then(([user, savedMovies]) => {
          // setIsErrorNoMovies('');
          setCurrentUser(user);
          setIsSavedMovies(savedOwnerMovies(savedMovies, user));
        })
        .catch((error)=>{
          // setIsErrorNoMovies(MESSAGE_FILTER_ERROR);
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
    return isSavedMovies.find((movie) => movie.movieId === id)
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
  const handleGetAllMovies=()=>{
    moviesApi
     .getMovies()
      .then((movies)=>{
        localStorage.setItem('moviesAll', JSON.stringify(movies.map((movie)=>{
          return {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${MOVIES_URL}${movie.image.url}`,
            trailerLink: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
          };}))
        );
        setIsAllMovies(JSON.parse(localStorage.getItem('moviesAll')))
      })
      .catch((error)=>{
        console.log(error)
      })
    setIsGetResAllMovies(true)
    return isGetResAllMovies
  }


  /** поиск по keyword */
  const handleFilterMovies = ((data )=>{
    const { keyword } = data;
    if(!isGetResAllMovies && pathname === '/movies'){
      handleGetAllMovies()
    }
    const objMovies = pathname === '/movies' ? '' : isSavedMovies
    const filterMovies = objMovies.filter((movie)=>{
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase().trim())
    })
    data.onRenderPreloader(false)
    setIsFilterMovies(filterMovies)
    setIsRenderMovies(filterMovies)
    return isRenderMovies
  })

  /** поиск по checkbox */
  useEffect(()=>{
    if(isShortMovie){
      setIsRenderMovies(isFilterMovies.filter((movie) => movie.duration <= SHORT_MOVIES))
    }else{
      setIsRenderMovies(isFilterMovies)
    }
  }, [isShortMovie])

  /**  */
  useEffect(()=>{
    if(pathname === '/movies'){
      // setIsRenderMovies([])
      // setIsFilterMovies(isAllMovies)
    }else if(pathname === '/saved-movies'){
      setIsRenderMovies(isSavedMovies)
      setIsFilterMovies(isSavedMovies)
      setIsKeyword('')
      setIsShortMovie(false)
    }
  }, [pathname, isSavedMovies])

  // /** параметры запроса записать в LocalStorage */
  // useEffect(()=>{
  //   if(pathname === '/movies'){
  //     localStorage.setItem('mowies', JSON.stringify(isRenderMovies));
  //     localStorage.setItem('checkbox', JSON.stringify(isShortMovie));
  //     localStorage.setItem('word', JSON.stringify(isKeyword));
  //   }
  // }, [isRenderMovies])

  // /** показать сообщение при обработке запроса */
  // useEffect(()=>{
  //   if(isRenderMovies.length === 0){
  //     setIsErrorNoMovies(MESSAGE_FILTER_NORESULT);
  //     setIsInactivButtonElse(true);
  //   }else{
  //     setIsErrorNoMovies('');
  //     setIsInactivButtonElse(false);
  //   }
  // },[isRenderMovies])

  /** Отправка новых данных профиля на сервер  */
  const handleUpdateUser=(isDate)=>{
    mainApi
      .editProfile(isDate.email, isDate.name)
      .then(user => {
        setCurrentUser(user)
        setIsSuccessfulMessage(MESSAGE_SUCCESSFUL_UPDATE);
      })
      .catch((err)=>{
        if (err === STATUS_CODE_CAST) {
          return setIsError(MESSAGE_ERROR_CAST);
        } else if (err === STATUS_CODE_CONFLICT) {
          return setIsError(MESSAGE_ERROR_CONFLICT);
        }else if (err === STATUS_CODE_SERVER) {
          return setIsError(MESSAGE_SERVER_ERROR);
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
      setIsError('')
      setIsSuccessfulMessage('')
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
          return setIsError(MESSAGE_ERROR_CAST);
        }else{
          return setIsError(err.message);
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
          return setIsError(MESSAGE_ERROR_CAST);
        }else{
          return setIsError(err.message);
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
          setIsError(err.message);
        })
    }
  }

  /**использование токена при возврате на сайт */
  useEffect(() => {
    tokenCheck();
  }, [])

  /** сохранение фильма на сервере */
  const handleCreateMovie=(movie)=>{
    console.log(movie)
    mainApi
      .createMovie(movie)
      .then(newMovie => {
        setIsSavedMovies([newMovie, ...isSavedMovies]);
      })
      .catch((err)=>{
        setIsError(err.message);
      })
      .finally(()=>{})
  }

  /** Удалить фильм на сервере */
  const handleDeleteMovie=(movie)=>{
    mainApi
      .deleteMovie(movie._id)
      .then(res => {
        setIsSavedMovies((movies) => movies.filter((m)=> m._id !== movie._id));
      })
      .catch((err)=>{
        setIsError(err.message);
      })
      .finally(()=>{})
  }

  /* Установить текущий год дя footer */
  const getYear=()=>{
    return new Date().getFullYear();
  }

  /**выход */
  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('moviesAll');
    // localStorage.removeItem('movies');
    // localStorage.removeItem('checkbox');
    // localStorage.removeItem('word');
    setIsRenderMovies([])
    setIsAllMovies([])
    setIsSavedMovies([])
    setIsFilterMovies([])
    setIsLocalMovies([])
    setIsGetResAllMovies(false)
    setCurrentUser('')
    setLoggedIn(false);
    setIsError('')
    setIsSuccessfulMessage('')
    setIsErrorNoMovies('')
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider
          value={currentUser}>
          <Header
            location={pathname}
            loggedIn={loggedIn}
          />
          <Switch>
            <Route exact path="/">
              <Main
                location={pathname}
              />
            </Route>
            <ProtectedRoute
              exact path="/movies"
              loggedIn={loggedIn}>
                <Movies
                  handleFilterMovies={handleFilterMovies}
                  movies={isRenderMovies}
                  handleCreateMovie={handleCreateMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  isKeyword={isKeyword}
                  setIsKeyword={setIsKeyword}
                  likesLoading={likesLoading}
                  findMovieInSavedMovie={findMovieInSavedMovie}
                  isShortMovie={isShortMovie}
                  setIsShortMovie={setIsShortMovie}
                  onPreloader={isPreloader}
                  setIsPreloader={setIsPreloader}
                  onNotFound={isErrorNoMovies}
                  onInactivElse={isInactivButtonElse}
                  setIsInactivButtonElse={setIsInactivButtonElse}
                  onFirstRender={isFirstRender}
                  setIsFirstRender={setIsFirstRender}
                  onNextRender={isNextRender}
                />
            </ProtectedRoute>
            <ProtectedRoute
              exact path="/saved-movies"
              loggedIn={loggedIn}>
                <SavedMovies
                  handleFilterMovies={handleFilterMovies}
                  moviesRender={isRenderMovies}
                  isKeyword={isKeyword}
                  setIsKeyword={setIsKeyword}
                  handleDeleteMovie={handleDeleteMovie}
                  likesLoading={likesLoading}
                  location={pathname}
                  isShortMovie={isShortMovie}
                  setIsShortMovie={setIsShortMovie}
                  onPreloader={isPreloader}
                  setIsPreloader={setIsPreloader}
                  onNotFound={isErrorNoMovies}
                />
            </ProtectedRoute>
            <ProtectedRoute
              exact path="/profile"
              loggedIn={loggedIn}>
              <Profile
                title={`Привет, ${currentUser.name}!`}
                data={currentUser}
                location={pathname}
                handleUpdateUser={handleUpdateUser}
                onError={isError || ''}
                setIsError={setIsError}
                isDisabledButton={isDisabledButton}
                setIsDisabledButton={setIsDisabledButton}
                signOut={signOut}
                onSuccessfulMessage={isSuccessfulMessage}
              />
            </ProtectedRoute>
            <Route exact path="/signup">
              {loggedIn ?
                <Redirect to='/movies'/>
                :
                <Register
                  title="Добро пожаловать!"
                  location={pathname}
                  handleRegister={handleRegister}
                  onError={isError || ''}
                  setIsError={setIsError}
                  isDisabledButton={isDisabledButton}
                  setIsDisabledButton={setIsDisabledButton}
                />
              }
            </Route>
            <Route exact path="/signin">
              {loggedIn ?
                <Redirect to='/movies'/>
                :
                <Login
                signOut={signOut}
                title="Рады видеть!"
                location={pathname}
                handleLogin={handleLogin}
                onError={isError || ''}
                setIsError={setIsError}
                isDisabledButton={isDisabledButton}
                setIsDisabledButton={setIsDisabledButton}
                />
              }
            </Route>
            <Route exact path="*">
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
