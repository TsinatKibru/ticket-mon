import React, { Component } from "react";
import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import NotificationContainer from "./NotificationContainer";
import ModalLayout from "../components/ModalLayout";

class Layout extends Component {
  render() {
    return (
      <>
        {/* Left drawer - containing page content and sidebar (always open) */}
        <div className="drawer lg:drawer-open">
          <input
            id="left-sidebar-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <PageContent />
          <LeftSidebar />
        </div>

        {/* Notification layout container */}
        {/* <NotificationContainer /> */}

        {/* Modal layout container */}
        <ModalLayout />
      </>
    );
  }
}

export default Layout;
