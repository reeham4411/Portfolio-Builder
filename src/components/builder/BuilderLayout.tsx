"use client";

import { PortfolioProvider } from "@/context/PortfolioContext";
import StepNav from "./StepNav";
import Sidebar from "./Sidebar";
import PreviewPane from "./PreviewPane";
import Link from "next/link";

export default function BuilderLayout() {
  return (
    <PortfolioProvider>
      <div
        className="h-screen flex flex-col overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-(--border) bg-(--surface) shrink-0 z-10">
          <Link href="/" className="font-display text-xl font-bold">
            <span className="gradient-text">folio</span>
            <span className="text-(--text-muted)">.</span>
          </Link>
          <div className="flex-1 mx-8 overflow-x-auto">
            <StepNav />
          </div>
          <div className="text-xs text-(--text-muted) shrink-0">Auto-saved</div>
        </header>

        {/* Main 2-column layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-105 shrink-0 border-r border-(--border) bg-(--surface) overflow-hidden">
            <Sidebar />
          </div>

          {/* Preview */}
          <div className="flex-1 overflow-hidden">
            <PreviewPane />
          </div>
        </div>
      </div>
    </PortfolioProvider>
  );
}
