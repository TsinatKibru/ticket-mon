# TicktMon - Ticket Management System

TicktMon is a Ticket Management System designed to help teams efficiently manage and track tickets (issues, tasks, or requests) throughout their lifecycle. It provides a user-friendly interface for creating, updating, assigning, and resolving tickets, along with powerful analytics to visualize ticket data.

## Features

### 1. Ticket Management

- **Create Tickets**: Users can create new tickets with details like title, description, priority, and category.
- **Update Tickets**: Tickets can be updated with new information, including status changes and comments.
- **Assign Tickets**: Admins can assign tickets to support agents or team members.
- **Delete Tickets**: Admins can delete tickets that are no longer needed.

### 2. User Management

- **User Roles**: Supports different user roles (e.g., Admin, Support Agent, User).
- **Authentication**: Secure login and registration with JWT-based authentication.
- **Profile Management**: Users can view and update their profiles.

### 3. Analytics

- **Ticket Statistics**: Visualize ticket distribution by status (e.g., Open, In Progress, Resolved) using interactive charts.
- **Custom Reports**: Generate reports based on ticket priority, category, or assigned user.

### 5. Responsive Design

- **Cross-Platform**: Works seamlessly on desktop, tablet, and mobile devices.
- **Intuitive UI**: Clean and modern interface for easy navigation.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Redux**: State management for React applications.
- **Chart.js**: For visualizing ticket statistics.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend

- **Node.js**: A JavaScript runtime for building the backend.
- **Express.js**: A web framework for Node.js.
- **MongoDB**: A NoSQL database for storing tickets, users, and comments.
- **JWT**: JSON Web Tokens for secure authentication.

### APIs

- **RESTful API**: For communication between the frontend and backend.
- **Axios**: For making HTTP requests from the frontend.

## Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **Git**

### Steps

#### Clone the Repository:

```bash
git clone https://github.com/your-username/ticktmon.git
cd ticktmon
```

#### Install Dependencies:

For the backend:

```bash
cd server
npm install
```

For the frontend:

```bash
cd ../client
npm install
```

#### Set Up Environment Variables:

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ticktmon
JWT_SECRET=your_jwt_secret
```

Create a `.env.development.local` file in the client directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

#### Start the Backend:

```bash
cd server
npm run dev
```

#### Start the Frontend:

```bash
cd ../client
npm start
```

#### Access the Application:

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
