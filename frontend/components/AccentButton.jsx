


export default function AccentButton(props) {
    return (
        <button className={`cursor-pointer  px-6 py-3 rounded-full shadow-lg text-white  hover:text-secondary hover:bg-primary bg-accent transition font-baloo font-bold text-2xl w-fit h-fit ${props.className}`} onClick={props.onClick}>{props.label}</button>
    )
}