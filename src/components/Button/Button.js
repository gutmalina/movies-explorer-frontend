function Button({
  content,
  name,
  type,
  ariaLabel,
  theme,
  disabled,
  isLikes
}) {
  const button = `button button__${name} button__theme_${theme}
  ${disabled ? "button__type_disabled" : ""}
  ${isLikes ? `button__${name}_inactive` : `button__${name}_active`}`

  return (
    <button
      type={type}
      name={name}
      className={button}
      aria-label={ariaLabel}
      disabled={disabled}>
        {content || ''}
    </button>
  );
};

export default Button
