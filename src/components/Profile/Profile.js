import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import FormProfile from "../FormProfile/FormProfile";
import CaptionForm from "../CaptionForm/CaptionForm";

function Profile({
  onError,
  setErrorServer,
  onSuccessfulMessage,
  disabledInput,
  setDisabledInput,
  disabledButton,
  setDisabledButton,
  signOut,
  handleUpdateUser,
}){
  const currentUser = React.useContext(CurrentUserContext)

  return(
    <section className="profile">
      <h2 className="profile__title title title__type_form title__type_profile">
      {`Привет, ${currentUser.name}!`}
      </h2>
      <FormProfile
        nameForm="profile"
        onError={onError}
        setErrorServer={setErrorServer}
        onSuccessfulMessage={onSuccessfulMessage}
        disabledInput={disabledInput}
        setDisabledInput={setDisabledInput}
        disabledButton={disabledButton}
        setDisabledButton={setDisabledButton}
        handleUpdateUser={handleUpdateUser}
      />
      { disabledInput ?
        <CaptionForm
            nameForm="profile"
            signOut={signOut}
        />
        : null}
    </section>
  )
};

export default Profile
