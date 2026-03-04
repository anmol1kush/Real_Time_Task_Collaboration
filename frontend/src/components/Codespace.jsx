import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Play, Square } from "lucide-react";

export default function Codespace({ projectId }) {
    const [isRunning, setIsRunning] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const proxyUrl = `http://localhost:3000/codespace/${projectId}`; // Proxy handled by Express

    const checkStatus = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:3000/api/codespace/${projectId}/status`);
            setIsRunning(res.data.isRunning);
        } catch (err) {
            console.error(err);
            setError("Failed to check codespace status.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
    }, [projectId]);

    const handleStart = async () => {
        try {
            setLoading(true);
            setError("");
            await axios.post(`http://localhost:3000/api/codespace/${projectId}/start`);
            setIsRunning(true);
        } catch (err) {
            setError("Failed to start codespace.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStop = async () => {
        try {
            setLoading(true);
            await axios.post(`http://localhost:3000/api/codespace/${projectId}/stop`);
            setIsRunning(false);
        } catch (err) {
            setError("Failed to stop codespace.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full min-h-[600px] w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden relative">
            <div className="p-3 bg-gray-800 flex justify-between items-center border-b border-gray-700 text-white">
                <h3 className="font-semibold text-gray-200">Cloud Development Environment (VS Code)</h3>
                <div className="flex gap-3">
                    {isRunning ? (
                        <button onClick={handleStop} disabled={loading} className="px-4 py-1.5 flex items-center gap-2 bg-red-600 hover:bg-red-500 rounded text-sm transition">
                            <Square size={16} /> Stop Codespace
                        </button>
                    ) : (
                        <button onClick={handleStart} disabled={loading} className="px-4 py-1.5 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 rounded text-sm transition">
                            <Play size={16} /> Start Codespace
                        </button>
                    )}
                </div>
            </div>

            {loading && (
                <div className="absolute inset-0 bg-gray-900/80 z-10 flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
                    <p className="text-gray-300">Provisioning environment...</p>
                </div>
            )}

            {error && (
                <div className="p-4 m-4 bg-red-900/50 border border-red-500 text-red-200 rounded">
                    {error}
                </div>
            )}

            {isRunning ? (
                <iframe
                    src={proxyUrl}
                    className="flex-grow w-full border-none"
                    title="Codespace Environment"
                />
            ) : (
                !loading && (
                    <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
                        <p>Environment is offline.</p>
                        <p className="text-sm">Click "Start Codespace" to boot up the container.</p>
                    </div>
                )
            )}
        </div>
    );
}
