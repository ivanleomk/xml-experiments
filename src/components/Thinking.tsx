import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Card } from "./ui/card";

type Props = {
  isThinking: boolean;
  children: React.ReactNode;
  title: string;
};

const ThinkingSVG = () => {
  return (
    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
      <style>
        {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .spinner {
                transform-box: fill-box;
                transform-origin: center;
                animation: spin 2.5s linear infinite;
              }
            `}
      </style>
      <path
        className="spinner"
        d="M12 3L12 21M3 12L21 12M5.636 5.636L18.364 18.364M18.364 5.636L5.636 18.364"
        stroke="#FF7F6E"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const Thinking = ({ isThinking, children, title }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="w-full overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-start gap-1.5 p-4 text-left duration-200">
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </motion.div>
            <span className="text-[15px] text-gray-700 font-medium">
              {title}
            </span>
            {isThinking ? <ThinkingSVG /> : null}
          </button>
        </CollapsibleTrigger>
        <AnimatePresence initial={false}>
          {isOpen && (
            <CollapsibleContent forceMount>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <div className="ml-4 mb-4 p-4 text-sm flex flex-col gap-y-6 text-gray-700 leading-relaxed bg-white">
                  {children}
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    </Card>
  );
};

export default Thinking;
