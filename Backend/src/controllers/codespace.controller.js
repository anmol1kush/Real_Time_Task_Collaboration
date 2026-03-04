import { startCodespace, stopCodespace, codespacePorts } from "../services/docker.service.js";

export const getCodespaceStatus = async (req, res) => {
    try {
        const { projectId } = req.params;
        const isRunning = codespacePorts.has(projectId);

        return res.status(200).json({
            isRunning,
            port: isRunning ? codespacePorts.get(projectId) : null
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to get codespace status" });
    }
};

export const startProjectCodespace = async (req, res) => {
    try {
        const { projectId } = req.params;
        const result = await startCodespace(projectId);

        return res.status(200).json({
            message: "Codespace started",
            port: result.port
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to start codespace" });
    }
};

export const stopProjectCodespace = async (req, res) => {
    try {
        const { projectId } = req.params;
        await stopCodespace(projectId);

        return res.status(200).json({ message: "Codespace stopped" });
    } catch (error) {
        res.status(500).json({ error: "Failed to stop codespace" });
    }
};
