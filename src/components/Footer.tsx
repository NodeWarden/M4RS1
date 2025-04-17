'use client'

import { useState, MouseEvent } from "react"

export default function Footer() {
    return (
    <div className="footer ">
        <br/><br/><br/>
    <hr className="hr"/>
    <footer className="margin 80px row-start-3 flex flex-col gap-6 items-center justify-center">
<br/>
        
        <div className="flex flex-wrap gap-4 items-center justify-center">
            <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
            >
            <img
                src="https://res.cloudinary.com/drq6yxxk0/discord-mark-white_aooiwm"
                alt="Discord"
                width={20}
                height={20}
                />
            {/* Discord */}
            </a>
            <a
            href="https://x.com/MARSI_btc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
            >
            <img
                src="https://res.cloudinary.com/drq6yxxk0/X_zzioza"
                alt="X (Twitter)"
                width={20}
                height={20}
                />
          {/* X (former Twitter) */}
        
        </a>
        </div>
        <div className="block flex-col items-center">
            <a
            href="https://ordinals.com/address/bc1qhkav5fk20r24w3p6tfrht0f272csry95txt3dp"
            target="_blank">
                <h4>©2025 marsi.btc </h4>
            </a>
        </div>
      </footer>
    </div>    
    
  );
}