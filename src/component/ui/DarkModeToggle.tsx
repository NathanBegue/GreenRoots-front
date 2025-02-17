import { useEffect } from "react";

// DarkModeToggle.tsx
export default function DarkModeToggle({
  isDarkMode,
  setIsDarkMode,
}: {
    isDarkMode: boolean;
    setIsDarkMode:  React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleDarkMode = () => {
    console.log(setIsDarkMode);
    setIsDarkMode((prevMode) => !prevMode); // Mise à jour du state
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    <button onClick={toggleDarkMode}>
      {isDarkMode ? (
        <img className="w-5 h-5" src="/images/icons/sun.svg" alt="Mode clair" />
      ) : (
        <img className="w-5 h-5" src="/images/icons/moon.svg" alt="Mode sombre" />
      )}
    </button>
  );
}
