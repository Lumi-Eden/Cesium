export default function NavGuide({currentMainCat}) {
    return (
        <div className="bg-tk-dark flex w-[calc(100%-2rem)] h-10 mx-auto my-2 rounded-lg">
            <div className="border border-white flex w-[calc(100%-1rem)] h-8 m-auto rounded-lg">
                <span className="text-white m-auto">{currentMainCat}</span>
            </div>
        </div>
    )
}