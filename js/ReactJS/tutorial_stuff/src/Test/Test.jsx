import { useEffect, useState } from "react";
function Test()
{
    let [x,setX]=useState(5);
    let [y,setY]=useState(-5);
    function doSmth()
    {
        setX(x=>x+1);
        // setY(x);
        setY(x+1)
        console.log("x ",x)
        console.log("y ",y);
    }
    
    
    return (<><button onClick={doSmth}>cilckme</button>
    </>)
}
export default Test;