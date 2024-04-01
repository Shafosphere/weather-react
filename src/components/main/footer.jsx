import { IoLogoGithub } from "react-icons/io";

export default function FooterContact() {
    return (
        <div className="footer-cointaiter">
            <a
                href="https://github.com/Shafosphere"
                target="_blank"
                rel="noopener noreferrer"
            >
                by Shafosphere <IoLogoGithub className="footer-icon" />
            </a>
        </div>
    )
}
