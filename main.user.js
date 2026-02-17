// ==UserScript==
// @name         JanitorAI_Turbo_Final
// @version      1.3
// @description  Optimizes chat rendering and removes animation lag.
// @author       Gemini
// @match        https://janitorai.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Inject styles immediately at document-start to prevent layout shifts
    const style = document.createElement('style');
    style.textContent = `
        /* Kill all laggy animations */
        * { transition: none !important; animation: none !important; }
        
        /* Optimize the chat log for high performance */
        .chat-scroll-container { 
            scroll-behavior: auto !important; 
            will-change: transform; 
        }

        /* Remove heavy blur filters on backgrounds */
        .character-image-blur, .bg-blur { 
            display: none !important; 
            backdrop-filter: none !important; 
        }

        /* Streamline the text input box */
        #chat-input { 
            box-shadow: none !important; 
            border-radius: 4px !important; 
        }
    `;
    
    // Safety check to ensure <head> exists
    const observer = new MutationObserver(() => {
        if (document.head) {
            document.head.appendChild(style);
            observer.disconnect();
        }
    });
    observer.observe(document.documentElement, { childList: true });

    // Periodic cleanup of the DOM to keep memory low
    setInterval(() => {
        const artifacts = document.querySelectorAll('.modal-backdrop:not(.show)');
        artifacts.forEach(a => a.remove());
    }, 10000);

    console.log("🚀 JanitorAI Turbo Imported and Active.");
})();
