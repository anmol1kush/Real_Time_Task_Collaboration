import { prisma } from "../utils/prisma.js";

/* -------- CREATE INVITE -------- */
export async function createInvite(req, res) {
  const { projectId } = req.params;
  const { email } = req.body;

  const invite = await prisma.invite.create({
    data: {
      projectId,
      email,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hrs
    }
  });

  res.json(invite);
}

/* -------- ACCEPT INVITE -------- */
export async function acceptInvite(req, res) {
  const { inviteId } = req.params;
  const userId = req.user.id;

  const invite = await prisma.invite.findUnique({ where: { id: inviteId } });

  if (!invite || invite.status !== "PENDING") {
    return res.status(400).json({ message: "Invalid invite" });
  }

  await prisma.membership.create({
    data: {
      userId,
      projectId: invite.projectId,
      role: "MEMBER"
    }
  });

  await prisma.invite.update({
    where: { id: inviteId },
    data: { status: "ACCEPTED" }
  });

  res.json({ message: "Joined project" });
}