"use client";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarClose } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface PreviewProps {
    markdown: string;
    showEditor: boolean;
    onToggleEditor: () => void;
}

export default function Preview({ markdown, showEditor, onToggleEditor }: PreviewProps) {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex justify-between items-center gap-2 px-4 py-1 border-b bg-card text-card-foreground flex-shrink-0 select-none">
                <div>Preview</div>
                <Button
                    onClick={onToggleEditor}
                    size="icon"
                    title={showEditor ? "Hide editor" : "Show editor"}
                    className="md:rotate-0 -rotate-90"
                >
                    {showEditor ? <Sidebar size={20} /> : <SidebarClose size={20} />}
                </Button>
            </div>
            <div className="flex-1 max-h-[calc(100dvh-109px)] py-6 px-4 overflow-auto" data-preview-scroll>
                <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base prose-p:text-base prose-a:text-chart-3 prose-a:visited:text-chart-1 prose-code:text-base [&_code:not(.hljs)]:text-primary [&_code:not(.hljs)]:px-1 [&_code:not(.hljs)]:py-0.5 [&_code:not(.hljs)]:bg-card [&_code:not(.hljs)]:rounded-lg prose-pre:bg-card prose-pre:text-card-foreground [&_h1]:scroll-mt-24 [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 [&_h4]:scroll-mt-24 [&_h5]:scroll-mt-24 [&_h6]:scroll-mt-24">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                            h1: ({ children }) => <h1 id={generateId(children)}>{children}</h1>,
                            h2: ({ children }) => <h2 id={generateId(children)}>{children}</h2>,
                            h3: ({ children }) => <h3 id={generateId(children)}>{children}</h3>,
                            h4: ({ children }) => <h4 id={generateId(children)}>{children}</h4>,
                            h5: ({ children }) => <h5 id={generateId(children)}>{children}</h5>,
                            h6: ({ children }) => <h6 id={generateId(children)}>{children}</h6>,
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

function generateId(children: any): string {
    const text = Array.isArray(children) ? children.join("") : String(children);
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}
