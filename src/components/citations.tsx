import React from "react";
import { Badge } from "./ui/badge";
import { Calendar, FileText, Link2, Mail } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  children: React.ReactNode[];
};

const TypeIcon = ({
  type,
}: {
  type: "email" | "event" | "document" | "link";
}) => {
  const icons = {
    email: Mail,
    event: Calendar,
    document: FileText,
    link: Link2,
  };
  const Icon = icons[type] || Calendar;
  return <Icon className="h-3 w-3" />;
};

const TypeBadge = ({ type }: { type: "event" | "email" }) => {
  const colors = {
    email: "bg-blue-100 text-blue-800",
    event: "bg-green-100 text-green-800",
  };

  return (
    <Badge
      variant="secondary"
      className={`${colors[type]} px-1.5 py-0.5 text-[10px]`}
    >
      <TypeIcon type={type} />
      <span className="ml-1 capitalize">{type}</span>
    </Badge>
  );
};

const Citations = ({ citations }: Props) => {
  return (
    <div className="group relative grid grid-cols-3 gap-x-4 gap-y-4">
      {citations.map((item, index) => {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            layout
          >
            <motion.div
              className="flex h-full flex-col rounded-md border bg-white p-3 text-xs shadow-sm transition-shadow hover:shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <TypeBadge type={item.props.type} />
              </div>
              <div className="text-sm font-medium">{item.props.title}</div>
              <div className="text-xs mt-1">{item.props.children}</div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Citations;
