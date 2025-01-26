import Chat from "@/components/chat";
import Image from "next/image";
import { ChatProvider } from "./AIProvider";

export default function Home() {
  return (
    <>
      <ChatProvider>
        <div className="flex flex-col min-w-0 h-dvh bg-background">
          <Chat />
        </div>
      </ChatProvider>
    </>
  );
}
