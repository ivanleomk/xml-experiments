import { cn, SearchGroupId, searchGroups } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "motion/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { HoverCardArrow } from "@radix-ui/react-hover-card";
type Props = {
  setSelectedGroupId: (groupId: SearchGroupId) => void;
  selectedGroupId: SearchGroupId;
};

const ResourceGroups = ({ setSelectedGroupId, selectedGroupId }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        width: isExpanded ? "auto" : "50px",
        gap: isExpanded ? "0.5rem" : 0,
        paddingRight: isExpanded ? "0.5rem" : 0,
      }}
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeInOut",
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      className={cn(
        "inline-flex items-center",
        "min-w-[38px]",
        "p-2",
        "rounded-full border border-neutral-200 dark:border-neutral-800",
        "bg-white dark:bg-neutral-900",
        "shadow-sm overflow-visible",
        "relative z-10",
        isExpanded ? "gap-2" : "gap-0"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <AnimatePresence>
        {searchGroups.map((group, index) => {
          const isSelected = group.id === selectedGroupId;
          const showItem = isExpanded || isSelected;

          const Icon = group.icon;
          return (
            <motion.div
              key={group.id}
              animate={{
                width: showItem ? "28px" : 0,
                opacity: showItem ? 1 : 0,
                x: showItem ? 0 : -10,
                marginLeft: isExpanded && index > 0 ? "0.5rem" : 0,
                marginRight:
                  isExpanded && index < searchGroups.length - 1 ? "0.5rem" : 0,
              }}
              exit={{ opacity: 1, x: 0, transition: { duration: 0 } }}
              style={{ margin: 0 }}
              className={cn(
                "relative flex items-center justify-center size-8 rounded-full cursor-pointer",
                "flex-shrink-0",
                isSelected
                  ? "text-white"
                  : "text-neutral-600 dark:text-neutral-300"
              )}
              onClick={() => setSelectedGroupId(group.id)}
            >
              {isSelected && (
                <motion.div
                  layoutId="highlight"
                  className="absolute -inset-2 size-12 rounded-full bg-neutral-500 dark:bg-neutral-600"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div
                    className={cn(
                      "absolute -inset-1 size-10 rounded-full flex items-center justify-center z-0",
                      !isSelected &&
                        "hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                    )}
                  >
                    <Icon className="w-5 h-5 z-10" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent
                  side="bottom"
                  align="center"
                  sideOffset={20}
                  className={cn(
                    "z-[100]",
                    "w-44 p-2 rounded-lg",
                    "border border-neutral-200 dark:border-neutral-700",
                    "bg-white dark:bg-neutral-800 shadow-md",
                    "transition-opacity duration-300"
                  )}
                >
                  <HoverCardArrow className="fill-white dark:fill-neutral-800" />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {group.name}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                      {group.description}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResourceGroups;
