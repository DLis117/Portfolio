import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react"
import Confetti from "react-confetti"


function ConfettiComponent()
{
    let [confettiToggled, setToggleConfetti]=useState(false);
    let ableToClickButtonRef = useRef(true);
    
    function toggleConfetti()
    {
        setToggleConfetti(true);
        // setTimeout(()=>{setToggleConfetti(false);console.log("confetti disabled")},5000);
    }
    useEffect(()=>
    {
        if(confettiToggled===true)
        {
            //enables clicking the button every 5 seconds
            setTimeout(()=>{setToggleConfetti(false)},5000);
        }    
    },[confettiToggled])

    return (<>
                <button className="confetti" onClick={toggleConfetti}>🎉 time!</button>
                {confettiToggled===true?<Confetti recycle={false} numberOfPieces={1000}/>:null}
            </>)
}
export default ConfettiComponent