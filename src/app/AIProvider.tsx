"use client";
import { ChatRequestOptions } from "ai";
import { Message, useChat } from "@ai-sdk/react";
import { createContext, useContext } from "react";

type ChatContextType = {
  isLoading: boolean;
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (
    event?: { preventDefault?: () => void } | undefined,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  reload: () => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, messages, input, setInput, handleSubmit, reload } =
    useChat({
      experimental_throttle: 100,
    });

  return (
    <ChatContext.Provider
      value={{
        isLoading,
        messages,
        input,
        setInput,
        handleSubmit,
        reload,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
