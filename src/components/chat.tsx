"use client";
import React from "react";
import MultimodalInput from "./multimodal-input";
import Message from "./message";
import { Markdown } from "./markdown";
import { useChatContext } from "@/app/AIProvider";

const Chat = () => {
  const { isLoading, messages, input, setInput, handleSubmit } =
    useChatContext();

  const content = `
  <thinking>
    <title>Determining the Capital of Turkey</title>
    <content>
      To answer the question "What is the capital of Turkey?", I need to recall or verify the current capital city of Turkey.
    </content>
  </thinking>

  I know that Turkey is a transcontinental country located mainly on the Anatolian Peninsula in Western Asia, with a smaller portion on the Balkan Peninsula in Southeast Europe.

  <citations>
    <citation id="1" type="email" title="Citation title">This was a citation</citation>
  </citations>

  `;

  return (
    <>
      <div className="h-[calc(100dvh-120px)] max-w-3xl mx-auto w-full overflow-y-auto">
        <div className="flex flex-col gap-6 px-4 pt-4">
          {messages.map((m) => (
            <Message key={m.id} role={m.role} content={m.content} />
          ))}
          <div className="py-20 h-20" />
          {/* <Markdown>{content}</Markdown> */}
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
