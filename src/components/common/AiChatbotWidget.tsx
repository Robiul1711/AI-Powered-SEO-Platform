import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AiChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI Assistant. How can I help you grow your business today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const axiosSecure = useAxiosSecure();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setIsLoading(true);

    try {
      const response = await axiosSecure.post("/chat/bot", { message: userMsg });
      setMessages(prev => [...prev, { text: response.data.data.message, sender: "bot" }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "I'm having trouble connecting right now. Please try again later.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-[#1A1A1A] border border-[#AC6CFF]/30 w-80 sm:w-96 h-[500px] rounded-2xl shadow-[0_0_40px_rgba(172,108,255,0.15)] flex flex-col overflow-hidden mb-4 relative font-inter"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#241A3A] to-[#1A1A1A] p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#AC6CFF]/20 flex items-center justify-center border border-[#AC6CFF]/30">
                    <Bot className="text-[#AC6CFF]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-white text-sm tracking-wider uppercase">AI Assistant</h3>
                    <p className="text-xs text-[#AC6CFF] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#AC6CFF] animate-pulse"></span> Online
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} aria-label="Close Chat" className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-[#2A2A2A]' : 'bg-[#AC6CFF]/20'}`}>
                        {msg.sender === 'user' ? <User size={12} className="text-white" /> : <Bot size={12} className="text-[#AC6CFF]" />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                        msg.sender === 'user' 
                          ? 'bg-[#2A2A2A] text-white rounded-br-none border border-white/5' 
                          : 'bg-[#AC6CFF]/10 text-gray-200 rounded-bl-none border border-[#AC6CFF]/20'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-end gap-2 max-w-[85%]">
                      <div className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center bg-[#AC6CFF]/20">
                        <Bot size={12} className="text-[#AC6CFF]" />
                      </div>
                      <div className="p-3 bg-[#AC6CFF]/10 rounded-2xl rounded-bl-none border border-[#AC6CFF]/20 flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#AC6CFF] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[#AC6CFF] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[#AC6CFF] animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-white/5 bg-[#121212]">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-[#2A2A2A] text-white text-sm rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-[#AC6CFF]/50 border border-white/5 transition-colors"
                  />
                  <button 
                    type="submit"
                    aria-label="Send message"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 w-8 h-8 flex items-center justify-center bg-[#AC6CFF] text-black rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={14} className="ml-0.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Assistant Chat"
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(172,108,255,0.4)] transition-transform hover:scale-110 active:scale-95 ${
            isOpen ? 'bg-[#2A2A2A] text-white border border-white/10' : 'bg-[#AC6CFF] text-black'
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    </>
  );
};

export default AiChatbotWidget;
