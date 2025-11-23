import { useMemo } from "react";
import { ScrollArea } from "../ui/scroll-area";
import NavMain from "./NavMain";

interface OutlineItem {
    title: string;
    url: string;
    id: string;
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

        const buildTree = (
            items: typeof headings,
            parentLevel: number = 0
        ): { items: OutlineItem[]; count: number } => {
            const result: OutlineItem[] = [];
            let i = 0;

            while (i < items.length) {
                const item = items[i];

                if (item.level === parentLevel + 1) {
                    const children = buildTree(items.slice(i + 1), item.level);
                    result.push({
                        title: item.text,
                        url: `#${item.id}`,
                        id: item.id,
                        items: children.items.length > 0 ? children.items : undefined,
                    });
                    i += children.count + 1;
                } else if (item.level > parentLevel + 1) {
                    i++;
                } else {
                    break;
                }
            }

            return { items: result, count: i };
        };

        const tree = buildTree(headings);
        return { navMain: tree.items };
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
