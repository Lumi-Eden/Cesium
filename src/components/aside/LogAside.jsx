import { useState } from "react"

export default function LogAside({logEntries, handleLogItemDeletion}) {
    // Potential for making the button work only under certain conditions
    

    const [logsExpanded, setLogsExpanded] = useState(false)
    const [logsHasContent, setLogsHasContent] = useState(false)

    // Changes whether logs are expanded onClick of ^
    const logsExpansionHandler = () => {
        setLogsExpanded(!logsExpanded);
    }
    
    return (
    // Outer fixed container anchored to the bottom-left edge
    <div className="fixed bottom-14 left-0 z-10 flex items-end gap-3 pointer-events-none">
      
        {/* 1. STANDALONE PILLAR BUTTON (Always visible on left edge) */}
        <button
            type="button"
            onClick={logsExpansionHandler}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 pl-5 -translate-x-1 py-3 bg-tk-dark text-white rounded-r-xl shadow-md hover:bg-slate-600 active:scale-98 transition-all cursor-pointer"
            aria-label="Toggle Záznamy"
        >
            <span className="font-semibold tracking-wide text-sm">Záznamy</span>
            <span className={`text-xs transition-transform duration-300 grayscale-100 ${logsExpanded ? "rotate-180" : "rotate-0"}`}>
            ▶
            </span>
        </button>

        {/* 2. SLIGHTLY SEPARATED POP-OUT CARD */}
        <div
            className={`pointer-events-auto w-96 max-h-112 bg-white border border-slate-200 shadow-xl rounded-xl p-4 flex flex-col transition-all duration-300 ease-in-out transform origin-left ${
            logsExpanded
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-6 scale-95 pointer-events-none"
            }`}
        >
            {/* Header inside pop-out card */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-base">Historie záznamů</h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                {logEntries.length}
            </span>
            </div>

            {/* Scrollable Entries List */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-80 pr-1">
            {logEntries.length === 0 ? (
                <p className="text-center text-slate-400 py-6 text-sm">Žádné záznamy</p>
            ) : (
                logEntries.map((entry) => (
                <div
                    key={entry.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                    <span className="text-sm text-slate-700 font-medium">
                    {entry.formatted}
                    </span>
                    <button
                    type="button"
                    onClick={() => handleLogItemDeletion(entry.id)}
                    className="text-xs text-slate-400 hover:text-red-500 font-medium opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                    Smazat
                    </button>
                </div>
                ))
            )}
            </div>
        </div>

    </div>
  );
}