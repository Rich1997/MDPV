import { useMemo } from "react";
import { ScrollArea } from "../ui/scroll-area";
import NavMain from "./NavMain";

interface OutlineItem {
    title: string;
    url: string;
    id: string;
    level: number;
    items?: OutlineItem[];
}

interface OutlineProps {
    markdown: string;
}

export default function Outline({ markdown }: OutlineProps) {
    const outlineData = useMemo(() => {
        const headingRegex = /^(#{1,6})\s+(.+)$/gm;
        const matches = Array.from(markdown.matchAll(headingRegex));
        const headings = matches.map((match) => {
            const level = match[1].length;
            const text = match[2].trim();
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
            return { level, text, id };
        });

        const buildTree = (items: typeof headings): OutlineItem[] => {
            const stack: { level: number; item: OutlineItem }[] = [];
            const result: OutlineItem[] = [];

            for (const heading of items) {
                const newItem: OutlineItem = {
                    title: heading.text,
                    url: `#${heading.id}`,
                    id: heading.id,
                    level: heading.level,
                };

                while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
                    stack.pop();
                }

                if (stack.length === 0) {
                    result.push(newItem);
                } else {
                    let parent = stack[stack.length - 1].item;
                    const parentLevel = stack[stack.length - 1].level;
                    
                    if (!parent.items) {
                        parent.items = [];
                    }
                    parent.items.push(newItem);
                }

                stack.push({ level: heading.level, item: newItem });
            }

            return result;
        };

        return { navMain: buildTree(headings) };
    }, [markdown]);

    const handleHeadingClick = (id: string) => {
        const previewContainer = document.querySelector("[data-preview-scroll]");
        const element = document.getElementById(id);
        if (element && previewContainer) {
            const elementTop = element.getBoundingClientRect().top;
            const containerTop = previewContainer.getBoundingClientRect().top;
            const scrollPosition = previewContainer.scrollTop + (elementTop - containerTop);
            previewContainer.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="h-[calc(100dvh-70px)] flex flex-col overflow-hidden">
            <div className="text-base font-semibold sticky top-0 p-4 pt-6">Outline</div>
            <ScrollArea className="flex-1 pb-4 px-2">
                {outlineData.navMain.length === 0 ? (
                    <p className="text-muted-foreground text-sm px-2">No headings found</p>
                ) : (
                    <NavMain items={outlineData.navMain} onItemClick={handleHeadingClick} />
                )}
            </ScrollArea>
        </div>
    );
}