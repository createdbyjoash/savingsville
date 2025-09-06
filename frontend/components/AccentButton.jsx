import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";


export default function AccentButton(props)


{

    if (props.type === "link") { return (
        <Link href={props.href} className={`cursor-pointer  px-6 py-3 rounded-full shadow-lg text-white  hover:text-secondary hover:bg-primary bg-accent transition font-baloo font-bold max-sm:text-xl max-md:text-2xl md:text-2xl w-fit h-fit ${props.className}`} onClick={props.onClick}>{props.label}</Link>

    ) } else { return (

        <button type={props.type} disabled={props.disabled} className={`cursor-pointer  px-6 py-3 rounded-full shadow-lg text-white  hover:text-secondary hover:bg-primary bg-accent transition font-baloo font-bold max-sm:text-xl max-md:text-2xl md:text-2xl w-fit h-fit flex gap-1 justify-center ${props.className}`} onClick={props.onClick}><p>{props.label}</p> {props.loading && <AiOutlineLoading3Quarters size={18} className="ml-2 animate-spin my-auto"/>}</button>
    )}
}