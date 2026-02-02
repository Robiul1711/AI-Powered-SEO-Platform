import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, MoreHorizontal } from "lucide-react";

const Message = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Mitchell",
      text: "Hi John! I Hope You're Doing Well. I Wanted To Let You Know That Your March SEO Report Is Now Ready.",
      time: "10:25",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      text: "Thanks Sarah! I'll Take A Look At It Today. How Are The Rankings Looking?",
      time: "Now",
      isMe: true,
    },
  ]);

  const { register, handleSubmit, reset } = useForm();

  const contacts = [
    {
      name: "Sarah Mitchell",
      role: "Account Manager",
      lastMsg: "I've Uploaded Your March Report",
      time: "5:08 PM",
      unread: 2,
    },
    {
      name: "Sarah Mitchell",
      role: "Account Manager",
      lastMsg: "I've Uploaded Your March Report",
      time: "Yesterday",
    },
    {
      name: "Sarah Mitchell",
      role: "Account Manager",
      lastMsg: "I've Uploaded Your March Report",
      time: "Yesterday",
    },
    {
      name: "Sarah Mitchell",
      role: "Account Manager",
      lastMsg: "I've Uploaded Your March Report",
      time: "Yesterday",
    },
  ];

  const onSendMessage = (data: any) => {
    if (!data.message.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: "Me",
      text: data.message,
      time: "Now",
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    reset(); // Clear input
  };

  return (
    <div className="font-inter text-white">
      <header className="mb-8">
        <h1 className="text-4xl font-orbitron font-bold">Messages</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Communicate With Your Account Team
        </p>
      </header>

      <div className="flex gap-6 h-[700px]">
        {/* Sidebar: Conversion List */}
        <div className="w-1/3 bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-orbitron font-bold">Conversion</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {contacts.map((contact, i) => (
              <div
                key={i}
                onClick={() => setActiveChat(i)}
                className={`p-4 rounded-[1.5rem] cursor-pointer transition-all flex gap-4 items-center ${
                  activeChat === i
                    ? "bg-gradient-to-b from-[#AC6CFF] to-[#674199] hover:opacity-90 text-white  py-4  rounded-xl transition-all shadow-[0_0_20px_rgba(172,108,255,0.3)]"
                    : "bg-[#242424] hover:bg-[#2a2a2a]"
                }`}
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                  className="w-12 h-12 rounded-full border border-white/10"
                  alt="avatar"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold font-orbitron truncate">
                      {contact.name}
                    </h4>
                    <span className="text-[10px] opacity-60 whitespace-nowrap">
                      {contact.time}
                    </span>
                  </div>
                  <p className="text-[10px] opacity-70 truncate mt-0.5">
                    {contact.lastMsg}
                  </p>
                </div>
                {contact.unread && activeChat !== i && (
                  <span className="bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {contact.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Window */}
        <div className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] flex flex-col relative overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-4">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat + 10}`}
              className="w-12 h-12 rounded-full border border-purple-500/30"
              alt="avatar"
            />
            <div>
              <h3 className="font-orbitron font-bold text-lg">
                {contacts[activeChat].name}
              </h3>
              <p className="text-xs text-gray-500">
                {contacts[activeChat].role}
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            <div className="text-center">
              <span className="bg-[#242424] px-4 py-1.5 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Today
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-[1rem] relative ${
                    msg.isMe
                      ? "bg-gradient-to-b from-[#AC6CFF] to-[#674199] hover:opacity-90 text-white   transition-all shadow-[0_0_20px_rgba(172,108,255,0.3)]"
                      : "bg-[#242424] rounded-tl-none border border-white/5"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className="text-[10px] opacity-40 mt-1 block">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            <div className="flex justify-start">
              <div className="bg-[#242424] p-4 rounded-full flex gap-1.5">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
              </div>
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit(onSendMessage)} className="p-6 pt-0">
            <div className="relative">
              <input
                {...register("message")}
                autoComplete="off"
                placeholder="Type Your Message............"
                className="w-full bg-[#242424] border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#AC6CFF] p-3 rounded-xl hover:opacity-90 transition-all shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
