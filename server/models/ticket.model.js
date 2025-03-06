import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Ticket title is required"],
      trim: true,
      minLength: 5,
      maxLength: 100,
    },
    description: {
      type: String,
      required: [true, "Ticket description is required"],
      trim: true,
      minLength: 10,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    category: {
      type: String,
      enum: ["Technical", "Billing", "General"],
      default: "General",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Ticket creator is required"],
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    comments: {
      type: [
        {
          text: {
            type: String,
            required: [true, "Comment text is required"],
            trim: true,
            minLength: 1,
            maxLength: 500,
          },
          created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Comment creator is required"],
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [], // Comments are optional and default to an empty array
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
