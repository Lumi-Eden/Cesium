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
        <div id="log-container" className={`z-10 bg-tk-dark text-white flex flex-col w-120 h-120 fixed bottom-14 left-0 p-2 rounded-r-lg transition-transform
            ${
                // This checks if logs are expanded and adjusts position of logs list accordingly
                logsExpanded ? "translate-x-0" : "-translate-x-100 hover:-translate-x-99"
            }
        `}>
            <div className="absolute right-0 translate-y-50 rotate-90 cursor-pointer" onClick={logsExpansionHandler}>
                {!logsExpanded && <p className="text-center font-bold cursor-pointer">↥</p>}
                {logsExpanded && <p className="text-center font-bold cursor-pointer">↧</p>}
                <h1 className="text-right font-semibold">Záznamy</h1>
            </div>
            <div className="absolute w-100 -right-30 top-61 rotate-90 border-2" />
            <div className="flex flex-col w-97 h-full">
                {/* {!logsHasContent && <img className="m-auto w-80" src="../src/assets/spun.png" />}
                {!logsHasContent && <p className="text-center m-auto font-light">Žádné záznamy</p>} */}
                {logEntries.map((entry) => (
                    <div key={entry.id}>
                        <div>
                            <span className="font-bold cursor-pointer hover:line-through" onClick={() => handleLogItemDeletion(entry.id)}>{entry.formatted}</span>
                            {/* <span className="font-bold absolute right-25 cursor-pointer">[x]</span> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}