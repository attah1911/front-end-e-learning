import React from "react";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";

const LogoutButton: React.FC = () => {
  return (
    <Button
      color="danger"
      fullWidth
      variant="light"
      className="flex justify-start rounded-lg px-2 py-1.5 transition-colors hover:bg-danger-100"
      size="lg"
      onClick={() => signOut()}
    >
      <CiLogout />
      Logout
    </Button>
  );
};

export default LogoutButton;
