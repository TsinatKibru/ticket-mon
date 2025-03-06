import Ticket from "../models/ticket.model.js";

export const createTicket = async (req, res, next) => {
  try {
    const { title, description, priority, category } = req.body;
    const created_by = req.user._id;

    const newTicket = new Ticket({
      title,
      description,
      priority,
      category,
      created_by,
    });

    await newTicket.save();
    await newTicket.populate("created_by", "name email");

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: newTicket,
    });
  } catch (error) {
    next(error);
  }
};

export const getTickets = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === "user") {
      query = { created_by: req.user._id };
    }

    const tickets = await Ticket.find(query)
      .populate("created_by", "name email")
      .populate("assigned_to", "name email");

    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    next(error);
  }
};

export const getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("created_by", "name email")
      .populate("assigned_to", "name email");

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    // Only allow access if the user is an admin/support or the ticket creator
    if (
      req.user.role !== "admin" &&
      req.user.role !== "support_agent" &&
      !ticket.created_by._id.equals(req.user._id)
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    next(error);
  }
};

export const updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    // Only allow the ticket owner to update their own ticket
    if (!ticket.created_by._id.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this ticket",
      });
    }

    const { title, description, priority, category } = req.body;

    // Update fields if provided
    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (priority) ticket.priority = priority;
    if (category) ticket.category = category;

    await ticket.save();
    await ticket.populate("created_by", "name email");
    await ticket.populate("assigned_to", "name email");

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTicketStatus = async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "support_agent") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to update status" });
    }

    const { status } = req.body;
    const validStatuses = ["Open", "In Progress", "Resolved"];

    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const assignTicket = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to assign tickets" });
    }

    const { assigned_to } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assigned_to },
      { new: true }
    );

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    res.status(200).json({
      success: true,
      message: "Ticket assigned successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    // Check if the comment text is empty
    if (!text || text.trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Comment cannot be empty" });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    // Add comment to ticket
    ticket.comments.push({ text, created_by: req.user._id });

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete tickets" });
    }

    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Ticket deleted successfully" });
  } catch (error) {
    next(error);
  }
};
