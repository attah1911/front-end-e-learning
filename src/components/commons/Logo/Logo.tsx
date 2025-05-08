import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <Image
        src="/images/general/logo-sekolah.jpg"
        alt="logo"
        width={180}
        height={60}
        className={`mb-6 w-10 cursor-pointer transition-transform hover:scale-105 ${className || ""}`}
        onClick={handleClick}
      />
      <h1 className="text-2xl font-bold">E-Learning</h1>
    </div>
  );
};

export default Logo;
