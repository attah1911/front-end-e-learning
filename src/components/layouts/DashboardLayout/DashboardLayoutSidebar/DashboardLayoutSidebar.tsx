import React from "react";
import Logo from "@/components/commons/Logo";
import LogoutButton from "@/components/commons/LogoutButton";
import SidebarNav from "./SidebarNav";
import SidebarContainer from "./SidebarContainer";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;

  return (
    <SidebarContainer isOpen={isOpen}>
      <div>
        <Logo />
        <SidebarNav items={sidebarItems} />
      </div>
      <div className="flex items-center p-1">
        <LogoutButton />
      </div>
    </SidebarContainer>
  );
};

export default DashboardLayoutSidebar;
