import { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controls if the chat window is open

  // Anchor reference to track scroll height position
  const messagesEndRef = useRef(null);

  // Smoothly auto-scrolls down when new words stream in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    const userMessage = { role: "user", content: trimmedInput };
    const updatedMessages = [...messages, userMessage];
    
    // Optimistically insert user text and prepare an empty string slot for the streaming text
    setMessages([...updatedMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

 try {
  const res = await fetch("https://adminbackend-production-f7a6.up.railway.app/api/chat", { // 👈 Change to your Railway domain
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: updatedMessages }),
  });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

      // Open a continuous reader stream pool to capture backend res.write() events
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          accumulatedText += chunk;

          // Target and update only the last message index entry dynamically
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: accumulatedText };
            return updated;
          });
        }
      }
    } catch (error) {
      console.error("Client side connection error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Could not connect to server." };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000, fontFamily: "Arial, sans-serif" }}>
      
      {/* Floating Chat Icon / Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          💬
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div style={{
          width: "350px",
          height: "450px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}>
          
          {/* Header */}
          <div style={{ backgroundColor: "#007bff", color: "white", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold" }}>Chat Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", fontSize: "18px", cursor: "pointer" }}>✕</button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: "15px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                <div style={{
                  backgroundColor: m.role === "user" ? "#007bff" : "#f1f1f1",
                  color: m.role === "user" ? "white" : "black",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  wordBreak: "break-word"
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            
            {/* Show typing only if waiting on the initial server stream response anchor */}
            {loading && !messages[messages.length - 1]?.content && (
              <div style={{ alignSelf: "flex-start", backgroundColor: "#f1f1f1", color: "#666", padding: "8px 12px", borderRadius: "12px", fontSize: "14px", fontStyle: "italic" }}>
                Typing...
              </div>
            )}
            
            {/* Scroll position marker */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #eee", gap: "5px" }}>
            <input 
              value={input} 
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
              placeholder={loading ? "Streaming response..." : "Type a message..."}
              style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc", outline: "none" }}
            />
            <button 
              onClick={sendMessage} 
              disabled={loading || !input.trim()}
              style={{ 
                backgroundColor: loading || !input.trim() ? "#cccccc" : "#007bff", 
                color: "white", 
                border: "none", 
                padding: "8px 12px", 
                borderRadius: "4px", 
                cursor: loading || !input.trim() ? "not-allowed" : "pointer" 
              }}
            >
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Chatbot;
