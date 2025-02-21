import SuivisArbre from "../layout/SuivisArbre";


export default function SuivisArbresUser({ isDarkMode }: { isDarkMode: boolean }) {


  return (
    <div className={`pt-40  w-full h-full pb-40  ${isDarkMode ? "bg-dark-primary" : "bg-light-primary text-black"}`}>
      <>
        <SuivisArbre isDarkMode={isDarkMode} />
      </>
    </div>
  )
}

