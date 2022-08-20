import React from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
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
import { moviesURL } from '../../utils/constants';
import {
  MESSAGE_FILTER_NORESULT,
  MESSAGE_FILTER_ERROR,
} from '../../utils/constants';


function App() {
  const [isScreenWidth] = useState(window.screen.width);
  const { pathname } = useLocation();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isError, setIsError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMoviesRender, setIsMoviesRender] = useState([]);
  const [isMoviesSaved, setIsMoviesSaved] = useState([]);
  const [isLocalMovies, setIsLocalMovies] = useState([]);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [isKeyword, setIsKeyword] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isInactivButtonElse, setIsInactivButtonElse] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState('');
  const [isNextRender, setIsNextRender] = useState('');

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
  }, [isScreenWidth, isMoviesRender]);

  /** Получить данные профиля и фильмы */
  useEffect(()=>{
    if(loggedIn){
      Promise
        .all([mainApi.getProfile(), moviesApi.getMovies(), mainApi.getMovies()])
        .then(([user, movies, savedMovies]) => {
          setIsError('');
          setCurrentUser(user);
          localStorage.setItem('moviesAll', JSON.stringify(movies.map((movie)=>{
            return {
              country: movie.country,
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: `${moviesURL}${movie.image.url}`,
              trailerLink: movie.trailerLink,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
              thumbnail: `${moviesURL}${movie.image.formats.thumbnail.url}`,
              movieId: movie.id,
            };}))
          );
          setIsMoviesSaved(savedOwnerMovies(savedMovies, user));
          // setIsInitialCount(initialCount());

        })
        .catch((error)=>{
          setIsError(MESSAGE_FILTER_ERROR);
        })
    }
  }, [loggedIn]);

  /** отобрать фильмы сохраненные пользователем */
  const savedOwnerMovies =(movies, user)=> {
    return movies.filter((movie)=>{
      if(movie.owner === user._id){
        return movie
      }
    })
  };

  /** найти фильм в списке сохраненных для like/deslike*/
  const findMovieInSavedMovie = (id)=>{
    return isMoviesSaved.find((movie) => movie.movieId === id)
  };

  /** присвоить булево значение результату поиска фильма в массиве сохраненных */
  const likesLoading = (id)=>{
    if(findMovieInSavedMovie(id)){
      return true
    }else{
      return false
    }
  };

  /** найти короткометражный фильм*/
  const findShortMovie = (movies)=>{
    return movies.filter((movie) => movie.duration <= 40)
  };

  /** найти фильм по ключевому слову */
  const findKeywordMovie = (keyword, movies)=>{
    return movies.filter((movie) => {
      if (movie.nameRU.toLowerCase().includes(keyword.toLowerCase().trim())) {
        return movie
      }
    })
  };

  /** получить из LocalStorage */

  /** поиск фильма по ключевому слову и состоянию ckeckbox */
  const handleFilterMovies = ((data)=>{
    // setIsInactivButtonElse(false)
    const moviesGet = pathname === '/movies' ? JSON.parse(localStorage.getItem('moviesAll')): isMoviesSaved;
    if(!data.keyword){
      if(!isShortMovie){
        setIsMoviesRender(moviesGet);
      }else{
        setIsMoviesRender(findShortMovie(moviesGet));
      }
    }else{
      if(!isShortMovie){
        setIsMoviesRender(findKeywordMovie(data.keyword, moviesGet))
      }else{
        setIsMoviesRender(findShortMovie(findKeywordMovie(data.keyword, moviesGet)))
      };
    };
    data.onRenderPreloader(false)
    return isMoviesRender;
  });

  /** параметры запроса записать в LocalStorage */
  useEffect(()=>{
    if(pathname === '/movies'){
      localStorage.setItem('mowies', JSON.stringify(isMoviesRender));
      localStorage.setItem('checkbox', JSON.stringify(isShortMovie));
      localStorage.setItem('word', JSON.stringify(isKeyword));
    }
  }, [isMoviesRender])

  /** подставить параметры запроса при возвращении на страницу movies */
  useEffect(()=>{
    if(pathname === '/saved-movies'){
      setIsMoviesRender(isMoviesSaved);
      setIsShortMovie(false);
      setIsKeyword('')
      setIsLocalMovies(JSON.parse(localStorage.getItem('mowies')));
    }else{
      setIsMoviesRender(isLocalMovies);
      setIsShortMovie(JSON.parse(localStorage.getItem('checkbox')))
      setIsKeyword(JSON.parse(localStorage.getItem('word')))
    }
  }, [pathname]);

  /** показать сообщение при обработке запроса */
  useEffect(()=>{
    if(isMoviesRender.length === 0){
      setIsError(MESSAGE_FILTER_NORESULT);
      setIsInactivButtonElse(true);
    }else{
      setIsError('');
      setIsInactivButtonElse(false);
    }
  },[isMoviesRender]);

  /** Отправка новых данных профиля на сервер  */
  const handleUpdateUser=(isDate)=>{
    mainApi
      .editProfile(isDate.email, isDate.name)
      .then(user => {
        setCurrentUser(user)
      })
      .catch((err)=>{
        setIsError(err.message);
      })
      .finally(()=>{
        isDate.onRenderLoading(false)
      })
  };

  /**Регистрация пользователя */
  const handleRegister =(isDate)=>{
    return auth
      .register(isDate.email, isDate.password, isDate.name)
      .then((user)=>{
        handleLogin(isDate);
        history.push('/movies');
      })
      .catch((err)=>{
        setIsError(err.message);
      })
      .finally(()=>{
        isDate.onRenderLoading(false)
      })
  };

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
        setIsError(err.message);
      })
      .finally(()=>{
        isDate.onRenderLoading(false)
      })
  };

  /** получение токена */
  const tokenCheck = () => {
    let jwt = localStorage.getItem('jwt')
    if(jwt){
      auth
        .getContent(jwt)
        .then((res) => {
          if (res){
            setLoggedIn(true);
            history.push('/movies')
          }
        })
        .catch((err)=>{
          setIsError(err.message);
        })
    }
  };

  /**использование токена при возврате на сайт */
  useEffect(() => {
    tokenCheck();
  }, []);

  /** сохранение фильма на сервере */
  const handleCreateMovie=(movie)=>{
    mainApi
      .createMovie(movie)
      .then(newMovie => {
        setIsMoviesSaved([newMovie, ...isMoviesSaved]);
      })
      .catch((err)=>{
        setIsError(err.message);
      })
      .finally(()=>{})
  };

  /** Удалить фильм на сервере */
  const handleDeleteMovie=(movie)=>{
    mainApi
      .deleteMovie(movie._id)
      .then(res => {
        setIsMoviesSaved((movies)=> movies.filter((m)=> m._id !== movie._id));
      })
      .catch((err)=>{
        setIsError(err.message);
      })
      .finally(()=>{})
  };

  /* Установить текущий год дя footer */
  const getYear=()=>{
    return new Date().getFullYear();
  };

  /**выход */
  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('moviesAll');
    localStorage.removeItem('movies');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('word');
    setCurrentUser('')
    setLoggedIn(false);
    history.push('/');
  };

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider
          value={currentUser}>
          <Header
            location={pathname}
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
                  movies={isMoviesRender}
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
                  onNotFound={isError}
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
                  movies={isMoviesSaved}
                  moviesRender={isMoviesRender}
                  isKeyword={isKeyword}
                  setIsKeyword={setIsKeyword}
                  handleDeleteMovie={handleDeleteMovie}
                  likesLoading={likesLoading}
                  location={pathname}
                  isShortMovie={isShortMovie}
                  setIsShortMovie={setIsShortMovie}
                  onPreloader={isPreloader}
                  setIsPreloader={setIsPreloader}
                  onNotFound={isError}
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
              />
            </ProtectedRoute>
            <Route exact path="/signup">
              <Register
                title="Добро пожаловать!"
                location={pathname}
                handleRegister={handleRegister}
                onError={isError || ''}
                setIsError={setIsError}
                isDisabledButton={isDisabledButton}
                setIsDisabledButton={setIsDisabledButton}
              />
            </Route>
            <Route exact path="/signin">
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

export default App;
