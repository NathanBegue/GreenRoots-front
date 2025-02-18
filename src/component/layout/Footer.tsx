export default function Footer({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <footer className={`${isDarkMode ? "bg-dark-accent" : "bg-dark-third "} relative bottom-0 w-full flex justify-between items-center  h-9 max-sm:justify-center max-md:justify-center max-lg:justify-center md:py-8 md:text-2xl`}>
      <div className={`hidden lg:flex w-4 ml-2 gap-2 items-center md:w-6 ${isDarkMode && "invert"} `}>
        <img src="images/icons/facebook.svg" alt="logo de facebook" />
        <img src="images/icons/instagram.svg" alt=" logo d'instagram" className="mr-0.5" />
        <img src="images/icons/linkedin.svg" alt="logo de linkedin" />
      </div>
      <div className={` ${isDarkMode ? "text-white" : "text-black"} `}>

        <p className="font-content flex"> GreenRoots
          <img src="images/icons/copyright.svg" alt="" className={`w-5 h-5 ${isDarkMode && "invert"}`} />
        </p>
      </div>


      <p className={`hidden lg:block mr-2 ${isDarkMode ? "text-white" : "text-black"}`}>CGU</p>


    </footer>

  );
}