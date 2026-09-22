import { useState, useRef, useEffect } from "react";
import "./chatbot.css";

function Chatbot() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!question.trim()) return;

        const userMessage = question;

        setMessages(prev => [
            ...prev,
            { role: "user", text: userMessage }
        ]);

        setQuestion("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userMessage })
            });

            const data = await response.json();

            setMessages(prev => [
                ...prev,
                { role: "assistant", text: data.body.output }
            ]);

        } catch (error) {
            setMessages(prev => [
                ...prev,
                { role: "assistant", text: "Sorry, something went wrong. Please try again." }
            ]);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
             style={{ background: "linear-gradient(145deg, #0f0f1a, #1a1a2e)", border: "1px solid rgba(255,255,255,0.08)" }}>

            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-5 py-4"
                 style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                     style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 15px rgba(99,102,241,0.4)" }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                    </svg>
                </div>
                <div>
                    <h2 className="text-white font-bold text-sm tracking-wide m-0">Invoice Assistant</h2>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#94a3b8" }}>
                        <span className="status-dot"></span>
                        AI-Powered &middot; Always online
                    </span>
                </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex flex-col gap-3 overflow-y-auto px-4 py-5 chat-messages" style={{ height: "380px" }}>

                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-80">
                        <div className="text-4xl mb-3">💬</div>
                        <p className="text-sm font-semibold m-0" style={{ color: "#e2e8f0" }}>Ask me anything about your invoices</p>
                        <p className="text-xs mt-1 m-0" style={{ color: "#64748b", maxWidth: 240, lineHeight: 1.6 }}>
                            I can help with invoice details, finance policies, and more.
                        </p>
                    </div>
                )}

                {messages.map((message, index) => (
                    <div key={index}
                         className={`flex items-end gap-2 msg-in ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${message.role === "user" ? "user-avatar" : "assistant-avatar"}`}>
                            {message.role === "user" ? "You" : "AI"}
                        </div>

                        <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed max-w-[72%] ${
                            message.role === "user"
                                ? "text-white rounded-br-sm user-bubble"
                                : "rounded-bl-sm assistant-bubble"
                        }`} style={{ color: "#f1f5f9", wordBreak: "break-word" }}>
                            {message.text}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex items-end gap-2 flex-row">
                        <div className="assistant-avatar w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AI</div>
                        <div className="assistant-bubble px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* ── Input Bar ── */}
            <div className="flex items-center gap-2 px-4 py-3"
                 style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>

                <input
                    id="chat-input"
                    type="text"
                    className="chat-input flex-1 rounded-lg px-4 text-sm italic outline-none"
                    style={{ height: "38px" }}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask our AI assistant..."
                    onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                />

                <button
                    id="chat-send-btn"
                    className="chat-send-btn w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-all"
                    onClick={sendMessage}
                    disabled={loading}
                    aria-label="Send message"
                >
                    {loading
                        ? <span className="btn-spinner"></span>
                        : <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                          </svg>
                    }
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
