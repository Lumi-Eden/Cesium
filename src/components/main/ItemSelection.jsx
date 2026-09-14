import { useState } from "react"
import categories from "/src/data/item-data.json"

export default function ItemSelection({activeCategory, onCategoryChange, onStepClick}) {

    const DynamicallySelectedCategory = categories.find(
        (cat) => cat.categoryName === activeCategory
    );

    const handleCardClick = (item) => {
        // If there's no "next" step, or next is "Default", it's the final choice!
        const isFinal = !item.next || item.next === "Default";

        // For the sake of keeping fonts purely as images on screen
        if (activeCategory !== "Písmo") {
            onStepClick(item.title, isFinal);
        } else {
            onStepClick(item.fontName, isFinal);
        }
        onCategoryChange(item.next || "Default");
    };

    return(
        <div id="main-selection-container" className="grid grid-cols-3 gap-5 my-5 px-12">
            {DynamicallySelectedCategory?.items.map(item => (
                <div 
                    key={item.id} 
                    className="bg-slate-300 flex flex-col min-w-60 min-h-70 p-2 rounded-lg cursor-pointer hover:scale-98 active:scale-97 transition-transform"
                    onClick={() => handleCardClick(item)}
                >
                    <img className="object-contain max-h-60 m-auto rounded-lg filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" src={item.image} />
                    <p className="text-center my-4">{item.title}</p>
                </div>
            ))}
        </div>
    )
}