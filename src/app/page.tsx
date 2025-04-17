"use client";
import "./globals.css";

export default function Home() {
  return (
    <div className="fix-to-center grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="fix-to-center flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Logo principale */}
        <img
          src="https://res.cloudinary.com/drq6yxxk0/Marsi_jh73za"
          alt="Marsi Logo"
          width={400}
          height={82}
          
          className="fix-to-center rounded-lg shadow-lg"
        />


        {/* Pulsanti con immagini */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <a
            href="/data"
            className="link flex items-center gap-2 px-5 py-3 border rounded-lg bg-gray-800 text-white hover:bg-gray-700"
          >
            <img
            className="dark:invert"
              src="https://res.cloudinary.com/drq6yxxk0/file_zdbmtb"
              alt="Data Icon"
              width={20}
              height={20}
            />
            MAR$I DATA
          </a>
          <a
            href="/roadmap"
            className="link flex items-center gap-2 px-5 py-3 border rounded-lg bg-gray-800 text-white hover:bg-gray-700"
          >
            <img
            className="dark:invert"
              src="https://res.cloudinary.com/drq6yxxk0/roadmap_d3nldu"
              alt="Roadmap Icon"
              width={20}
              height={20}
            />
            ROADMAP
          </a>
          <a
            href="/burn"
            className="link flex items-center gap-2 px-5 py-3 border rounded-lg bg-gray-800 text-white hover:bg-gray-700"
          >
            <img
            className="dark:invert"
              src="https://res.cloudinary.com/drq6yxxk0/burnt_ztnvci"
              alt="Burn Icon"
              width={20}
              height={20}
            />
            MAR$I BURNT
          </a>
        </div> 
      </main>

      {/* Footer */}
      
    </div>
  );
}
