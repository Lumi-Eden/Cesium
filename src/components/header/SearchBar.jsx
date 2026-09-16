import { useEffect, useState } from "react"
import magGlassImg from "../../assets/mag-glass.png"

export default function SearchBar({searchText, onSearchTextChange}) {

    useEffect(() => {
        console.log("Current search query", searchText)
    }, [searchText])

    return (
        <div id="search-bar" className="bg-tk-dark flex w-9/10 h-11 my-2 mx-1 rounded-lg">
            <div id="mag-glass" className="w-7 my-auto ml-2">
                <img src={magGlassImg} alt="Q" className="invert-100" />
            </div>
            <div id="search-field" className="flex w-full">
                <input
                    type="text"
                    placeholder="Hledání..." 
                    className="bg-white w-full h-8 px-2 mx-2 my-auto rounded-lg"
                    onChange={(e) => onSearchTextChange(e.target.value)}
                />
            </div>
        </div>
    )
}