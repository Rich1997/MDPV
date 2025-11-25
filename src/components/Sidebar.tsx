"use client";
import { Files, Trash2, Settings, ListTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

type SidebarTab = "files" | "outline" | "trash" | "settings";

interface IconSidebarProps {
    activeTab: SidebarTab;
    onTabChange: (tab: SidebarTab) => void;
}

export default function IconSidebar({ activeTab, onTabChange }: IconSidebarProps) {
    const { toggleSidebar, open } = useSidebar();

    const handleTabClick = (tab: SidebarTab) => {
        if (activeTab === tab && open) {
            toggleSidebar();
        } else {
            onTabChange(tab);
            if (!open) {
                toggleSidebar();
            }
        }
    };

    const tabs = [
        { id: "files", icon: Files, title: "Files" },
        { id: "outline", icon: ListTree, title: "Outline" },
        { id: "trash", icon: Trash2, title: "Trash" },
    ];

    return (
        <div className="hidden md:flex flex-col items-center justify-between h-full w-12 bg-background py-4 z-20 border-r">
            <div className="flex flex-col">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <div
                            key={tab.id}
                            className={
                                activeTab === tab.id && open
                                    ? "border-l-2 border-primary h-12 w-12 flex items-center justify-center"
                                    : "h-12 w-12 flex items-center justify-center text-muted-foreground"
                            }
                        >
                            <button
                                onClick={() => handleTabClick(tab.id as SidebarTab)}
                                title={tab.title}
                                className={activeTab === tab.id && open ? "-ml-0.5" : ""}
                            >
                                <Icon size={24} className="hover:text-foreground" />
                            </button>
                        </div>
                    );
                })}
            </div>
            <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                size="icon"
                onClick={() => handleTabClick("settings")}
                title="Settings"
            >
                <Settings size={32} />
            </Button>
        </div>
    );
}
