"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import { defaultMarkdown } from "@/components/MarkdownExample";
import { useIsMobile } from "@/hooks/use-mobile";
import Statusbar from "@/components/Statusbar";
import Topbar from "@/components/Topbar";
import AppSidebar from "@/components/AppSidebar";
import IconSidebar from "@/components/Sidebar";

type SidebarTab = "files" | "outline" | "trash" | "settings";

export default function Home() {
    const [showPreview, setShowPreview] = useState(true);
    const [showEditor, setShowEditor] = useState(true);
    const [markdown, setMarkdown] = useState(defaultMarkdown);
    const [currentLine, setCurrentLine] = useState(1);
    const [currentColumn, setCurrentColumn] = useState(1);
    const [activeTab, setActiveTab] = useState<SidebarTab>("files");

    return (
        <div className="flex flex-col h-screen w-full relative min-h-patch overflow-y-auto">
            <div className="sticky top-0 z-10 w-full">
                <Topbar />
            </div>
            <div className="flex flex-1 overflow-hidden">
                <IconSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                <AppSidebar activeTab={activeTab} markdown={markdown} />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex-1 overflow-hidden text-sm">
                        <ResizablePanelGroup
                            direction={useIsMobile() ? "vertical" : "horizontal"}
                            key={`${showEditor}-${showPreview}`}
                        >
                            {showEditor && (
                                <ResizablePanel defaultSize={50} minSize={20}>
                                    <Editor
                                        showPreview={showPreview}
                                        onTogglePreview={() => setShowPreview(!showPreview)}
                                        value={markdown}
                                        onChange={setMarkdown}
                                        onCursorChange={(line, column) => {
                                            setCurrentLine(line);
                                            setCurrentColumn(column);
                                        }}
                                    />
                                </ResizablePanel>
                            )}
                            {showEditor && showPreview && <ResizableHandle />}
                            {showPreview && (
                                <ResizablePanel minSize={20}>
                                    <Preview
                                        markdown={markdown}
                                        showEditor={showEditor}
                                        onToggleEditor={() => setShowEditor(!showEditor)}
                                    />
                                </ResizablePanel>
                            )}
                        </ResizablePanelGroup>
                    </div>
                </div>
            </div>
            <Statusbar
                lineCount={markdown.split("\n").length}
                charCount={markdown.length}
                currentLine={currentLine}
                currentColumn={currentColumn}
            />
        </div>
    );
}
