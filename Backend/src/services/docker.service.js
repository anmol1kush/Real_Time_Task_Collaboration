import Docker from "dockerode";
import { prisma } from "../utils/prisma.js";

const docker = new Docker({ socketPath: "//./pipe/docker_engine" }); // Windows docker pipe

// A simple in-memory map to track projectId -> container port
// In production, this should be in Redis
export const codespacePorts = new Map();

/**
 * Starts a VS Code server container for a project
 */
export async function startCodespace(projectId) {
    try {
        // Check if we already have it mapped
        if (codespacePorts.has(projectId)) {
            return { port: codespacePorts.get(projectId) };
        }

        // Try to find an open port (or assign dynamically)
        // For local dev, letting Docker assign a random port is easiest
        const container = await docker.createContainer({
            Image: "codercom/code-server:latest",
            name: `codespace_${projectId}`,
            HostConfig: {
                PortBindings: {
                    "8080/tcp": [{ "HostPort": "0" }] // 0 means assign random available port
                }
            },
            Env: [
                "PASSWORD=rtct_workspace" // Basic auth required by code-server by default
            ]
        });

        await container.start();

        // Get the assigned port
        const data = await container.inspect();
        const assignedPort = data.NetworkSettings.Ports["8080/tcp"][0].HostPort;

        codespacePorts.set(projectId, assignedPort);

        return { port: assignedPort };

    } catch (error) {
        if (error.statusCode === 409) {
            // Container exists but might be stopped, let's start it
            const container = docker.getContainer(`codespace_${projectId}`);
            await container.start();
            const data = await container.inspect();
            const assignedPort = data.NetworkSettings.Ports["8080/tcp"][0].HostPort;
            codespacePorts.set(projectId, assignedPort);
            return { port: assignedPort };
        }
        console.error("Docker start error:", error);
        throw error;
    }
}

/**
 * Stops a project's codespace container
 */
export async function stopCodespace(projectId) {
    try {
        const container = docker.getContainer(`codespace_${projectId}`);
        await container.stop();
        await container.remove();
        codespacePorts.delete(projectId);
    } catch (err) {
        console.error("Docker stop error:", err);
    }
}
