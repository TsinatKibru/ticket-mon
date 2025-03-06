import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "./Input/InputText";
import ErrorText from "./ErrorText";
// import { showNotification } from "../../common/headerSlice";
import { addNewUser as addNewUserAction } from "../redux/slices/userSlice";
import { addNewUser } from "../utils/api";

const INITIAL_USER_OBJ = {
  name: "",
  email: "",
  role: "user",
};

function AddUserModalBody({ closeModal }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

  const saveNewUser = () => {
    if (userObj.name.trim() === "") return setErrorMessage("Name is required!");
    else if (userObj.email.trim() === "")
      return setErrorMessage("Email id is required!");
    else {
      const newUserObj = {
        ...userObj,
        password: "1qaz2wsx", // You might want to handle this differently
      };

      addNewUser(newUserObj).then(() => {
        console.log("d,hvjbksdjgdjvh");
        dispatch(addNewUserAction({ newUserObj }));

        // dispatch(showNotification({ message: "New User Added!", status: 1 }));
        closeModal();
      });
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setUserObj({ ...userObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={userObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="email"
        defaultValue={userObj.email}
        updateType="email"
        containerStyle="mt-4"
        labelTitle="Email Id"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={userObj.role}
        updateType="role"
        containerStyle="mt-4"
        labelTitle="Role"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewUser()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddUserModalBody;
