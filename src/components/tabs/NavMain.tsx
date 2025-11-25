"use client";
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub } from "@/components/ui/sidebar";

interface OutlineItem {
    title: string;
    url: string;
    id: string;
    level: number;
    items?: OutlineItem[];
}

interface NavMainProps {
    items: OutlineItem[];
    onItemClick?: (id: string) => void;
}

export default function NavMain({ items, onItemClick }: NavMainProps) {
    const renderItems = (itemList: OutlineItem[], minLevel: number = 1): JSX.Element[] => {
        return itemList.map((item) => {
            const wrapsNeeded = item.level - minLevel;

            let content = (
                <SidebarMenuItem key={item.id} title={item.title}>
                    <SidebarMenuButton
                        onClick={() => onItemClick?.(item.id)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            );

            for (let i = 0; i < wrapsNeeded; i++) {
                content = <SidebarMenuSub key={`${item.id}-wrap-${i}`}>{content}</SidebarMenuSub>;
            }

            if (item.items?.length) {
                const childrenContent = renderItems(item.items, item.level + 1);
                content = (
                    <div key={item.id}>
                        {content}
                        <SidebarMenuSub>{childrenContent}</SidebarMenuSub>
                    </div>
                );
            }
            return content;
        });
    };

    return <div>{renderItems(items)}</div>;
}
