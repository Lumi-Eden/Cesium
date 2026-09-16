export default function FormAside({onOpenForm}) {

    return (
        <div id="form-aside-container" className="bg-tk-dark text-white w-50 h-50 mx-2 my-5 p-2 py-3 rounded-lg">
            <h1 className="text-center">Formuláře</h1>
            <ul className="leading-9" style={{ listStyleType: "none" }}>
                <li 
                    className="cursor-pointer hover:text-gray-300"
                    onClick={() => onOpenForm('Přípisy')}
                >| Přípisy</li>

                <li 
                    className="cursor-pointer hover:text-gray-300"
                    onClick={() => onOpenForm('Sklodesky rozměr')}
                >| Sklodesky rozměr</li>

                <li 
                    className="cursor-pointer hover:text-gray-300"
                    onClick={() => onOpenForm('Schody')}
                >| Schody</li>

                <li 
                    className="cursor-pointer hover:text-gray-300"
                    onClick={() => onOpenForm('Parapety')}
                >| Parapety</li>

            </ul>
        </div>
    )
}