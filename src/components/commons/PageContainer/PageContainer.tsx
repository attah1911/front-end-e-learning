import React from "react";
import { cn } from "@/utils/cn";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
};

export default PageContainer;
