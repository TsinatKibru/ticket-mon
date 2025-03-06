import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import TitleCard from "../components/TitleCard";
import { openModal } from "../redux/slices/modalSlice";
import { setPageTitle } from "../redux/slices/headerSlice";
import {
  getTickets,
  addCommentToTicket,
  changeTicketStatus,
  updateTicket,
  deleteTicket,
} from "../redux/slices/ticketSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../utils/globalConstantUtil";
import {
  getUsersContent,
  addNewUser as addNewUserAction,
} from "../redux/slices/userSlice";
import { showNotification } from "../redux/slices/headerSlice";
import {
  TrashIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { fetchUsers } from "../utils/api";
import { fetchTicketsAPi } from "../utils/api";
import TicketActions from "../components/TicketActions";

class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      expandedTickets: {}, // Track which tickets are expanded to show comments
    };
  }

  componentDidMount() {
    const { token } = this.props.auth;
    fetchTicketsAPi().then((tickets) => {
      this.props.getTickets(tickets);
      this.setState({
        tickets: tickets,
        loading: false,
      });
    });

    fetchUsers(token).then((users) => {
      this.props.getUsersContent(users);
    });
    this.props.setPageTitle({ title: "Tickets" });
  }

  openAddCommentModal = (ticketId) => {
    this.props.openModal({
      title: "Add Comment",
      bodyType: MODAL_BODY_TYPES.ADD_COMMENT,
      extraObject: { ticketId },
    });
  };

  openAddNewTicketModal = () => {
    this.props.openModal({
      title: "Add New Ticket",
      bodyType: MODAL_BODY_TYPES.TICKET_ADD_NEW,
    });
  };

  openUpdateTicketModal = (ticket) => {
    this.props.openModal({
      title: "Update Ticket",
      bodyType: MODAL_BODY_TYPES.TICKET_UPDATE,
      extraObject: { ticket },
    });
  };

  openAssignTicketModal = (ticketId) => {
    this.props.openModal({
      title: "Assign Ticket",
      bodyType: MODAL_BODY_TYPES.ASSIGN_TICKET,
      extraObject: { ticketId },
    });
  };

  openTicketStatusChnageModal = (ticketId) => {
    this.props.openModal({
      title: "Status Update",
      bodyType: MODAL_BODY_TYPES.TICKET_STATUS_UPDATE,
      extraObject: { ticketId },
    });
  };

  openConfirmTicketDelete = (ticketId) => {
    this.props.openModal({
      title: "Confirm Delete!",
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        ticketId,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.TICKET_DELETE,
        message: "Deleting a Ticket,Are You sure? ",
      },
    });
  };

  toggleComments = (ticketId) => {
    this.setState((prevState) => ({
      expandedTickets: {
        ...prevState.expandedTickets,
        [ticketId]: !prevState.expandedTickets[ticketId], // Toggle expanded state
      },
    }));
  };

  render() {
    const { loading, error, expandedTickets } = this.state;

    const { tickets } = this.props;
    const { user } = this.props.auth;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    return (
      <>
        <TitleCard
          title="Tickets"
          topMargin="mt-2"
          TopSideButtons={
            <div className="inline-block float-right">
              <button
                className="btn px-6 btn-sm normal-case btn-primary"
                onClick={this.openAddNewTicketModal}
              >
                Add New
              </button>
            </div>
          }
        >
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created By</th>
                  <th>Created At</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <React.Fragment key={ticket._id}>
                    <tr>
                      <td>{ticket.title}</td>
                      <td>
                        <div
                          className={`badge ${
                            ticket.status === "Open"
                              ? "badge-secondary"
                              : ticket.status === "In Progress"
                              ? "badge-accent"
                              : ticket.status === "Resolved"
                              ? "badge-primary"
                              : "badge-gray" // Default class for other statuses
                          }`}
                        >
                          {ticket.status}
                        </div>
                      </td>
                      <td>{ticket.priority}</td>
                      <td>{ticket.created_by.name}</td>
                      <td>{moment(ticket.createdAt).format("DD MMM YY")}</td>
                      <td>{ticket.assigned_to?.name || "None"}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => this.openAddCommentModal(ticket._id)}
                          >
                            <ChatBubbleLeftIcon className="w-5" />
                          </button>
                          {/* {user.role === "admin" && (
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() =>
                                this.openAssignTicketModal(ticket._id)
                              }
                            >
                              Assign
                            </button>
                          )}
                          {user._id === ticket.created_by._id && (
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => this.openUpdateTicketModal(ticket)}
                            >
                              Update
                            </button>
                          )}
                          {user.role === "support_agent" && (
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() =>
                                this.openTicketStatusChnageModal(ticket._id)
                              }
                            >
                              UpdateStatus
                            </button>
                          )}

                          
                          {user.role === "admin" && (
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() =>
                                this.openConfirmTicketDelete(ticket._id)
                              }
                            >
                              <TrashIcon className="w-5" />
                            </button>
                          )} */}

                          {/* Assign Ticket Button (only for admins) */}
                          <TicketActions
                            ticket={ticket}
                            user={user}
                            openAssignTicketModal={this.openAssignTicketModal}
                            openUpdateTicketModal={this.openUpdateTicketModal}
                            openTicketStatusChnageModal={
                              this.openTicketStatusChnageModal
                            }
                            openConfirmTicketDelete={
                              this.openConfirmTicketDelete
                            }
                          />

                          {/* Toggle Comments Button */}
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => this.toggleComments(ticket._id)}
                          >
                            {expandedTickets[ticket._id] ? (
                              <ChevronUpIcon className="w-5" />
                            ) : (
                              <ChevronDownIcon className="w-5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Comments Section */}
                    {expandedTickets[ticket._id] && (
                      <tr>
                        <td colSpan="6">
                          <div className="p-4 bg-gray-50 dark:bg-transparent">
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="p-3">{ticket.description}</p>

                            <h3 className="font-semibold mb-2">Comments</h3>
                            {ticket.comments.length > 0 ? (
                              ticket.comments.map((comment) => (
                                <div
                                  key={comment._id}
                                  className="mb-4 p-3 bg-white dark:bg-transparent rounded-lg shadow-sm"
                                >
                                  <p className="text-sm">{comment.text}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    By:{" "}
                                    {this.props.users.find(
                                      (user) => user._id === comment.created_by
                                    )?.name || "Unknown"}{" "}
                                    on{" "}
                                    {moment(comment.createdAt).format(
                                      "DD MMM YY, h:mm A"
                                    )}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">No comments yet.</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="pt-12"></div>
          </div>
        </TitleCard>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.user.users,
  tickets: state.ticket.tickets,
});

const mapDispatchToProps = {
  openModal,
  getUsersContent,
  setPageTitle,
  showNotification,
  getTickets,
  addCommentToTicket,

  changeTicketStatus,
  updateTicket,
  deleteTicket,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);
