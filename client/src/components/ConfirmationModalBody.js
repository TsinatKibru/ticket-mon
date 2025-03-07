import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../utils/globalConstantUtil";
import { deleteTicketsAPi, deleteUserById } from "../utils/api";
import { deleteTicket } from "../redux/slices/ticketSlice";
import { deleteUser } from "../redux/slices/userSlice";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { ticketId, type, message } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TICKET_DELETE) {
      const response = await deleteTicketsAPi(ticketId);
      if (response.success === true) {
        dispatch(deleteTicket(ticketId));
        toast.success(`Ticket deleted Sucessfully!`);
      }
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.USER_DELETE) {
      const response = await deleteUserById(ticketId);
      if (response.success === true) {
        dispatch(deleteUser(ticketId));
        toast.success(`User deleted Sucessfully!`);
      }
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
