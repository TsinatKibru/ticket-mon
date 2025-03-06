import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends Component {
  state = {
    loading: true, // Add a loading state
  };

  componentDidMount() {
    // Simulate a delay to wait for the user to load
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000); // Adjust the delay as needed
  }

  render() {
    const { user } = this.props.auth;
    const { element: Component, allowedRoles } = this.props;
    const { loading } = this.state;

    // If still loading, show a loading spinner or message
    if (loading) {
      return <div>Loading...</div>; // Replace with a loading spinner
    }

    // If user is not logged in, redirect to login
    if (!user) {
      return <Navigate to="/app/page401" />;
    }

    // If user's role is not allowed, redirect to login
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/app/page401" />;
    }

    // If user is logged in and role is allowed, render the component
    return <Component />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
