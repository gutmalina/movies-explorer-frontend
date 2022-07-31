function FormUser(){
  return(
    <>
      <input id="name"
          type="text"
          name="name"
          placeholder="Name"
          className="input input__profile-name"
          autoFocus
          required
          autoComplete="new-name"
        />
        <div className="indent__span">
          <span
            className="span span__profile-name"></span>
        </div>
        <input id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="input input__profile-email"
          autoFocus
          required
          autoComplete="new-email"
        />
        <div className="indent__span">
          <span
            className="span span__profile-email"></span>
        </div>
        <input id="password"
          type="password"
          name="password"
          placeholder="Пароль"
          className="input input__profile-password"
          required
          autoComplete="new-password"
        />
        <div className="indent__span">
          <span
            className="span span__profile-password"></span>
        </div>
    </>
  )
};

export default FormUser;
