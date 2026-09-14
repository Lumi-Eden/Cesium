import { useCallback, useState } from "react";
import { useLongPress } from 'use-long-press';

import deleteImg from "../../assets/delete.png"

export default function DeleteBtn({handleClearAll}) {
    const [isHoldDownEnabled, setIsHoldDownEnabled] = useState(true);
    const [isHoldingDown, setIsHoldingDown] = useState(false);
    const [justDeleted, setJustDeleted] = useState(false);

    const handleMassLogDeletion = () => {
        setIsHoldingDown(false);
        setJustDeleted(true);
        try {
            handleClearAll();
            console.log("Logs have been deleted!");
        } catch(err) {
            console.log("Failed clearing data:", err)
        }
    
        // Reset flash after 500ms
        setTimeout(() => {
            setJustDeleted(false);
        }, 500);
    }
    
    const holdCallback = useCallback(e => {
        console.log("Held down delete button");
        handleMassLogDeletion();
    }, []);
    
    // Hold down bind
    const hold = useLongPress(isHoldDownEnabled ? holdCallback : null, {
        onStart: () => setIsHoldingDown(true),
        onFinish: () => setIsHoldingDown(false),
        onCancel: () => {
            setIsHoldingDown(false); 
            console.log("Holding down cancelled!")
        },
        onMove: () => setIsHoldingDown(false),
        threshold: 2000,
        captureEvent: true,
        cancelOnMovement: 15,
        cancelOutsideElement: true,
        detect: "pointer",
    });

    return (
        <img 
            draggable="false"
            src={deleteImg} 
            className={`w-11 h-11 my-2 mx-1 p-1.5 bg-[#B59A89] outline-3 outline-black invert-100 rounded-lg cursor-pointer transition-color duration-1000
                ${
                    // Plays animation for deleting
                    isHoldingDown  && "outline-blue-700"
                }
                ${
                    // Shows when holding down is finished
                    justDeleted ? "outline-cyan-400" : "outline-black"
                }
            `}
            {...hold()}
        />
    )
}