import { cn } from "@/lib/utils";
import { Markdown } from "./markdown";
import { motion } from "framer-motion";
import { ThumbsDown, Copy, ThumbsUp } from "lucide-react";

type Props = {
  role: "system" | "user" | "assistant" | "data";
  content: string;
};

const Message = ({ role, content }: Props) => {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={role}
    >
      <div className={cn("", role === "user" ? "flex justify-end" : "")}>
        <div
          className={cn(
            "flex flex-col gap-4",
            role === "user"
              ? "bg-primary text-primary-foreground px-3 py-2 rounded-xl"
              : "text-secondary-foreground px-3 py-2 rounded-xl"
          )}
        >
          {content.length > 20 ? <Markdown>{content}</Markdown> : null}
        </div>
      </div>
      {role === "assistant" && (
        <>
          <div className="flex items-center justify-end gap-4 ml-4">
            <div className="flex items-center bg-neutral-100 px-2 py-1 gap-1 rounded-lg cursor-pointer">
              <Copy className="h-3 w-3" />
              <span className="text-xs">Copy</span>
            </div>

            <div className="flex items-center gap-1 cursor-pointer">
              <ThumbsUp className="h-3 w-3" />
            </div>

            <div className="flex items-center gap-1 cursor-pointer">
              <ThumbsDown className="h-3 w-3" />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Message;
