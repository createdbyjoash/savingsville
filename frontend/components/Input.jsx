


export default function Input(props) {
    return (
        <>
        <input 
        placeholder={props.placeholder}
        value={props.value}
        onBlur={props.onBlur}
        type={props.type}
        className={`border-1 border-gray-400 px-8 py-4 rounded-full w-full font-medium ${props.className}`}></input>
        </>
    )
}