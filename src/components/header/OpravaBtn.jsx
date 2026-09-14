import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

import opravaImg from "../../assets/oprava.png"

export default function OpravaBtn() {

    const handleCreateOpravaWindow = async () => {
        try {
            const webview = new WebviewWindow('opravaWindow', {
                url: "oprava.html", // or 'index.html#/print' if using hash routing
                title: 'Tisk Opravy',
                width: 1000,
                height: 1280,
            });

            webview.once('tauri://created', () => {
            console.log('Oprava window created successfully!');
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
            onClick={handleCreateOpravaWindow}
        >
            <img draggable="false" src={opravaImg} alt="left-arrow" className="w-12 m-auto invert-100" />
        </div>
    )
}