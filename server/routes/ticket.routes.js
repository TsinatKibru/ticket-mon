import { Router } from "express";
import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  updateTicketStatus,
  assignTicket,
  addComment,
  deleteTicket,
} from "../controllers/ticket.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const ticketRouter = Router();

// Public Routes
ticketRouter.get(
  "/",
  authorize(["admin", "support_agent", "user"]),
  getTickets
);
ticketRouter.get(
  "/:id",
  authorize(["admin", "support_agent", "user"]),
  getTicket
);
ticketRouter.post(
  "/",
  authorize(["user", "admin", "support_agent"]),
  createTicket
);
ticketRouter.put(
  "/:id",
  authorize(["user", "admin", "support_agent"]),
  updateTicket
);
ticketRouter.put(
  "/:id/status",
  authorize(["admin", "support_agent"]),
  updateTicketStatus
);
ticketRouter.put("/:id/assign", authorize(["admin"]), assignTicket);
ticketRouter.post(
  "/:id/comments",
  authorize(["user", "support_agent", "admin"]),
  addComment
);
ticketRouter.delete("/:id", authorize(["admin"]), deleteTicket);

export default ticketRouter;
