import { useState } from "react";
import { DefaultButton } from "~/components/button";

export default function Overview() {
    const [buttonText, setButtonText] = useState("");

    const handleClick = () => {
        setButtonText('Clicked!');
    };
    
    return <DefaultButton text={buttonText} onClick={handleClick}></DefaultButton>
}