function Button({
  contentButton,
  name,
  type,
  ariaLabel,
  theme,
  isDisabledButton,
  isLikes
}) {
  const button = `button button__${name} button__theme_${theme}
  ${isDisabledButton ? "button__type_disabled" : ""}
  ${isLikes ? `button__${name}_inactive` : `button__${name}_active`}`

  return (
    <>
      <button
        type={type}
        name={name}
        className={button}
        aria-label={ariaLabel}
        disabled={isDisabledButton}>
          {contentButton || ''}
      </button>
    </>
  );
};

export default Button
