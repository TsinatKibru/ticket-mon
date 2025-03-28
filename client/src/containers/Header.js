import { themeChange } from "theme-change";
import React, { Component } from "react";
import { connect } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { openRightDrawer } from "../redux/slices/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: localStorage.getItem("theme") || "light",
    };
  }

  componentDidMount() {
    themeChange(false);
    if (!this.state.currentTheme) {
      this.setState({
        currentTheme: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      });
    }
  }

  openNotification = () => {
    this.props.openRightDrawer({
      header: "Notifications",
      bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
    });
  };

  logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    // const { noOfNotifications, pageTitle } = this.props;
    const { currentTheme } = this.state;
    const { user } = this.props.auth;

    return (
      <>
        <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
          {/* Menu toogle for mobile view or small screen */}
          <div className="flex-1">
            <label
              htmlFor="left-sidebar-drawer"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <Bars3Icon className="h-5 inline-block w-5" />
            </label>
            <h1 className="text-2xl font-semibold ml-2">{""}</h1>
          </div>

          <div className="flex-none ">
            <label className="swap ">
              <input type="checkbox" />
              <SunIcon
                data-set-theme="light"
                data-act-class="ACTIVECLASS"
                className={
                  "fill-current w-6 h-6 " +
                  (currentTheme === "dark" ? "swap-on" : "swap-off")
                }
              />
              <MoonIcon
                data-set-theme="dark"
                data-act-class="ACTIVECLASS"
                className={
                  "fill-current w-6 h-6 " +
                  (currentTheme === "light" ? "swap-on" : "swap-off")
                }
              />
            </label>

            {/* Notification icon */}
            <button
              className="btn btn-ghost ml-4  btn-circle"
              onClick={() => {}}
            >
              <div className="indicator">
                <BellIcon className="h-6 w-6" />
                {/* {noOfNotifications > 0 ? (
                  <span className="indicator-item badge badge-secondary badge-sm">
                    {noOfNotifications}
                  </span>
                ) : null} */}
              </div>
            </button>

            {/* Profile icon, opening menu on click */}
            <div className="dropdown dropdown-end ml-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="/dummyprofile.jpeg" alt="profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="justify-between">
                  <Link to={"/app/"}>
                    {user?.name}
                    <span className="badge">New</span>
                  </Link>
                </li>

                <div className="divider mt-0 mb-0"></div>
                <li>
                  <a onClick={this.logoutUser}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  //   noOfNotifications: state.header.noOfNotifications,
  //   pageTitle: state.header.pageTitle,
});

export default connect(mapStateToProps, { openRightDrawer })(Header);
