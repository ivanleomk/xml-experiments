import React, { useCallback, useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { cn, SearchGroupId, searchGroups } from "@/lib/utils";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import ResourceGroups from "./resource-groups";
import { toast } from "@/hooks/use-toast";
import { ArrowUp, StopCircleIcon } from "lucide-react";
import { Button } from "./ui/button";

const MultimodalInput = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
}: {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<SearchGroupId>("All");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { width } = useWindowSize();

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 20
      }px`;
    }
  };

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = "98px";
    }
  };

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    ""
  );

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || "";
      setInput(finalValue);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
    adjustHeight();
  }, [input, setLocalStorageInput]);

  const submitForm = useCallback(() => {
    // window.history.replaceState({}, "", `/chat/${chatId}`);

    handleSubmit(undefined);

    // setAttachments([]);
    setLocalStorageInput("");
    resetHeight();

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [
    // attachments,
    handleSubmit,
    // setAttachments,
    setLocalStorageInput,
    width,
    // chatId,
  ]);

  return (
    <div className="relative w-full flex flex-col gap-4 mb-4">
      <div className="flex w-full border border-input px-3 py-2 text-base ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 md:text-sm max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700">
        <div className="w-full">
          <Textarea
            placeholder="Ask me anything!"
            ref={textareaRef}
            value={input}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();

                if (isLoading) {
                  toast({
                    title: "Please wait for the model to finish its response!",
                    variant: "destructive",
                  });
                } else {
                  submitForm();
                }
              }
            }}
            className="placeholder:text-muted-foreground focus-visible:outline-none mb-2 min-h-[24px] focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-none shadow-none overflow-hidden resize-none"
          />
        </div>
        <div
          className={cn(
            "absolute bottom-1 left-2 flex justify-between items-center p-2",
            "bg-neutral-100 dark:bg-neutral-900",
            isFocused ? "!border-neutral-300 dark:!border-neutral-600" : "",
            isLoading ? "!opacity-20 !cursor-not-allowed" : ""
          )}
        >
          <ResourceGroups
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={setSelectedGroupId}
          />
        </div>
        <div className="absolute bottom-1 right-2 p-2 w-fit flex flex-row justify-end">
          <button
            className={cn(
              "inline-flex items-center",
              "min-w-[38px]",
              "rounded-full border border-neutral-200 dark:border-neutral-800",
              "bg-white dark:bg-neutral-900",
              "shadow-sm overflow-visible",
              "relative z-10 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800"
            )}
            onClick={(event) => {
              event.preventDefault();
              submitForm();
            }}
            disabled={isLoading}
          >
            <div className="size-12 flex items-center justify-center">
              {isLoading ? (
                <StopCircleIcon className="w-5 h-5" />
              ) : (
                <ArrowUp className="w-5 h-5 " />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultimodalInput;
