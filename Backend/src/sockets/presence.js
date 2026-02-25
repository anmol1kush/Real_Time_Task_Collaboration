import { redis } from "../utils/redis.js";

/* -------- ONLINE -------- */
export async function setUserOnline(userId, socketId) {
  await redis.set(`online:user:${userId}`, socketId);
}

/* -------- OFFLINE -------- */
export async function setUserOffline(userId) {
  await redis.del(`online:user:${userId}`);
}

/* -------- CHECK -------- */
export async function isUserOnline(userId) {
  return await redis.exists(`online:user:${userId}`);
}