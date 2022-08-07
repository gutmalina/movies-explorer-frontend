import { useLocation } from "react-router-dom";

function ButtonSubmit({contentButton, name}) {
  const { pathname } = useLocation();
  const submit = `button button__submit ${pathname === '/signup' || pathname === '/signin' ? 'button__submit_type_sign' : pathname === '/profile' ? 'button__submit_type_profile' : ''}`

  return (
    <>
      <button
        type="submit"
        name={name}
        className={submit}>
          {contentButton}
      </button>
    </>
  );
}

export default ButtonSubmit;
