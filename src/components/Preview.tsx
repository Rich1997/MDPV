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
            <div className="flex justify-between items-center gap-2 px-4 py-1 border-b bg-card text-card-foreground flex-shrink-0">
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
            <div className="flex-1 max-h-[calc(100dvh-87px)] py-6 px-4 overflow-auto">
                <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base prose-p:text-base prose-a:text-chart-3 prose-a:visited:text-chart-1 prose-code:text-base [&_code:not(.hljs)]:text-primary [&_code:not(.hljs)]:px-1 [&_code:not(.hljs)]:py-0.5 [&_code:not(.hljs)]:bg-card [&_code:not(.hljs)]:rounded-lg prose-pre:bg-card prose-pre:text-card-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
