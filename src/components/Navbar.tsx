'use client'

import { useState, MouseEvent } from "react"
import styles from "./Navbar.module.css"

interface NavLink {
    href: string;
    label?: string; // Rendi opzionale il testo del link
    imageSrc?: string; // Aggiungi la proprietà per l'immagine
}

interface MarsiLink {
    href: string;
    label: string;
    target?: string;
    imageSrc?: string;
}

const navLinks: NavLink[] = [
    { href: "/data", label: "Data" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/", imageSrc: "https://res.cloudinary.com/drq6yxxk0/Marsi_jh73za" }, // Logo come link
    { href: "/burn", label: "Burnt" },
];

const marsiLinks: MarsiLink[] = [
    { href: "https://marsi.platform.com", label: "MARSILAND", target: "_blank", imageSrc: "https://res.cloudinary.com/drq6yxxk0/Marsi_jh73za" },
    { href: "https://web3.okx.com/it/marketplace/runes/token/MEME%E2%80%A2ALPHA%E2%80%A2RUNE%E2%80%A2SONIC%E2%80%A2IMPULSE/870360:2296", label: "Buy on OkX", target: "_blank", imageSrc: "https://res.cloudinary.com/drq6yxxk0/okx_opraje" },
    { href: "https://magiceden.io/runes/MEME%E2%80%A2ALPHA%E2%80%A2RUNE%E2%80%A2SONIC%E2%80%A2IMPULSE", label: "Buy on MagicEden", target: "_blank", imageSrc: "https://res.cloudinary.com/drq6yxxk0/magic_eden_bsge1g" },
    { href: "https://unisat.io/runes/market?tick=MEME%E2%80%A2ALPHA%E2%80%A2RUNE%E2%80%A2SONIC%E2%80%A2IMPULSE", label: "Buy on Unisat", target: "_blank", imageSrc: "https://res.cloudinary.com/drq6yxxk0/unisat0-1615366133_g50b7x" },
];

export default function Navbar() {
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const toggleServices = (e: MouseEvent) => {
        e.preventDefault();
        setIsServicesOpen(!isServicesOpen);
    };

    return (
        <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
            <div className="margin-top:3% max-w-4xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="flex items-center hover:text-gray-400">
                                {link.imageSrc ? (
                                    <img
                                        src={link.imageSrc}
                                        alt={link.label || "Logo"}
                                        width={75}
                                        height={75}
                                        className={`${styles.logo} rounded-lg shadow-lg`}
                                    />
                                ) : (
                                    link.label
                                )}
                            </a>
                        ))}

                        <div className="relative flex items-center">
                            <button
                                className="flex items-center transition-colors"
                                onClick={toggleServices}
                                aria-expanded={isServicesOpen}
                                aria-label="Toggle services menu"
                            >
                                Services
                                <svg
                                    className={`ml-1 h-4 w-4 transition-transform ${
                                        isServicesOpen ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
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
                                            {marsi.imageSrc && (
                                                <img
                                                    src={marsi.imageSrc}
                                                    width={15}
                                                    height={15}
                                                    alt={marsi.label}
                                                    style={{ borderRadius: "50%" }}
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
            </div>
        </nav>
    );
}