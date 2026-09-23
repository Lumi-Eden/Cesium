import { useState, useEffect } from "react";
import logoNoBg from "./assets/logo.jpg"

const CATEGORIES = [
    { key: 'Náhrobky', label: 'Náhrobky:' },
    { key: 'Sklodesky', label: 'Sklodesky:' },
    { key: 'Schody', label: 'Schody:' },
    { key: 'Parapety', label: 'Parapety:' },
    { key: 'Doplňky', label: 'Doplňky:' },
    { key: 'Lampy a Vázy', label: 'Lampy a Vázy:' },
    { key: 'Písmo', label: 'Písmo:'}
];

export default function PrintApp() {
    const [formData, setFormData] = useState(() => {
        const savedHeaderData = localStorage.getItem("headerData");
        return savedHeaderData ? JSON.parse(savedHeaderData) : { name: "", tel: "", location: "" }
    });

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

    // Setting log entries
    const [logEntries, setLogEntries] = useState([])
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

    // helper function to handle the change of data in the header
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value // a duplicate entry overwrites the previous one
        }));
    };

    // Group entries by category
    const groupedEntries = logEntries.reduce((acc, entry) => {
        console.log("Current Log Entry:", entry); // Check for what keys exist

        // Extract top-level category from path array (e.g. "Náhrobky", "Lampy a Vázy", "Doplňky")
        const category = (entry.path && entry.path[0]) || 'Náhrobky'; // <- fallback key

        // If this category key doesn't exist on 'acc' yet, initialize it as an empty array
        if (!acc[category]) acc[category] = [];

        acc[category].push(entry);
        return acc;
    }, {}) // <- starts with an empty object {}

    return (
        <main className="flex flex-col p-2">

            <header className="w-full pb-4 border-b border-zinc-300">
                <div className="grid grid-cols-2 w-80 gap-2">
                    <span className="font-bold">Jméno Zákazníka:</span> <input type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="border border-zinc-500 w-90 h-6.5 px-1 py-0.5 rounded focus:outline-none" />
                    <span className="font-bold">Tel.:</span> <input type="text" value={formData.tel} onChange={(e) => handleChange("tel", e.target.value)} className="border border-zinc-500 w-90 h-6.5 px-1 py-0.5 rounded focus:outline-none" />
                    <span className="font-bold">Místo:</span> <input type="text" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} className="border border-zinc-500 w-90 h-6.5 px-1 py-0.5 rounded focus:outline-none" />
                    <img src={logoNoBg} alt="Logo" className="absolute right-0 -top-5.5 w-35" />
                </div>
            </header>

            <div id="container-main" className="my-4">
                <h1 className="font-bold">Položky</h1>
                {/* Main Category Mapping */}
                <div className="space-y-6">
                    {CATEGORIES.map((cat) => {
                        const items = groupedEntries[cat.key] || [];

                        // Skip rendering this category entirely if it has no items
                        if (items.length === 0) return null;

                        return (
                        <div key={cat.key} className="text-sm mx-2">
                            <span className="text-zinc-500 font-medium">{cat.label}</span>
                            
                            <div className="mt-2 space-y-2 mx-4">
                            {items.map((item, idx) => {
                                const itemText = item.formatted || item.name || "";
                                const isPismo = itemText.startsWith("Písmo");

                                return (
                                <div 
                                    key={item.id || idx} 
                                    className="pl-3 border-l-2 border-zinc-300 font-bold text-zinc-900"
                                >
                                    {/* Flex container to align title and input side-by-side */}
                                    <div className="flex items-center gap-3">
                                    <span>{itemText}</span>

                                    {/* Conditional input text for Písmo items */}
                                    {isPismo && (
                                        <input
                                        type="text"
                                        placeholder="Zadejte barvu písma..."
                                        defaultValue={item.customText || ""}
                                        onChange={(e) => {
                                            item.customText = e.target.value;
                                        }}
                                        className="border border-zinc-300 rounded px-2 py-0.5 text-xs font-normal text-zinc-800 focus:outline-none print:border-b print:border-t-0 print:border-x-0 print:rounded-none"
                                        />
                                    )}
                                    </div>

                                    {item.material && (
                                    <div className="text-xs font-normal text-zinc-500 mt-0.5">
                                        Materiál: {item.material}
                                    </div>
                                    )}

                                    {item.data && (
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-normal text-zinc-700 mt-1">
                                        {Object.entries(item.data).map(([key, val]) => {
                                        if (val === false || val === "" || key.endsWith("_enabled")) return null;
                                        return (
                                            <span key={key}>
                                            <strong className="capitalize">{key.replace('_', ' ')}:</strong> {val === true ? "Ano" : String(val)}
                                            </span>
                                        );
                                        })}
                                    </div>
                                    )}
                                </div>
                                );
                            })}
                            </div>
                        </div>
                        );
                    })}
                    </div>
                {/* Main Category Mapping end */}
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
    );
}