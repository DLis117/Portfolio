import { useState } from "react"
import Confetti from "react-confetti"


function ConfettiComponent()
{
    let [confettiToggled, setToggleConfetti]=useState(false);
    function toggleConfetti()
    {
        setToggleConfetti(t=>t=!t);
    }

    console.log("object rerendered")
    return (<>
                <button className="confetti" onClick={toggleConfetti}>🎉</button>
                {confettiToggled===true?<Confetti recycle={false} numberOfPieces={1000}/>:null}
            </>)
}
export default ConfettiComponent