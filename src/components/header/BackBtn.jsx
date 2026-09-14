import leftArrowImg from "../../assets/left-arrow.png"

export default function BackBtn({onBackClick}) {
    return (
        <div className="bg-tk-dark hover:bg-[#3d5463] flex w-11 h-11 my-2 mx-2 rounded-lg cursor-pointer" onClick={onBackClick}>
            <img src={leftArrowImg} alt="left-arrow" className="w-8 m-auto invert-100" />
        </div>
    )
}