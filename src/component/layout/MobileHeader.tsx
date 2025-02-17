import { Link } from "react-router";
import DarkModeToggle from "../ui/DarkModeToggle";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileHeader({ setIsOpened,
  setIsModalOpened,
  isDarkMode,
  setIsDarkMode, }: HeaderProps) {


  return (
    <header className={` ${isDarkMode? "bg-dark-secondary" : "bg-light-secondary"}   w-full h-16 px-6 flex items-center overflow-hidden fixed z-30`}>

      <div className="flex items-center gap-4 flex-nowrap justify-between w-full ">
        <img className={`h-8 ${isDarkMode && "invert"}`} src="/images/icons/logo-.svg" alt="Logo" />
        <div>
          <div className={`min-h-screen flex items-center justify-center dark:text-white ${isDarkMode && "invert"}`}>
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
          </div>
        </div>
        <Link to="/panier"><img className={`w-6 h-6 ${isDarkMode && "invert"}`} src="/images/icons/shop-card.svg" alt="Panier" /> </Link>
        <img onClick={() => setIsModalOpened(prev => !prev)} className={`w-6 h-6 ${isDarkMode && "invert"}`}src="/images/icons/user.svg" alt="Profil" />

        {/* BurgerMenu au click on met l'inverse de isopened*/}
        <img onClick={() => setIsOpened(prev => !prev)} className={`w-6 h-6 ${isDarkMode && "invert"}`} src="/images/icons/burger-menu.svg" alt="Menu" />
      </div>
      {/* Si isOpened est vrai alors on affiche le BurgerMenu */}
    </header>
  );
}
