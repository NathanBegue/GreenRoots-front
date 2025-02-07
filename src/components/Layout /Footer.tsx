export default function Footer() {
    return (
        <footer className="bg-dark-third  w-full flex items-center absolute bottom-0 gap-32 h-6">
            <div className="flex  space-x-1 items-center w-4 gap-1">
                <img className="max-h-4" src="images/icones/facebook.svg" alt="Logo de Facebook" />
                <img className="max-h-4" src="images/icones/linkedin.svg" alt="Logo de Linkedin" />
                <img className="max-h-4" src="images/icones/instagram.svg" alt="Logo d'Instagram" />
            </div>

            <p className="font-content text-xs flex"> GreenRoots <img src="images/icones/copyright.svg" alt="" className="w-2" /></p>

            <a href="" className="font-content size-4"> CGU</a>
        </footer>

    )
}