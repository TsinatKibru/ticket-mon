import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { fetchUsers, deleteUserById, addNewUser } from "../utils/api";
import {
  getUsersContent,
  deleteUser,
  addNewUser as addNewUserAction,
} from "../redux/slices/userSlice";
import TitleCard from "../components/TitleCard";
import TopSideButtons from "../components/TopSideButtons";
import { openModal } from "../redux/slices/modalSlice";
import { setPageTitle } from "../redux/slices/headerSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../redux/slices/headerSlice";

class UserList extends Component {
  componentDidMount() {
    const { token } = this.props.auth;

    fetchUsers().then((users) => {
      this.props.getUsersContent(users);
    });
    this.props.setPageTitle({
      title: "/app/users/",
    });
  }

  deleteCurrentUser = (index) => {
    const { token } = this.props.auth;
    const userId = this.props.users[index]._id;
    deleteUserById(userId, token).then(() => {
      this.props.deleteUser(index);
      this.props.showNotification({ message: "User Deleted!", status: 1 });
    });
  };

  openAddNewUserModal = () => {
    this.props.openModal({
      title: "Add New User",
      bodyType: MODAL_BODY_TYPES.USER_ADD_NEW,
    });
  };

  getDummyStatus = (index) => {
    if (index % 5 === 0) return <div className="badge">Not Interested</div>;
    else if (index % 5 === 1)
      return <div className="badge badge-primary">In Progress</div>;
    else if (index % 5 === 2)
      return <div className="badge badge-secondary">Sold</div>;
    else if (index % 5 === 3)
      return <div className="badge badge-accent">Need Followup</div>;
    else return <div className="badge badge-ghost">Open</div>;
  };

  render() {
    const { users } = this.props;
    console.log(users[0]);

    return (
      <>
        <TitleCard
          title="Current Users"
          topMargin="mt-2"
          TopSideButtons={
            <div className="inline-block float-right">
              <button
                className="btn px-6 btn-sm normal-case btn-primary"
                onClick={this.openAddNewUserModal}
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
                  <th>Name</th>
                  <th>Email Id</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, k) => (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="https://reqres.in/img/faces/1-image.jpg"
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{moment(user.createdAt).format("DD MMM YY")}</td>
                    <td>{this.getDummyStatus(k)}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => this.deleteCurrentUser(k)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TitleCard>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  auth: state.auth,
});

const mapDispatchToProps = {
  getUsersContent,
  deleteUser,
  openModal,
  setPageTitle,
  showNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
