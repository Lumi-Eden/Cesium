import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

import printBtnImg from "../../assets/print.png"

export default function PrintBtn({logEntries}) {

    const handleCreatePrintWindow = async () => {
        try {
            // Save data into localStorage for use in print window
            localStorage.setItem("print_order_data", JSON.stringify(logEntries));
            // localStorage.setItem("print_form_data", JSON.stringify())

            const webview = new WebviewWindow('printWindow', {
                url: "print.html", // or 'index.html#/print' if using hash routing
                title: 'Tisk Objednávky',
                width: 1000,
                height: 1280,
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
        <div
            className="bg-tk-dark hover:bg-[#3d5463] flex w-11 h-11 my-2 mx-2 rounded-lg cursor-pointer"
            onClick={handleCreatePrintWindow}
        >
            <img draggable="false" src={printBtnImg} alt="print" className="w-8 m-auto invert-100" />
        </div>
    )
}