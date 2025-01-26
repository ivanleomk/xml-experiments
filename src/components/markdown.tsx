/* eslint-disable */
import Link from "next/link";
import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import rehypeRaw from "rehype-raw";
import Thinking from "./Thinking";
import Citations from "./citations";

const components = {
  //@ts-ignore
  pre: ({ children }) => <>{children}</>,
  //@ts-ignore
  ol: ({ node, children, ...props }) => {
    return (
      <ol className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ol>
    );
  },
  //@ts-ignore
  li: ({ node, children, ...props }) => {
    return (
      <li className="py-1" {...props}>
        {children}
      </li>
    );
  },
  //@ts-ignore
  ul: ({ node, children, ...props }) => {
    return (
      <ul className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ul>
    );
  },
  //@ts-ignore
  strong: ({ node, children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
  //@ts-ignore
  a: ({ node, children, ...props }) => {
    return (
      // @ts-expect-error
      <Link
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  //@ts-ignore
  h1: ({ node, children, ...props }) => {
    return (
      <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h1>
    );
  },
  //@ts-ignore
  h2: ({ node, children, ...props }) => {
    return (
      <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h2>
    );
  },
  //@ts-ignore
  h3: ({ node, children, ...props }) => {
    return (
      <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h3>
    );
  },
  //@ts-ignore
  h4: ({ node, children, ...props }) => {
    return (
      <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
        {children}
      </h4>
    );
  },
  //@ts-ignore
  h5: ({ node, children, ...props }) => {
    return (
      <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
        {children}
      </h5>
    );
  },
  //@ts-ignore
  h6: ({ node, children, ...props }) => {
    return (
      <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
        {children}
      </h6>
    );
  },
  //@ts-ignore
  p: ({ node, children, ...props }) => {
    if (children?.[0]?.type !== "text") {
      return <div>{children}</div>;
    }
    return <p className="text-sm">{children}</p>;
  },
  //@ts-ignore
  content: ({ node, children, ...props }) => {
    // TODO: Let's format the children here nicely
    return <div className="flex flex-col gap-y-2">{children}</div>;
  },
  //@ts-ignore
  title: ({ node, children, ...props }) => {
    return <div>{children}</div>;
  },

  //@ts-ignore
  thinking: ({ node, children, ...props }) => {
    const endPosition = node.position.end;
    const lastChildEndPosition =
      node.children.length >= 1
        ? node.children[node.children.length - 1].position.end
        : endPosition;

    const isUnclosed =
      endPosition.offset === lastChildEndPosition.offset &&
      endPosition.line === lastChildEndPosition.line &&
      endPosition.column === lastChildEndPosition.column;

    const titleNode =
      children?.filter(
        //@ts-ignore
        (item) => typeof item === "object" && item["key"].includes("title")
      )?.[0]?.props?.children ?? "Generating Title..";

    const nonTitleChildren = children.filter(
      (child) => !(typeof child === "object" && child["key"].includes("title"))
    );

    return (
      <Thinking isThinking={isUnclosed} title={titleNode}>
        {nonTitleChildren}
      </Thinking>
    );
  },

  //@ts-ignore
  citations: ({ node, children, ...props }) => {
    if (!children || !Array.isArray(children)) {
      return null;
    }

    const citations = children.filter((child) => child.type === "citation");
    //@ts-ignore
    return <Citations citations={citations} />;
  },
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={[rehypeRaw]}
      //@ts-ignore
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
