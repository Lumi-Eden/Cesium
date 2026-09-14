import { useState, useEffect } from "react";
import logoNoBg from "./assets/logo.jpg"

export default function OpravaApp() {

    const [obnovaPismaChecked, setObnovaPismaChecked] = useState(false)

    // Printing the window or creating a pdf file
    const handlePrint = () => {
        window.print()
    };
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
                e.preventDefault();
                handlePrint();
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <main className="flex flex-col p-2">

            <header className="w-full pb-4 border-b border-zinc-300">
                <div className="grid grid-cols-2 w-80 gap-2">
                    <span className="font-bold">Jméno Zákazníka:</span> <input type="text" className="border border-zinc-500 w-90 h-6.5 px-1 py-0.5 rounded focus:outline-none" />
                    <span className="font-bold">Tel.:</span> <input type="text" className="border border-zinc-500 w-90 h-6.5 px-1 py-0.5 rounded focus:outline-none" />
                    <span className="font-bold">Místo:</span> <input type="text" className="border border-zinc-500 w-90 h-6.5 px-1 py-0.5 rounded focus:outline-none" />
                    <img src={logoNoBg} alt="Logo" className="absolute right-0 -top-5.5 w-35" />
                </div>
            </header>

            <div id="container-main" className="my-4">
                <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-400 cursor-pointer" />
                    <span className="font-bold">Oprava:</span>
                    <textarea 
                        placeholder="Popis opravy..."
                        className="border border-zinc-500 mx-4 min-h-16 px-2 py-1 rounded focus:outline-none flex-1 resize-y" 
                    />
                </div>
                <br />

                <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-400 cursor-pointer" />
                    <span className="font-bold">Rovnání:</span>
                    <textarea 
                        placeholder="Popis rovnání..."
                        className="border border-zinc-500 mx-2.5 min-h-16 px-2 py-1 rounded focus:outline-none flex-1 resize-y" 
                    />
                </div>
                <br />

                <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-400 cursor-pointer" />
                    <span className="font-bold">Likvidace:</span>
                    <textarea 
                        placeholder="Popis likvidace..."
                        className="border border-zinc-500 min-h-16 px-2 py-1 rounded focus:outline-none flex-1 resize-y" 
                    />
                </div>
                <br />

                <div className="flex items-start gap-2 my-2">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-400 cursor-pointer" />
                    <span className="font-bold">Přebrus</span>
                    <br />
                </div>

                <div className="flex items-start gap-2 my-2">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-400 cursor-pointer" />
                    <span className="font-bold">Mytí</span>
                    <br />
                </div>

                <div className="flex items-start gap-2 my-2">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-400 cursor-pointer" />
                    <span className="font-bold">Lampa</span>
                    <br />
                </div>

                <div className="flex items-start gap-2 my-2">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-400 cursor-pointer" />
                    <span className="font-bold">Váza</span>
                    <br />
                </div>

                <div className="flex flex-col items-start gap-2">
                    <div>
                        <input 
                            type="checkbox"
                            className="mt-1 w-4 h-4 rounded border-zinc-400 cursor-pointer"
                            onChange={(e) => setObnovaPismaChecked(e.target.checked)} 
                        />
                        <span className="font-bold mx-2">Obnova Písma</span>
                    </div>
                    <div className="mx-5">
                        <span 
                            className={`font-bold
                                ${
                                    obnovaPismaChecked ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-20"
                                }    
                            `}
                        >Barva:</span>
                        <input 
                            type="text"
                            className={`border border-zinc-500 mx-2.5 max-w-70 min-h-5 px-2 py-1 rounded focus:outline-none flex-1 resize-y
                                ${
                                    obnovaPismaChecked ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-20"
                                }
                            `}  
                        />
                    </div>
                </div>
            </div>


            <footer className="border-t border-zinc-300 pt-4 mt-8 space-y-4">
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 max-w-sm">
                    <span className="font-bold">Cena celkem:</span>
                    <input 
                        type="text" 
                        className="border border-zinc-500 h-7 px-2 py-0.5 rounded focus:outline-none" 
                    />
                    
                    <span className="font-bold">Do kdy:</span>
                    <input 
                        type="text" 
                        className="border border-zinc-500 h-7 px-2 py-0.5 rounded focus:outline-none" 
                    />
                </div>
                
                {/* Notes Block */}
                <div className="w-full">
                    <p className="font-bold mb-1">Poznámky:</p>
                    <textarea 
                        rows={4} 
                        className="w-full min-h-20 border border-zinc-500 p-2 rounded focus:outline-none resize-y"
                    />
                </div>

                {/* Date and Signature Block */}
                <div className="flex justify-between items-end pt-6 text-xs font-semibold">
                <span>{new Date().toLocaleDateString('cs-CZ')}</span>
                <span>Podpis zákazníka: ...........................................</span>
                </div>
            </footer>
        </main>
    )
}