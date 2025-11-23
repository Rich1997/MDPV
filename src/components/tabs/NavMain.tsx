"use client";

import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenu } from "@/components/ui/sidebar";

interface OutlineItem {
    title: string;
    url: string;
    id: string;
    items?: OutlineItem[];
}

interface NavMainProps {
    items: OutlineItem[];
    onItemClick?: (id: string) => void;
}

export default function NavMain({ items, onItemClick }: NavMainProps) {
    return (
        <div>
            {items.map((item) => (
                <div key={item.id} title={item.title}>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => onItemClick?.(item.id)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <span>{item.title}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {item.items?.length ? (
                        <SidebarMenuSub>
                            <NavMain items={item.items} onItemClick={onItemClick} />
                        </SidebarMenuSub>
                    ) : null}
                </div>
            ))}
        </div>
    );
}
