import { prisma } from "../utils/prisma.js";

/* -------- CREATE PROJECT -------- */
export async function createProject(req, res) {
  const { name, githubRepo, image } = req.body;
  const userId = req.user.id;

  const project = await prisma.project.create({
    data: {
      name,
      githubRepo,
      image,
      adminId: userId,
      memberships: {
        create: {
          userId,
          role: "ADMIN"
        }
      }
    }
  });

  res.status(201).json(project);
}

/* -------- GET USER PROJECTS -------- */
export async function getMyProjects(req, res) {
  const userId = req.user.id;

  const projects = await prisma.project.findMany({
    where: {
      memberships: {
        some: { userId }
      }
    },
    include: {
      admin: true
    }
  });

  res.json(projects);
}

/* -------- UPDATE PROJECT -------- */
export async function updateProject(req, res) {
  const { projectId } = req.params;
  const { name, image, githubRepo } = req.body;

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { name, image, githubRepo }
  });

  res.json(project);
}

/* -------- DELETE PROJECT -------- */
export async function deleteProject(req, res) {
  const { projectId } = req.params;

  await prisma.project.delete({
    where: { id: projectId }
  });

  res.json({ message: "Project deleted" });
}