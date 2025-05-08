import { cn } from "@/utils/cn";
import React from "react";

interface SidebarContainerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ children, isOpen }) => {
  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        {"translate-x-0": isOpen}
      )}
    >
      {children}
    </div>
  );
};

export default SidebarContainer;
