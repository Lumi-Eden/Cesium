import { useState } from "react"
import categories from "/src/data/item-data.json"

export default function ItemSelection({activeCategory, onCategoryChange, onStepClick, searchText}) {

    const DynamicallySelectedCategory = categories.find(
        (cat) => cat.categoryName === activeCategory
    );

    const handleCardClick = (item) => {
        // If there's no "next" step, or next is "Default" = its the final choice
        const isFinal = !item.next || item.next === "Default";

        // For the sake of keeping fonts purely as images on screen - else handles that
        if (activeCategory !== "Písmo") {
            onStepClick(item.title, isFinal);
        } else {
            onStepClick(item.fontName, isFinal);
        }
        onCategoryChange(item.next || "Default");
    };

    // Items filtered for search query - inclusive of fontName
    const filteredItems = DynamicallySelectedCategory?.items.filter(item => 
        (item.title || item.fontName || "").toLowerCase().includes(searchText.toLowerCase())
    ) || [];

    return(
        <div id="main-selection-container" className="grid grid-cols-3 gap-5 my-5 px-12">
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
                        <img className="object-contain max-h-60 m-auto rounded-lg filter " src={item.image} />
                        <p className="text-center my-4">{item.title}</p>
                    </div>
                )
            ))}
        </div>
    )
}