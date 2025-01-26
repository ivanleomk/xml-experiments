"use client";
import React from "react";
import MultimodalInput from "./multimodal-input";
import Message from "./message";
import { Markdown } from "./markdown";
import { useChatContext } from "@/app/AIProvider";

const Chat = () => {
  const { isLoading, messages, input, setInput, handleSubmit } =
    useChatContext();

  return (
    <>
      <div className="h-[calc(100dvh-120px)] max-w-3xl mx-auto w-full overflow-y-auto">
        <div className="flex flex-col gap-6 px-4 pt-4">
          {messages.map((m) => (
            <Message key={m.id} role={m.role} content={m.content} />
          ))}
          <div className="py-20 h-20" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <MultimodalInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Chat;
