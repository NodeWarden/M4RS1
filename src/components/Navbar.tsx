'use client'

import { useState, MouseEvent } from "react"
import styles from "./Navbar.module.css"

interface NavLink {
    href: string;
    label: string;
}

interface MarsiLink{
    href: string;
    label: string;
    target?: string;
    imageSrc?:string;
}

const navLinks: NavLink[] = [
    // { href: "/", label: "Home" },
    { href: "/data", label: "Data" },
    { href: "/roadmap", label: "Roadmap" },
    {href: "/burn", label: "Burnt" },
];

const marsiLinks: MarsiLink[] = [
    // { href: "/popup", label: "Connect Wallet", target:"_blank" },
    { href: "https://marsi.platform.com", label: "MARSILAND", target: "_blank", imageSrc:"https://res.cloudinary.com/drq6yxxk0/Marsi_jh73za"},
    { href: "https://web3.okx.com/it/marketplace/runes/token/MEME%E2%80%A2ALPHA%E2%80%A2RUNE%E2%80%A2SONIC%E2%80%A2IMPULSE/870360:2296", label: "Buy on OkX", target: "_blank" , imageSrc: "https://res.cloudinary.com/drq6yxxk0/okx_opraje"},
    { href: "https://magiceden.io/runes/MEME%E2%80%A2ALPHA%E2%80%A2RUNE%E2%80%A2SONIC%E2%80%A2IMPULSE", label: "Buy on MagicEden", target: "_blank", imageSrc: "https://res.cloudinary.com/drq6yxxk0/magic_eden_bsge1g" },
];


export default function Navbar(){
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const toggleServices = (e: MouseEvent) => {
        e.preventDefault();
        setIsServicesOpen(!isServicesOpen);
    };

    return (
        <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
            <div className="margin-top:3% max-w-4xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <a
                    href="/"
                    className="flex items-center font-bold hover:text-gray-400">
                        <div className={styles.logo}>
                        <img
                            src="https://res.cloudinary.com/drq6yxxk0/Marsi_jh73za"
                            alt="Marsi Logo"
                            width={75}
                            height={75}
                            className="home_image rounded-lg shadow-lg"
                            />
                        </div>
                            
                    </a>

                    <div className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="flex items-center hover:text-gray-400">
                                {link.label}
                            </a>
                        ))}
                   

                        <div className="relative flex items-center">
                            <button
                                className="flex items-center transition-colors"
                                onClick={toggleServices}
                                aria-expanded={isServicesOpen}
                                aria-label="Toggle services menu">
                                Services
                                <svg
                                    className={`ml-1 h-4 w-4 transition-transform ${
                                        isServicesOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                        
                            {isServicesOpen && (
                            <div 
                                className="absolute top-full mt-2 w-48 bg-zinc-800 rounded-md shadow-lg py-1 border border-zinc-700"
                                role="menu"
                                aria-orientation="vertical"
                            >
                                {marsiLinks.map((marsi) => (
                                    <a
                                        key={marsi.href}
                                        href={marsi.href}
                                        target={marsi.target}
                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 hover:text-white"
                                        role="menuitem"
                                    >
                                        {/* Mostra l'immagine solo se presente */}
                                        {marsi.imageSrc && (
                                            <img 
                                                src={marsi.imageSrc} 
                                                width={15} 
                                                height={15} 
                                                alt={marsi.label} 
                                            />
                                        )}
                                        <span>{marsi.label}</span>
                                    </a>
                                ))}
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                            <br/>
            </div>
            {/* <br/> */}
        </nav>
    );
}