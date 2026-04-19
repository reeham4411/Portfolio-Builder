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
        <header className="flex items-center justify-between px-5 md:px-8 py-3 md:py-4 border-b border-(--border) bg-(--surface) shrink-0 z-10 gap-4">
          <Link
            href="/"
            className="font-display text-4xl md:text-5xl font-bold tracking-tight shrink-0"
          >
            <span className="gradient-text">folio</span>
            <span className="text-(--text-muted)">.</span>
          </Link>

          <div className="flex-1 mx-4 md:mx-10 overflow-x-auto">
            <StepNav />
          </div>

          <div className="text-sm md:text-base font-medium text-(--text-muted) shrink-0">
            Auto-saved
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-85 md:w-95 shrink-0 border-r border-(--border) bg-(--surface) overflow-hidden">
            <Sidebar />
          </div>

          <div className="flex-1 overflow-hidden">
            <PreviewPane />
          </div>
        </div>
      </div>
    </PortfolioProvider>
  );
}
