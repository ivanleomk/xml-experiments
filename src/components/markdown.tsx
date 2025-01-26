import Link from "next/link";
import React, { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import rehypeRaw from "rehype-raw";
import Editor from "./Editor";
import Thinking from "./Thinking";
import Block from "./Block";
import Citations from "./citations";

const components: Partial<Components> = {
  // @ts-expect-error
  //   code: CodeBlock,
  pre: ({ children }) => <>{children}</>,
  ol: ({ node, children, ...props }) => {
    return (
      <ol className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ node, children, ...props }) => {
    return (
      <li className="py-1" {...props}>
        {children}
      </li>
    );
  },
  ul: ({ node, children, ...props }) => {
    return (
      <ul className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ul>
    );
  },
  strong: ({ node, children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
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
  h1: ({ node, children, ...props }) => {
    return (
      <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ node, children, ...props }) => {
    return (
      <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ node, children, ...props }) => {
    return (
      <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ node, children, ...props }) => {
    return (
      <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ node, children, ...props }) => {
    return (
      <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
        {children}
      </h5>
    );
  },
  h6: ({ node, children, ...props }) => {
    return (
      <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
        {children}
      </h6>
    );
  },
  p: ({ node, children, ...props }) => {
    if (children?.[0]?.type !== "text") {
      return <div>{children}</div>;
    }
    return <p className="text-sm">{children}</p>;
  },
  content: ({ node, children, ...props }) => {
    // TODO: Let's format the children here nicely
    return <div className="flex flex-col gap-y-2">{children}</div>;
  },

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

  citations: ({ node, children, ...props }) => {
    if (!children || !Array.isArray(children)) {
      return null;
    }

    const citations = children.filter((child) => child.type === "citation");
    return <Citations citations={citations} />;
  },
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={[rehypeRaw]}
      //   allowDangerousHtml
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
