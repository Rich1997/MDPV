// AppSidebar.tsx
"use client";
import * as React from "react";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import Files from "./tabs/Files";
import Outline from "./tabs/Outline";
import Trash from "./tabs/Trash";
import Settings from "./tabs/Settings";

type SidebarTab = "files" | "outline" | "trash" | "settings";

interface AppSidebarProps {
    activeTab: SidebarTab;
    markdown: string;
}

export default function AppSidebar({ activeTab, markdown }: AppSidebarProps) {
    const renderTabContent = () => {
        switch (activeTab) {
            case "files":
                return <Files />;
            case "outline":
                return <Outline markdown={markdown} />;
            case "trash":
                return <Trash />;
            case "settings":
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <Sidebar className="h-[calc(100dvh-70px)] hidden flex-1 md:flex left-12 top-12 z-0">
            <SidebarContent className="overflow-hidden">
                <SidebarHeader className="p-0"></SidebarHeader>
                <div className="flex-1">{renderTabContent()}</div>
            </SidebarContent>
        </Sidebar>
    );
}
