export default function Footer() {
    return (
        <footer className="bg-dark-third  w-full flex justify-between items-center  h-9 max-sm:justify-center max-md:justify-center max-lg:justify-center md:py-8 md:text-2xl">
            <div className="hidden lg:flex w-4 ml-2 gap-2 items-center md:w-6">
                <img src="images/icons/facebook.svg" alt="" />
                <img src="images/icons/instagram.svg" alt="" className="mr-0.5" />
                <img src="images/icons/linkedin.svg" alt="" />
            </div>
            <div>

                <p className="font-content flex"> GreenRoots
                    <img src="images/icons/copyright.svg" alt="" className="w-5 h-5" />
                </p>
            </div>


            <p className="hidden lg:block mr-2">CGU</p>


        </footer>

    )
}