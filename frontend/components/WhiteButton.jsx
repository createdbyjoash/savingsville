


export default function WhiteButton(props) {
    return (
        <button className={`cursor-pointer  px-6 py-3 rounded-full shadow-lg text-secondary  hover:text-white hover:bg-secondary bg-white transition font-baloo font-bold text-2xl w-fit h-fit ${props.className}`} onClick={props.onClick}>{props.label}</button>
    )
}