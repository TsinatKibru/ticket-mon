import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "./Input/InputText";
import ErrorText from "./ErrorText";
import { addTicket } from "../redux/slices/ticketSlice";
import { addTicketsAPi } from "../utils/api";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css";

const INITIAL_TICKET_OBJ = {
  title: "",
  description: "",
  priority: "Medium",
  category: "Technical",
};

function AddTicketModalBody({ closeModal }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ticketObj, setTicketObj] = useState(INITIAL_TICKET_OBJ);

  const saveNewTicket = async () => {
    if (ticketObj.title.trim() === "")
      return setErrorMessage("Title is required!");
    if (ticketObj.description.trim() === "")
      return setErrorMessage("Description is required!");

    setLoading(true);

    try {
      const response = await addTicketsAPi(ticketObj);
      if (response?._id != null) {
        dispatch(addTicket(response));
        toast.success(`Ticket Created Sucessfully!`);
      }

      closeModal();
      setTicketObj(INITIAL_TICKET_OBJ); //reset the form.
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create ticket. Please try again.";
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setTicketObj({ ...ticketObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={ticketObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={ticketObj.description}
        updateType="description"
        containerStyle="mt-4"
        labelTitle="Description"
        updateFormValue={updateFormValue}
      />

      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Priority</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={ticketObj.priority}
          onChange={(e) =>
            updateFormValue({ updateType: "priority", value: e.target.value })
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Category</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={ticketObj.category}
          onChange={(e) =>
            updateFormValue({ updateType: "category", value: e.target.value })
          }
        >
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
          <option value="General">General</option>
        </select>
      </div>

      <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>

      <div className="modal-action">
        <button className="btn btn-ghost" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={saveNewTicket}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default AddTicketModalBody;
