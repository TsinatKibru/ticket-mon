import React, { Component } from "react";

class RightSidebar extends Component {
  render() {
    return (
      <div className="fixed right-0 top-0 h-full w-64 bg-gray-200 p-4 shadow-lg">
        <h2 className="text-lg font-bold">Right Sidebar</h2>
        <p>Secondary content goes here.</p>
      </div>
    );
  }
}

export default RightSidebar;
