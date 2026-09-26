import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { useState } from "react";

import printBtnImg from "../../assets/print.png"

export default function PrintBtn({logEntries}) {
    const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false)

    const handleCreatePrintWindow = async (printFileName) => {
        // Save data into localStorage for use in print window
        localStorage.setItem("print_order_data", JSON.stringify(logEntries));

        try {
            const webview = new WebviewWindow('printWindow', {
                url: printFileName, // format: "print.html"
                title: 'Tisk Objednávky',
                width: 768,
                height: 960,
            });

            webview.once('tauri://created', () => {
                console.log('Print window created successfully!');
            });

            webview.once('tauri://error', (err) => {
                console.error('Tauri Window Creation Error:', err);
            });
        } catch (error) {
            console.error('Failed to instantiate WebviewWindow:', error);
        }
    }

    

    return (
        <>
            {/* Print btn */}
            <div
                className="bg-tk-dark hover:bg-[#3d5463] flex w-11 h-11 my-2 mx-2 rounded-lg cursor-pointer"
                // onClick={handleCreatePrintWindow}
                onClick={() => setIsPrintMenuOpen(!isPrintMenuOpen)}
            >
                <img draggable="false" src={printBtnImg} alt="print" className="w-8 m-auto invert-100" />
            </div>

            {/* Pop out card */}
            <div 
                className={`z-10 bg-white shadow-xl fixed flex flex-col w-60 right-1.5 top-12 border border-slate-200 overflow-hidden rounded-xl transition-all ${
                isPrintMenuOpen 
                    ? "opacity-100 translate-y-2 pointer-events-auto"
                    : "opacity-0 translate-0 scale-95 pointer-events-none"
                }`}
            >
                {/* Header */}
                <div className="flex border-b border-slate-200 w-[88%] h-12 p-3 mx-auto">
                    <span className="mx-auto font-bold text-slate-800">Výběr Tisku</span>
                </div>

                {/* Entries */}
                <div className="flex flex-col w-full h-full p-2 pb-4">
                    <button 
                        type="button" 
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100/80 active:bg-slate-200/80 transition-colors"
                        onClick={() => handleCreatePrintWindow("print.html")}
                    >
                        <span className="text-sm text-slate-700 font-medium">Základní dokument</span>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">A4</span>
                    </button>
                    
                    <button 
                        type="button" 
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100/80 active:bg-slate-200/80 transition-colors"
                        onClick={() => handleCreatePrintWindow("print-linky.html")}
                    >
                        <span className="text-sm text-slate-700 font-medium">Linky</span>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">A4</span>
                    </button>
                </div>

            </div>
        </>
    )
}