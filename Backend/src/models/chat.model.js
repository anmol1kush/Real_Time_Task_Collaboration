import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },

  content: {
    type: { type: String, enum: ["text", "image", "file"], default: "text" },
    value: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new mongoose.Schema({
  projectId: { type: String, index: true },
  participants: [String], // userIds
  messages: [messageSchema]
});

export const Chat = mongoose.model("Chat", chatSchema);