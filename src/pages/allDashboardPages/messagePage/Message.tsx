import React, { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Send, MoreHorizontal, Loader2, Search } from "lucide-react";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slices/uiSlice";

import useEcho from "@/hooks/useEcho";

const Message = () => {
  const currentUser = useSelector(selectCurrentUser);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const echo = useEcho();

  // 1. Real-time Message Listener
  useEffect(() => {
    // Universal ID detection for channel subscription
    const currentId = currentUser?.id || currentUser?.data?.id || currentUser?.user_id || currentUser?.userdata?.id || currentUser?.userdata?.user_id;
    
    if (echo && currentId) {
      const channelName = `user.${currentId}`;
      const channel = echo.private(channelName);
      
      channel.listen(".message.sent", (e: any) => {
        refetchConversations();
        if (selectedConversationId) {
          refetchMessages();
        }
      });

      return () => {
        echo.leave(channelName);
      };
    }
  }, [echo, currentUser, selectedConversationId]);

  // 1. Fetch Conversations
  const { data: conversationsResponse, isLoading: isConversationsLoading, refetch: refetchConversations } = useClient({
    queryKey: ["conversations"],
    url: "/conversations",
    isPrivate: true,
  }) as any;

  const conversations = conversationsResponse?.data || [];

  const allMembers = useMemo(() => {
    // If the API provides all_users directly, use it
    if (conversationsResponse?.all_users) {
      return conversationsResponse.all_users.filter((u: any) => u.id !== currentUser?.id);
    }

    const usersMap = new Map();
    conversations.forEach((conv: any) => {
      // Support new other_user property
      if (conv.other_user) usersMap.set(conv.other_user.id, conv.other_user);
      if (conv.sender) usersMap.set(conv.sender.id, conv.sender);
      if (conv.receiver) usersMap.set(conv.receiver.id, conv.receiver);
    });
    const extraUsers = conversationsResponse?.users || conversationsResponse?.members || [];
    extraUsers.forEach((u: any) => usersMap.set(u.id, u));

    return Array.from(usersMap.values()).filter(u => u.id !== currentUser?.id);
  }, [conversations, conversationsResponse, currentUser]);

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return allMembers;
    const query = searchQuery.toLowerCase();
    return allMembers.filter((user: any) =>
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  }, [allMembers, searchQuery]);

  const activeConversation = conversations.find((c: any) => c.id === selectedConversationId);

  // 2. Fetch Messages for active conversation
  const { data: messagesResponse, isLoading: isMessagesLoading, error: messagesError, refetch: refetchMessages } = useClient({
    queryKey: ["messages", selectedConversationId?.toString() || ""],
    url: selectedConversationId ? `/conversations/${selectedConversationId}/messages` : "",
    isPrivate: true,
    enabled: !!selectedConversationId,
    options: { refetchInterval: false }
  }) as any;

  // Handle 404 or other errors for messages
  useEffect(() => {
    if (messagesError?.response?.status === 404) {
      setSelectedConversationId(null);
      setNewChatUser(null);
    }
  }, [messagesError]);

  const messages = messagesResponse?.data?.messages || messagesResponse?.data || [];

  // Handle starting a new conversation with a user not in list
  const [newChatUser, setNewChatUser] = useState<any>(null);

  const onSelectUser = (user: any) => {
    // Check if a conversation already exists with this user
    const existingConv = conversations.find((c: any) => {
      const otherUser = c.other_user || (Number(c.sender_id) === Number(currentUser?.id) ? c.receiver : c.sender);
      return Number(otherUser?.id) === Number(user.id);
    });

    if (existingConv) {
      setSelectedConversationId(existingConv.id);
      setNewChatUser(null);
    } else {
      setSelectedConversationId(null);
      setNewChatUser(user);
    }
  };

  // 3. Setup Send Message Mutation
  const sendMessageMutation = useMutationClient({
    url: "/messages/send",
    method: "post",
    isPrivate: true,
    showToast: false,
    invalidateKeys: [["conversations"], ["messages", selectedConversationId?.toString() || ""], ["messages", ""]],
  });

  const { register, handleSubmit, reset } = useForm();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMessagesLoading, newChatUser, sendMessageMutation.isPending]);

  const onSendMessage = (data: any) => {
    if (!data.message?.trim()) return;

    // Use universal ID detection for currentUser
    const myId = currentUser?.id || currentUser?.data?.id || currentUser?.user_id || currentUser?.userdata?.id;
    const receiverId = currentChatUser?.id;

    if (!receiverId) return;

    sendMessageMutation.mutate(
      {
        data: {
          receiver_id: receiverId,
          message: data.message
        }
      },
      {
        onSuccess: (res: any) => {
          reset();
          if (newChatUser) {
            setNewChatUser(null);
            const newConvId = res?.data?.conversation_id || res?.data?.data?.conversation_id;
            if (newConvId) {
              setSelectedConversationId(newConvId);
            }
          }
        }
      }
    );
  };

  const getOtherUser = (conversation: any) => {
    if (conversation.other_user) return conversation.other_user;
    
    const myId = currentUser?.id || currentUser?.data?.id || currentUser?.user_id || currentUser?.userdata?.id;
    
    if (Number(conversation.sender?.id) === Number(myId)) {
      return conversation.receiver;
    }
    return conversation.sender;
  };

  const currentChatUser = activeConversation ? getOtherUser(activeConversation) : newChatUser;

  return (
    <div className="font-inter text-white pb-6">
      <div className="flex flex-col lg:flex-row gap-6 h-[600px] sm:h-[700px] lg:h-[700px] relative">
        {/* Sidebar: Conversion List */}
        <div
          className={`w-full lg:w-1/3 bg-[#1A1A1A] border border-white/5 rounded-3xl sm:rounded-xl overflow-hidden flex flex-col ${(selectedConversationId !== null || newChatUser !== null) && "hidden lg:flex"}`}
        >
          <div className="p-5 sm:p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-orbitron font-bold">
              Recent Chats
            </h2>
            {isConversationsLoading && <Loader2 size={16} className="animate-spin text-purple-500" />}
          </div>

          {/* Search Area */}
          <div className="p-4 border-b border-white/5">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-500 transition-colors">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search Here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/3 border border-white/10 rounded-full pl-11 pr-14 py-2.5 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all font-orbitron placeholder:text-white/20"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-lg pointer-events-none">
                <span className="text-[10px] text-white/40 font-inter">⌘</span>
                <span className="text-[10px] text-white/40 font-inter">K</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar">
            {isConversationsLoading && conversations.length === 0 ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-purple-500" />
              </div>
            ) : conversations.length > 0 && !searchQuery.trim() ? (
              conversations.map((conversation: any) => {
                const otherUser = getOtherUser(conversation);
                const messagesList = conversation.messages || [];
                const lastMsg = conversation.last_message || messagesList[messagesList.length - 1];
                const msgTime = lastMsg?.created_at || conversation.last_message_at || conversation.created_at;

                return (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversationId(conversation.id);
                      setNewChatUser(null);
                    }}
                    className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all flex gap-3 sm:gap-4 items-center ${selectedConversationId === conversation.id
                      ? "bg-linear-to-b from-[#AC6CFF] to-[#674199] text-white shadow-[0_0_20px_rgba(172,108,255,0.3)]"
                      : "bg-[#242424] hover:bg-[#2a2a2a]"
                      }`}
                  >
                    <img
                      src={otherUser?.avatar_url || otherUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUser?.name || conversation.id}`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 object-cover"
                      alt="avatar"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[13px] sm:text-sm font-bold font-orbitron truncate">
                          {otherUser?.name || "Support"}
                        </h4>
                        <span className="text-[9px] sm:text-[10px] opacity-60 whitespace-nowrap">
                          {msgTime ? new Date(msgTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                        </span>
                      </div>
                      <p className="text-[10px] opacity-70 truncate mt-0.5">
                        {lastMsg?.message || "No messages yet"}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : conversations.length === 0 && !searchQuery.trim() ? (
              <div className="text-center py-5 text-gray-500 text-sm font-orbitron">
                No conversations found
              </div>
            ) : null}

            {/* Search Results Section - Only shows when searching */}
            {searchQuery.trim() && filteredMembers.length > 0 && (
              <div className="pt-4 mt-4 border-t border-white/5">
                <h3 className="text-xs font-orbitron font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">
                  Search Results
                </h3>
                <div className="space-y-2">
                  {filteredMembers.map((user: any) => {
                    return (
                      <div
                        key={user.id}
                        onClick={() => onSelectUser(user)}
                        className={`p-3 rounded-xl cursor-pointer transition-all flex gap-3 items-center bg-[#242424] hover:bg-[#2a2a2a] border border-transparent ${newChatUser?.id === user.id ? 'border-purple-500/50' : ''}`}
                      >
                        <img
                          src={user.avatar_url || user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                          className="w-8 h-8 rounded-full border border-white/10 object-cover"
                          alt="avatar"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold font-orbitron truncate">
                            {user.name}
                          </h4>
                          <p className="text-[10px] opacity-50 truncate">
                            Start a new chat
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {searchQuery.trim() && filteredMembers.length === 0 && (
              <div className="text-center py-5 text-gray-500 text-sm font-orbitron">
                No users found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Window */}
        <div
          className={`flex-1 bg-[#1A1A1A] border border-white/5 rounded-3xl sm:rounded-xl flex flex-col relative overflow-hidden ${(selectedConversationId === null && newChatUser === null) && "hidden lg:flex"}`}
        >
          {selectedConversationId !== null || newChatUser !== null ? (
            <>
              {/* Chat Header */}
              <div className="p-4 sm:p-6 border-b border-white/5 flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setSelectedConversationId(null);
                    setNewChatUser(null);
                  }}
                  className="lg:hidden p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <MoreHorizontal className="rotate-180" size={20} />
                </button>
                <img
                  src={currentChatUser?.avatar_url || currentChatUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentChatUser?.name || (selectedConversationId || 'new')}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-purple-500/30 object-cover"
                  alt="avatar"
                />
                <div>
                  <h3 className="font-orbitron font-bold text-base sm:text-lg">
                    {currentChatUser?.name || "Support"}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-green-500">
                    Online
                  </p>
                </div>
              </div>

              {/* Messages Area */}
              <div
                className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-4 sm:space-y-6 custom-scrollbar"
              >
                {isMessagesLoading && messages.length === 0 ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin text-purple-500" />
                  </div>
                ) : messages.length > 0 ? (
                  (() => {
                    let lastDate = "";
                    return messages.map((msg: any, index: number) => {
                      const msgDate = new Date(msg.created_at).toLocaleDateString();
                      
                      // Debug: Check why alignment might be failing
                      const currentId = currentUser?.id || currentUser?.data?.id || currentUser?.user_id || currentUser?.userdata?.id || currentUser?.userdata?.user_id;
                      const isMe = Number(msg.sender_id) === Number(currentId);
                      

                      const showDivider = msgDate !== lastDate;
                      lastDate = msgDate;

                      const isToday = msgDate === new Date().toLocaleDateString();

                      return (
                        <React.Fragment key={msg.id}>
                          {showDivider && (
                            <div className="flex justify-center my-6">
                              <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-xl text-[10px] font-orbitron font-bold text-gray-400 capitalize">
                                {isToday ? "Today" : msgDate}
                              </span>
                            </div>
                          )}
                          <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-3xl relative ${isMe
                                ? "bg-linear-to-r from-[#AC6CFF] to-[#674199] text-white shadow-[0_4px_15px_rgba(172,108,255,0.2)]"
                                : "bg-[#242424] border border-white/5 text-gray-200"
                                }`}
                            >
                              <p className="text-xs sm:text-[13px] leading-relaxed">
                                {msg.message}
                              </p>
                              <span className={`text-[9px] sm:text-[10px] mt-2 block opacity-50 ${isMe ? "text-right" : "text-left"}`}>
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    });
                  })()
                ) : (
                  <div className="text-center py-10 text-gray-500 text-sm font-orbitron">
                    {newChatUser ? `Say hi to ${newChatUser.name}!` : "Start your conversation"}
                  </div>
                )}


                <div ref={scrollBottomRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSubmit(onSendMessage)}
                className="p-4 sm:p-6 pt-0"
              >
                <div className="relative">
                  <input
                    {...register("message")}
                    autoComplete="off"
                    disabled={sendMessageMutation.isPending}
                    placeholder="Type Your Message..."
                    className="w-full bg-[#242424] border border-white/5 rounded-2xl px-5 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 transition-all pr-14 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={sendMessageMutation.isPending}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-[#AC6CFF] p-2 sm:p-3 rounded-xl hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
                  >
                    {sendMessageMutation.isPending ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} className="sm:size-[18px]" />
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 h-full">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <MoreHorizontal size={32} opacity={0.2} />
              </div>
              <p className="font-orbitron text-sm font-bold">
                Select a conversation or member to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
