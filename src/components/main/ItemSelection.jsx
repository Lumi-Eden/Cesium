import { useState } from "react"
import categories from "/src/data/item-data.json"
import skip from "../../assets/skip.png"

export default function ItemSelection({activeCategory, currentMainCat, setCurrentMainCat, onCategoryChange, onStepClick, searchText}) {

    const DynamicallySelectedCategory = categories.find(
        (cat) => cat.categoryName === activeCategory 
    );

    const handleCardClick = (item) => {
        // For the sake of keeping fonts purely as images on screen
        const titleToPass = activeCategory === "Písmo" ? item.fontName : item.title;

        // If there's no "next" step, or next is "Default" = its the final choice
        let isFinal = !item.next || item.next === "Default";

        if (currentMainCat === "Linky") {
            isFinal = false; // Continue to obklad
        }

        onStepClick(titleToPass, isFinal) // Can pass undefined for Obklad, might need changing

        if (currentMainCat === "Linky") {
            setCurrentMainCat("Obklad");
            onCategoryChange("Materiály"); // Shows category as Materiály again
        } else {
            onCategoryChange(item.next || "Default");
        }
    };

    // Items filtered for search query - inclusive of fontName
    const filteredItems = DynamicallySelectedCategory?.items.filter(item => 
        (item.title || item.fontName || "").toLowerCase().includes(searchText.toLowerCase())
    ) || [];

    return(
        <div id="main-selection-container" className="grid grid-cols-3 gap-5 my-5 px-12">

            {currentMainCat === "Obklad" && (
                <div
                    className="bg-white ring-1 ring-slate-900/5 flex flex-col min-w-60 min-h-70 p-2 rounded-2xl cursor-pointer hover:scale-98 hover:ring-2 hover:ring-slate-400 active:scale-97 transition-transform"
                    onClick={() => handleCardClick("Bez obkladu")} // <- This will need changing
                >
                    <img className="object-contain max-h-60 m-auto rounded-lg" src={skip} alt="Přeskočit" />
                    <p className="text-center my-4">Bez Obkladu</p>
                </div>
            )}

            {filteredItems.length === 0 ? (
                <div className="col-span-full">
                    <p className="font-bold text-center">Žádné položky nebyli nalezeny</p>
                </div>
            ) : (
                filteredItems.map(item => (
                    <div 
                        key={item.id} 
                        className="bg-white ring-1 ring-slate-900/5 flex flex-col min-w-60 min-h-70 p-2 rounded-2xl cursor-pointer hover:scale-98 hover:ring-2 hover:ring-slate-400 active:scale-97 transition-transform"
                        onClick={() => handleCardClick(item)}
                    >
                        <img className="object-contain max-h-60 m-auto rounded-lg" src={item.image} />
                        <p className="text-center my-4">{item.title}</p>
                    </div>
                )
            ))}
        </div>
    )
}