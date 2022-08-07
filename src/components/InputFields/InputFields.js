import { useLocation } from "react-router-dom";

function InputFields({nameForm, nameInput, type, placeholder, textContent}){
  const { pathname } = useLocation();
  const container = `input__container container ${pathname === "/profile" ? "input__container_type_profile" : ""}`;
  const input = `input ${pathname === "/profile" ? "input__type_profile" : ""}`;
  const subtitle = `input__subtitle subtitle ${pathname === "/profile" ? "input__subtitle_type_profile" : ""}`;
  const span = `span-wrap ${pathname === "/profile" ? "span-wrap_type_profile" : ""}`;

  return(
    <>
      <div className="input-wrap">
        <div className={container}>
          <p className={subtitle}>{textContent}</p>
          <input
            id={`${nameForm}-${nameInput}`}
            type={type}
            name={nameInput}
            placeholder={placeholder || ''}
            className={input}
            autoFocus
            required
            autoComplete={`new-${nameInput}`}
          />
        </div>
        <div className={span}>
          <span
            className={`span span__${nameInput}`}></span>
        </div>
      </div>
    </>
  )
};

export default InputFields;
