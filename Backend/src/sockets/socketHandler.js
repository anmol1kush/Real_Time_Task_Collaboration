import { setUserOnline, setUserOffline } from "./presence.js";
import { Chat } from "../models/chat.model.js";

export function registerSocketHandlers(io, socket) {
  const user = socket.user;

  /* -------- USER CONNECT -------- */
  setUserOnline(user.id, socket.id);
  console.log(`🟢 ${user.name} connected`);

  socket.on("disconnect", async () => {
    await setUserOffline(user.id);
    console.log(`🔴 ${user.name} disconnected`);
  });

  /* -------- JOIN PROJECT ROOM -------- */
  socket.on("project:join", async (projectId) => {
    socket.join(projectId);

    const chat = await Chat.findOne({ projectId });
    if (chat) {
      socket.emit("project:history", chat.messages);
    }
  });

  /* -------- SEND PROJECT MESSAGE -------- */
  socket.on("project:message", async ({ projectId, message }) => {
    const payload = {
      senderId: user.id,
      senderName: user.name,
      content: { type: "text", value: message }
    };

    let chat = await Chat.findOne({ projectId });

    if (!chat) {
      chat = await Chat.create({
        projectId,
        participants: [user.id],
        messages: [payload]
      });
    } else {
      chat.messages.push(payload);
      await chat.save();
    }

    io.to(projectId).emit("project:message", payload);
  });

  /* -------- LIVE DOCUMENT (EDITOR.JS) -------- */
  socket.on("document:fetch", (data) => {
    const { projectId, documentId } = data;
    // For now we just echo a start state or rely on broadcast. 
    // Usually, you would query Prisma `Document` model here and return.
  });

  socket.on("document:update", (data) => {
    const { projectId, documentId, data: editorData } = data;
    socket.to(projectId).emit("document:updated", editorData);
  });

  /* -------- LIVE WHITEBOARD (EXCALIDRAW) -------- */
  socket.on("whiteboard:update", (data) => {
    const { projectId, elements } = data;
    socket.to(projectId).emit("whiteboard:updated", elements);
  });
}