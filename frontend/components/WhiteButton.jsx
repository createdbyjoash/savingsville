import Link from "next/link"


export default function WhiteButton(props) {

    if (props.type === "link") { return (
        <Link href={props.href} className={`cursor-pointer  px-6 py-3 rounded-full shadow-lg text-secondary  hover:text-white hover:bg-secondary bg-white transition font-baloo font-bold max-sm:text-xl max-md:text-2xl md:text-2xl w-fit h-fit ${props.className}`} onClick={props.onClick}>{props.label}</Link>

    ) } else { return (
        <button className={`cursor-pointer  px-6 py-3 rounded-full shadow-lg text-secondary  hover:text-white hover:bg-secondary bg-white transition font-baloo font-bold max-sm:text-xl max-md:text-2xl md:text-2xl w-fit h-fit ${props.className}`} onClick={props.onClick}>{props.label}</button>
    )}
}