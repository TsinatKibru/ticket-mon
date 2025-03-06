import React, { Component } from "react";
import axios from "axios";
import DashboardStats from "../components/DashboardStats";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import {
  ClockIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import { ArrowPathIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline";
import AmountStats from "../components/AmountStats";
import MyTicketsChart from "../components/MyTicketsChart";
import TicketStatusChart from "../components/TicketStatusChart";
import RecentTickets from "../components/RecentTickets";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      tickets: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.applyTheme();
    this.fetchData();
  }

  applyTheme = () => {
    const theme = localStorage.getItem("theme") || "light"; // Default to 'light'
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", "light");
  };

  getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return <ClockIcon className="w-10 h-10 text-yellow-500" />;
      case "inprogress":
        return <WrenchScrewdriverIcon className="w-10 h-10 text-blue-500" />;
      case "resolved":
        return <CheckBadgeIcon className="w-10 h-10 text-green-500" />;
      default:
        return <ClockIcon className="w-10 h-10 text-gray-500" />;
    }
  };

  fetchData = async () => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage after login

    try {
      // Fetch users
      const usersResponse = await axios.get("/api/v1/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch tickets
      const ticketsResponse = await axios.get("/api/v1/tickets/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState({
        users: usersResponse.data.data,
        tickets: ticketsResponse.data.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: "Failed to fetch data. Please try again later.",
        loading: false,
      });
      console.error("Error fetching data:", error);
    }
  };

  // Calculate ticket status distribution
  getTicketStatusDistribution = () => {
    const { tickets } = this.state;
    const statusCounts = {
      Open: 0,
      "In Progress": 0,
      Resolved: 0,
    };

    tickets.forEach((ticket) => {
      if (statusCounts[ticket.status]) {
        statusCounts[ticket.status]++;
      } else {
        statusCounts[ticket.status] = 1;
      }
    });

    return statusCounts;
  };

  render() {
    const { users, tickets, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    const ticketStatusDistribution = this.getTicketStatusDistribution();

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStats
            title={"Total Users"}
            icon={<UserGroupIcon className="w-8 h-8" />}
            value={users.length}
            description={"↗︎ 2300 (22%)"}
            colorIndex={1}
          />
          <DashboardStats
            title={"Total Tickets"}
            icon={<InboxArrowDownIcon className="w-8 h-8" />}
            value={tickets.length}
            description={"↗︎ 2300 (22%)"}
            colorIndex={3}
          />
          <DashboardStats
            title={"Open Tickets"}
            icon={<ArrowPathIcon className="w-8 h-8" />}
            value={ticketStatusDistribution.Open}
            description={"↗︎ 2300 (22%)"}
            colorIndex={3}
          />
        </div>
        <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
          <MyTicketsChart tickets={tickets} />
          <TicketStatusChart tickets={tickets} />
        </div>

        <div className="  p-6 rounded-lg shadow-md  mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Ticket Status Distribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(ticketStatusDistribution).map(([status, count]) => (
              <div key={status} className="p-4 rounded-lg">
                <AmountStats
                  title={status}
                  icon={this.getStatusIcon(status)}
                  value={count}
                  colorIndex={3}
                />
              </div>
            ))}
          </div>
        </div>

        <RecentTickets tickets={tickets} />
      </div>
    );
  }
}

export default Dashboard;
