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

function App() {
  const [isScreenWidth] = useState(window.screen.width);
  const { pathname } = useLocation();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isErrorServer, setIsErrorServer] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMoviesRender, setIsMoviesRender] = useState([]);
  const [isMoviesSaved, setIsMoviesSaved] = useState([]);
  const [isInitialCount, setIsInitialCount] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [isKeyword, setIsKeyword] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);

  /** зависимость ширины экрана и количества фильмов для render */
  const initialCount = ()=>{
    if(isScreenWidth >= 1280){
      return 12
    }else if(isScreenWidth < 1280 && isScreenWidth >= 768){
      return 8
    }else{
      return 5
    }
  };

    /** зависимость ширины экрана и количества фильмов для render */
    const elseCount = ()=>{
      if(isScreenWidth >= 1280){
        return 4
      }else if(isScreenWidth < 1280 && isScreenWidth >= 768){
        return 2
      }else{
        return 1
      }
    };

  /** изменить количество фильмов для render при изменении экрана*/
  useEffect(()=>{
    setIsInitialCount(initialCount())
  }, [isScreenWidth])

  /** click ЕЩЕ - установить количество фильмов для render */
  const handleElse =()=>{
    setIsInitialCount(prevState=> prevState + elseCount())
  };

  /** Получить данные профиля и фильмы */
  useEffect(()=>{
    if(loggedIn){
      Promise
        .all([mainApi.getProfile(), moviesApi.getMovies(), mainApi.getMovies()])
        .then(([user, movies, savedMovies]) => {
          setCurrentUser(user);
          localStorage.setItem('mowiesAll', JSON.stringify(movies.map((movie)=>{
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
          const ownerMovies = savedOwnerMovies(savedMovies, user);
          setIsMoviesSaved(ownerMovies);
          setIsInitialCount(initialCount());
        })
        .catch((error)=>{
          setIsErrorServer(error.message);
        })
    }
  }, [loggedIn]);

  /** найти фильм в списке сохраненных */
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
    // eslint-disable-next-line array-callback-return
    return movies.filter((movie) => {
      if (movie.nameRU.toLowerCase().includes(keyword.toLowerCase().trim())) {
        return movie
      }
    })
  };

    /** поиск фильма по ключевому слову и состоянию ckeckbox */
  const handleFilterMovies= (keyword)=>{
    setIsInitialCount(initialCount());
    const moviesGet = pathname === '/movies' ? JSON.parse(localStorage.getItem('mowiesAll')): isMoviesSaved;
    if(!keyword){
      if(!isShortMovie){
        setIsMoviesRender(moviesGet);
      }else{
        setIsMoviesRender(findShortMovie(moviesGet));
      }
    }else{
      if(!isShortMovie){
        setIsMoviesRender(findKeywordMovie(keyword, moviesGet))
      }else{
        setIsMoviesRender(findShortMovie(findKeywordMovie(keyword, moviesGet)))
      };
    };
    if(pathname === '/movies'){
      localStorage.setItem('mowies', JSON.stringify(isMoviesRender))
    }

  };

  /**  */
  useEffect(()=>{
    if(pathname === '/movies'){
      setIsMoviesRender(JSON.parse(localStorage.getItem('mowies')));
    }else{

    }
  }, [pathname]);

  /** отобрать фильмы сохраненные пользователем */
  const savedOwnerMovies =(movies, user)=> {
    return movies.filter((movie)=>{
      if(movie.owner === user._id){
        return movie
      }
    })
  };

  /** Отправка новых данных профиля на сервер  */
  const handleUpdateUser=(isDate)=>{
    mainApi
      .editProfile(isDate.email, isDate.name)
      .then(user => {
        setCurrentUser(user)
      })
      .catch((err)=>{
        setIsErrorServer(err.message);
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
        setIsErrorServer(err.message);
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
        setIsErrorServer(err.message);
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
          setIsErrorServer(err.message);
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
        setIsErrorServer(err.message);
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
        setIsErrorServer(err.message);
      })
      .finally(()=>{})
  };

  /**выход */
  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('mowies');
    setLoggedIn(false);
    history.push('/');
  };

  /* Установить текущий год дя footer */
  const getYear=()=>{
  return new Date().getFullYear();
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
                  onClickElse={handleElse}
                  handleCreateMovie={handleCreateMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  onCount={isInitialCount}
                  isKeyword={isKeyword}
                  setIsKeyword={setIsKeyword}
                  likesLoading={likesLoading}
                  findMovieInSavedMovie={findMovieInSavedMovie}
                  isShortMovie={isShortMovie}
                  setIsShortMovie={setIsShortMovie}
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
                  onCount={isInitialCount}
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
                isErrorServer={isErrorServer || ''}
                setIsErrorServer={setIsErrorServer}
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
                isErrorServer={isErrorServer || ''}
                setIsErrorServer={setIsErrorServer}
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
                isErrorServer={isErrorServer || ''}
                setIsErrorServer={setIsErrorServer}
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
