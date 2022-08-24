import React from 'react';
import './Preloader.css';

const Preloader = ({
  disabled,
}) => {
  const preloader = `preloader__inactive ${disabled ? "preloader" : ""}`;

  return (
    <div className={preloader}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
