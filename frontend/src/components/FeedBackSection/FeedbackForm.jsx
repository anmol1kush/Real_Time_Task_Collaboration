import { useState } from "react";
import axios from "axios";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function FeedbackForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await axios.post("http://localhost:3000/api/feedback", formData);
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl w-full mx-auto bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">We value your Feedback</h2>

            {status === "success" && (
                <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded flex items-start gap-3 text-green-200">
                    <CheckCircle className="shrink-0 mt-0.5" size={20} />
                    <p>Thank you! Your feedback has been sent to the admin team successfully.</p>
                </div>
            )}

            {status === "error" && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded flex items-start gap-3 text-red-200">
                    <AlertCircle className="shrink-0 mt-0.5" size={20} />
                    <p>Oops! Something went wrong while sending your feedback. Please try again later.</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-900 border border-gray-700 rounded p-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-gray-900 border border-gray-700 rounded p-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea
                        name="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="What do you think about RTCT?"
                        className="w-full bg-gray-900 border border-gray-700 rounded p-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Send Feedback</>}
                </button>
            </form>
        </div>
    );
}
