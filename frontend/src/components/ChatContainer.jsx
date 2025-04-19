import React, { useEffect } from "react";
import { chatStore } from "../store/chatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { messages, getMessages, selectedUser, isMessagesLoading } =
    chatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if (isMessagesLoading) return <div>Loading...</div>;

  return <div className="flex-1 flex flex-col overflow-auto">
  
    <ChatHeader />

    <p>Messages ....</p>

    <MessageInput />


  </div>;
};

export default ChatContainer;
