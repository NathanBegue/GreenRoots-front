import { useState, useEffect } from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

interface HeaderProps {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setIsOpened, setIsModalOpened, isDarkMode,
  setIsDarkMode, }: HeaderProps) {


  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop ? (
    <DesktopHeader isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}  />
  ) : (
    <MobileHeader setIsOpened={setIsOpened} setIsModalOpened={setIsModalOpened} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
  );
}
