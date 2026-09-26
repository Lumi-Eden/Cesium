import { useState, useEffect } from "react";
import logoNoBg from "./assets/logo.jpg"

const defaultItemsData = {
    rovna: { checked: false, rozmer: "" },
    tvarL: { checked: false, rozmer1: "", rozmer2: "", rozmer3: "" },
    tvarU: { checked: false, rozmer1: "", rozmer2: "", rozmer3: "" },
    ostruvek: { checked: false, rozmer: "" },
    vyrez: { checked: false, pocet: "", zapusteneAno: false, zapusteneNe: false, note: "" },
    spotrebice: { checked: false, pocet: "" },
    baterie: { checked: false },
    cenaCelkem: "",
    doKdy: "",
    poznamky: "",
};

export default function PrintLinkyApp() {

    const [formData, setFormData] = useState(() => {
        const savedHeaderData = localStorage.getItem("headerData");
        // Return statement left as the end value of useState variable
        return savedHeaderData ? JSON.parse(savedHeaderData) : { name: "", tel: "", location: "" }
    });

    // All the checkboxes/dimensions/notes/price fields below the header
    const [itemsData, setItemsData] = useState(() => {
        const savedItemsData = localStorage.getItem("linkyItemsData");
        return savedItemsData ? JSON.parse(savedItemsData) : defaultItemsData;
    });

    // Log entries created by the ItemSelection wizard (same source PrintApp.jsx reads)
    const [logEntries, setLogEntries] = useState([]);
    useEffect(() => {
        const rawData = localStorage.getItem("print_order_data");
        if (rawData) {
            try {
                setLogEntries(JSON.parse(rawData));
            } catch (err) {
                console.error("Failed to parse print data:", err);
            }
        }
    }, []);

    // Entries produced by the "Linky" wizard flow: path = ["Linky", <shape>, <obklad/material>?]
    const linkyEntries = logEntries.filter((entry) => entry.path && entry.path[0] === "Linky");

    // helper function to handle the change of data in the header
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value // <- A duplicate entry overwrites the previous one
        }));
    };

    // helper for top-level fields in itemsData (e.g. cenaCelkem, doKdy, poznamky)
    const handleItemFieldChange = (field, value) => {
        setItemsData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    // helper for nested group fields (e.g. tvarL.rozmer1, vyrez.pocet)
    const handleItemGroupChange = (group, field, value) => {
        setItemsData((prev) => ({
            ...prev,
            [group]: {
                ...prev[group],
                [field]: value
            }
        }));
    };

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

    // localStorage and related data manipulation
    // Setting header data
    useEffect(() => {
        localStorage.setItem("headerData", JSON.stringify(formData))
    }, [formData])

    // Setting all the other form data (checkboxes, dimensions, price, notes...)
    useEffect(() => {
        localStorage.setItem("linkyItemsData", JSON.stringify(itemsData))
    }, [itemsData])

    return (
        <main className="flex flex-col p-2">

            <header className="w-full pb-4 border-b border-zinc-300">
                <div className="grid grid-cols-2 w-80 gap-2">
                    <span className="font-bold">Jméno Zákazníka:</span> <input type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="border border-zinc-500 w-90 h-6.5 px-1 py-0.5 rounded focus:outline-none" />
                    <span className="font-bold">Tel.:</span> <input type="text" value={formData.tel} onChange={(e) => handleChange("tel", e.target.value)} className="border border-zinc-500 w-90 h-6.5 px-1 py-0.5 rounded focus:outline-none" />
                    <span className="font-bold">Adresa:</span> <input type="text" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} className="border border-zinc-500 w-90 h-6.5 px-1 py-0.5 rounded focus:outline-none" />
                    <img src={logoNoBg} alt="Logo" className="absolute right-0 -top-5.5 w-35" />
                </div>
            </header>

            {/* Main form and data goes here */}
            <section id="container-main" className="my-4">
                <h1 className="font-bold">Položky</h1>

                {/* Linky / Obklady selected via the item-selection wizard */}
                {linkyEntries.length > 0 && (
                    <div className="text-sm mx-2 mb-4">
                        <span className="text-zinc-500 font-medium">Linky a Obklady:</span>
                        <div className="mt-2 space-y-2 mx-4">
                            {linkyEntries.map((entry, idx) => {
                                const shapeLabel = entry.path[1] || entry.formatted || "";
                                const obkladLabel = entry.path[2];

                                return (
                                    <div
                                        key={entry.id || idx}
                                        className="pl-3 border-l-2 border-zinc-300 font-bold text-zinc-900"
                                    >
                                        <span>{shapeLabel}</span>
                                        {obkladLabel && (
                                            <div className="text-xs font-normal text-zinc-500 mt-0.5">
                                                Obklad: {obkladLabel}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    {/* Dynmically import data here */}

                    <h1 className="font-bold">Formulář</h1>
                    {/* Rovná */}
                    <div className="flex items-center gap-4">
                        <div>
                            <input type="checkbox" className="mr-1" checked={itemsData.rovna.checked} onChange={(e) => handleItemGroupChange("rovna", "checked", e.target.checked)} />
                            <span className="mr-5">Rovná</span>
                        </div>
                        <div>
                            <span className="text-sm">-Rozměr: </span>
                            <input type="text" value={itemsData.rovna.rozmer} onChange={(e) => handleItemGroupChange("rovna", "rozmer", e.target.value)} className="border border-zinc-500 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                        </div>
                        
                    </div>

                    {/* Tvar L */}
                    <div className="flex items-center gap-3">
                        <div>
                            <input type="checkbox" className="mr-1" checked={itemsData.tvarL.checked} onChange={(e) => handleItemGroupChange("tvarL", "checked", e.target.checked)} />
                            <span className="mr-2">Tvar L</span>
                        </div>
                        <div>
                            <span className="text-sm">-Rozměr 1: </span>
                            <input type="text" value={itemsData.tvarL.rozmer1} onChange={(e) => handleItemGroupChange("tvarL", "rozmer1", e.target.value)} className="border border-zinc-500 w-30 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                        </div>
                        <div>
                            <span className="text-sm">-Rozměr 2: </span>
                            <input type="text" value={itemsData.tvarL.rozmer2} onChange={(e) => handleItemGroupChange("tvarL", "rozmer2", e.target.value)} className="border border-zinc-500 w-30 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                        </div>
                        <div>
                            <span className="text-sm">-Rozměr 3: </span>
                            <input type="text" value={itemsData.tvarL.rozmer3} onChange={(e) => handleItemGroupChange("tvarL", "rozmer3", e.target.value)} className="border border-zinc-500 w-30 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                        </div>
                    </div>

                    {/* Tvar U */}
                    <div className="flex items-center gap-3">
                        <div>
                            <input type="checkbox" className="mr-1" checked={itemsData.tvarU.checked} onChange={(e) => handleItemGroupChange("tvarU", "checked", e.target.checked)} />
                            <span>Tvar L⅃</span>
                        </div>
                        <div>
                            <span className="text-sm">-Rozměr 1: </span>
                            <input type="text" value={itemsData.tvarU.rozmer1} onChange={(e) => handleItemGroupChange("tvarU", "rozmer1", e.target.value)} className="border border-zinc-500 w-30 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                        </div>
                        <div>
                            <span className="text-sm">-Rozměr 2: </span>
                            <input type="text" value={itemsData.tvarU.rozmer2} onChange={(e) => handleItemGroupChange("tvarU", "rozmer2", e.target.value)} className="border border-zinc-500 w-30 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                        </div>
                        <div>
                            <span className="text-sm">-Rozměr 3: </span>
                            <input type="text" value={itemsData.tvarU.rozmer3} onChange={(e) => handleItemGroupChange("tvarU", "rozmer3", e.target.value)} className="border border-zinc-500 w-30 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                        </div>
                    </div>

                    {/* Ostrůvek */}
                    <div className="flex items-center gap-4">
                        <div>
                            <input type="checkbox" className="mr-1" checked={itemsData.ostruvek.checked} onChange={(e) => handleItemGroupChange("ostruvek", "checked", e.target.checked)} />
                            <span>Ostrůvek</span>
                        </div>
                        <div>
                            <span className="text-sm">-Rozměr: </span>
                            <input type="text" value={itemsData.ostruvek.rozmer} onChange={(e) => handleItemGroupChange("ostruvek", "rozmer", e.target.value)} className="border border-zinc-500 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                        </div>
                    </div>

                    {/* Výřez */}
                    <div className="flex flex-col items-center pt-4">
                        <div className="flex gap-40 w-full">
                            <div className="flex gap-5">
                                <div>
                                    <input type="checkbox" className="mr-1" checked={itemsData.vyrez.checked} onChange={(e) => handleItemGroupChange("vyrez", "checked", e.target.checked)} />
                                    <span>Výřez</span>
                                </div>
                                <div>
                                    <span className="text-sm">-Počet: </span>
                                    <input type="text" value={itemsData.vyrez.pocet} onChange={(e) => handleItemGroupChange("vyrez", "pocet", e.target.value)} className="border border-zinc-500 w-25 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                                    <span className="ml-0.5">ks</span>
                                </div>
                            </div>
            
                            <div>
                                <span>Zapuštěné: </span>
                                <span className="ml-2">Ano</span> <input type="checkbox" className="mr-3" checked={itemsData.vyrez.zapusteneAno} onChange={(e) => handleItemGroupChange("vyrez", "zapusteneAno", e.target.checked)} />
                                <span>Ne</span> <input type="checkbox" checked={itemsData.vyrez.zapusteneNe} onChange={(e) => handleItemGroupChange("vyrez", "zapusteneNe", e.target.checked)} />
                            </div>
                        </div>
                        
                        <div className="mt-2 w-full">
                            <textarea value={itemsData.vyrez.note} onChange={(e) => handleItemGroupChange("vyrez", "note", e.target.value)} className="w-full border border-zinc-500 px-1 py-0.5 rounded" placeholder="Na co a kam..."></textarea>
                        </div>
                    </div>

                    {/* Usazení spotřebičů */}
                    <div className="flex items-center gap-5 pt-4">
                        <div>
                            <input type="checkbox" className="mr-1" checked={itemsData.spotrebice.checked} onChange={(e) => handleItemGroupChange("spotrebice", "checked", e.target.checked)} />
                            <span>Usazení spotřebičů</span>
                        </div>
                        <div>
                            <span className="text-sm">-Počet: </span>
                            <input type="text" value={itemsData.spotrebice.pocet} onChange={(e) => handleItemGroupChange("spotrebice", "pocet", e.target.value)} className="border border-zinc-500 w-25 h-5.5 px-1 py-0.5 rounded focus:outline-none" />
                            <span className="ml-0.5">ks</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div>
                            <input type="checkbox" className="mr-1" checked={itemsData.baterie.checked} onChange={(e) => handleItemGroupChange("baterie", "checked", e.target.checked)} />
                            <span>Otvor na baterii</span>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-zinc-300 pt-4 mt-8 space-y-4">
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 max-w-sm">
                    <span className="font-bold">Cena celkem:</span>
                    <input 
                        type="text" 
                        value={itemsData.cenaCelkem}
                        onChange={(e) => handleItemFieldChange("cenaCelkem", e.target.value)}
                        className="border border-zinc-500 h-7 px-2 py-0.5 rounded focus:outline-none" 
                    />
                    
                    <span className="font-bold">Do kdy:</span>
                    <input 
                        type="text" 
                        value={itemsData.doKdy}
                        onChange={(e) => handleItemFieldChange("doKdy", e.target.value)}
                        className="border border-zinc-500 h-7 px-2 py-0.5 rounded focus:outline-none" 
                    />
                </div>
                
                {/* Notes Block */}
                <div className="w-full">
                    <p className="font-bold mb-1">Poznámky:</p>
                    <textarea 
                        rows={4} 
                        value={itemsData.poznamky}
                        onChange={(e) => handleItemFieldChange("poznamky", e.target.value)}
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