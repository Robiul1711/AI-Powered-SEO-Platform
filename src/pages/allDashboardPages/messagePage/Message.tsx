import React, { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Send, MoreHorizontal, Loader2, Search, MessageSquareOff, MessageCircle, UserX, X } from "lucide-react";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slices/uiSlice";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useEcho from "@/hooks/useEcho";

const Message = () => {
  const currentUser = useSelector(selectCurrentUser);
  const axiosSecure = useAxiosSecure();
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<any>(null);
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

  // 1. Fetch Conversations (no polling — Reverb handles real-time)
  const { data: conversationsResponse, isLoading: isConversationsLoading, refetch: refetchConversations } = useClient({
    queryKey: ["conversations"],
    url: "/conversations",
    isPrivate: true,
  }) as any;

  const conversations = conversationsResponse?.data || [];

  // Debounced user search via API
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await axiosSecure.get(`/users/search?q=${encodeURIComponent(searchQuery)}`);
        const users = res.data?.data || [];
        const currentId = currentUser?.id || currentUser?.data?.id;
        setSearchResults(users.filter((u: any) => u.id !== currentId));
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery]);

  const filteredMembers = searchResults;

  const activeConversation = conversations.find((c: any) => c.id === selectedConversationId);

  // 2. Fetch Messages for active conversation (no polling — Reverb handles real-time)
  const { data: messagesResponse, isLoading: isMessagesLoading, error: messagesError, refetch: refetchMessages } = useClient({
    queryKey: ["messages", selectedConversationId?.toString() || ""],
    url: selectedConversationId ? `/conversations/${selectedConversationId}/messages` : "",
    isPrivate: true,
    enabled: !!selectedConversationId,
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
    setSearchQuery(""); // Clear search query on member selection
    
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
    url: "/conversations/send",
    method: "post",
    isPrivate: true,
    showToast: false,
    invalidateKeys: [["conversations"], ["messages", selectedConversationId?.toString() || ""], ["messages", ""]],
  });

  const { register, handleSubmit, reset } = useForm();

  // Auto-scroll to bottom only when a new message arrives or conversation changes
  const messagesLength = messages.length;
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesLength, selectedConversationId, newChatUser]);

  const onSendMessage = (data: any) => {
    if (!data.message?.trim()) return;

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
    <div className="font-inter pb-8 w-full">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-[calc(100vh-140px)] min-h-[580px]">
        {/* Left Sidebar: Conversations & Search */}
        <div
          className={`w-full lg:w-80 xl:w-96 bg-[#1A1A1A] border border-white/5 rounded-3xl sm:rounded-xl flex flex-col overflow-hidden ${selectedConversationId !== null || newChatUser !== null ? "hidden lg:flex" : "flex"
            }`}
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/5">
            <h2 className="text-lg sm:text-xl font-bold font-inter mb-4">Messages</h2>

            {/* Search Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search Here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/3 border border-white/10 rounded-full pl-11 pr-10 py-2.5 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all font-inter placeholder:text-white/20"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white rounded-full bg-white/10 transition-colors"
                  title="Clear Search"
                >
                  <X size={13} />
                </button>
              ) : (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-lg pointer-events-none">
                  <span className="text-[10px] text-white/40 font-inter">⌘</span>
                  <span className="text-[10px] text-white/40 font-inter">K</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 no-scrollbar">
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
                      setSearchQuery(""); // Clear search when selecting existing conversation
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
                        <h4 className="text-[13px] sm:text-sm font-bold font-inter truncate">
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
              /* NO CONVERSATIONS EMPTY STATE WITH ICON */
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-2.5">
                <div className="w-12 h-12 rounded-xl bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center shadow-[0_0_12px_rgba(172,108,255,0.15)]">
                  <MessageSquareOff size={22} />
                </div>
                <h4 className="text-xs font-bold text-white font-inter">No Conversations Found</h4>
                <p className="text-[11px] text-gray-400 font-inter max-w-[200px]">
                  Search for a team member or start a new message to begin chatting.
                </p>
              </div>
            ) : null}

            {/* Search Results Section - Only shows when searching */}
            {searchQuery.trim() && filteredMembers.length > 0 && (
              <div className="pt-4 mt-4">
                <h3 className="text-xs font-inter font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">
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
                          <h4 className="text-xs font-bold font-inter truncate">
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

            {searchQuery.trim() && isSearching && (
              <div className="flex justify-center py-6">
                <Loader2 className="animate-spin text-purple-500 w-5 h-5" />
              </div>
            )}

            {searchQuery.trim() && !isSearching && filteredMembers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-2.5">
                <div className="w-12 h-12 rounded-xl bg-white/5 text-gray-400 border border-white/10 flex items-center justify-center">
                  <UserX size={22} />
                </div>
                <h4 className="text-xs font-bold text-gray-300 font-inter">No Users Found</h4>
                <p className="text-[11px] text-gray-400 font-inter">
                  No members matched "{searchQuery}"
                </p>
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
                  <h3 className="font-inter font-bold text-base sm:text-lg">
                    {currentChatUser?.name || "Support"}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-green-500">
                    Online
                  </p>
                </div>
              </div>

              {/* Messages Area */}
              <div
                className="flex-1 overflow-y-auto p-4 sm:px-6 sm:py-6 flex flex-col gap-1.5 no-scrollbar"
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
                      const currentId = currentUser?.id || currentUser?.data?.id || currentUser?.user_id || currentUser?.userdata?.id || currentUser?.userdata?.user_id;
                      const isMe = Number(msg.sender_id) === Number(currentId);

                      const showDivider = msgDate !== lastDate;
                      lastDate = msgDate;
                      const isToday = msgDate === new Date().toLocaleDateString();

                      return (
                        <React.Fragment key={msg.id}>
                          {showDivider && (
                            <div className="flex justify-center my-4 mt-6 first:mt-0">
                              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-[10px] font-inter font-bold text-gray-400 capitalize shadow-sm">
                                {isToday ? "Today" : msgDate}
                              </span>
                            </div>
                          )}
                          <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mt-0.5`}>
                            <div className="flex flex-col max-w-[85%] sm:max-w-[65%]">
                              <div
                                className={`px-3 py-2 relative group flex flex-col sm:flex-row sm:items-end gap-x-3 gap-y-1 ${isMe
                                  ? "bg-gradient-to-r from-[#AC6CFF] to-[#674199] text-white rounded-t-[16px] rounded-bl-[16px] rounded-br-[4px] shadow-sm"
                                  : "bg-[#242424] border border-white/5 text-gray-200 rounded-t-[16px] rounded-br-[16px] rounded-bl-[4px]"
                                  }`}
                              >
                                <p className="text-[13px] sm:text-[14px] leading-snug whitespace-pre-wrap break-words">
                                  {msg.message}
                                </p>
                                <span className={`text-[10px] font-medium shrink-0 self-end opacity-70 ${isMe ? "text-white" : "text-gray-400"}`}>
                                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    });
                  })()
                ) : (
                  <div className="text-center py-10 text-gray-500 text-sm font-inter">
                    {newChatUser ? `Say hi to ${newChatUser.name}!` : "Start your conversation"}
                  </div>
                )}

                <div ref={scrollBottomRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSubmit(onSendMessage)}
                className="p-4 sm:px-6 sm:pb-6 pt-2 bg-[#1A1A1A]"
              >
                <div className="relative flex items-center bg-[#242424] border border-white/10 rounded-2xl p-1.5 focus-within:border-purple-500/50 transition-colors shadow-sm">
                  <input
                    {...register("message")}
                    autoComplete="off"
                    disabled={sendMessageMutation.isPending}
                    placeholder="Type your message..."
                    className="w-full bg-transparent px-4 py-3 text-[13px] text-white focus:outline-none placeholder:text-gray-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={sendMessageMutation.isPending}
                    className="shrink-0 flex items-center justify-center w-[40px] h-[40px] bg-[#673ab7] rounded-xl hover:bg-[#5e35b1] transition-all disabled:opacity-50 text-white mr-0.5"
                  >
                    {sendMessageMutation.isPending ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} className="ml-0.5" />
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* NO CONVERSATION SELECTED MAIN WINDOW EMPTY STATE */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 h-full space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 flex items-center justify-center shadow-[0_0_20px_rgba(172,108,255,0.2)]">
                <MessageCircle size={30} />
              </div>
              <h3 className="text-base font-bold text-white font-inter">Your Messages</h3>
              <p className="text-xs text-gray-400 font-inter max-w-sm leading-relaxed">
                Select a conversation from the left sidebar or search for a member to start real-time messaging.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
