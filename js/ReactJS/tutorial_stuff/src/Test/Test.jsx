import { useEffect, useState } from "react";
import styles from '/src/Test/Test.module.css'

function Test()
{
  let [draggingState,setDraggingState]=useState(false);
  let [topV,setTopV]=useState(0);
  let [leftV,setLeftV]=useState(0);

  function handleMouseDown(e)
  {
    setDraggingState(true);
  }
  function handleMouseMove(e)
  {
    
    if(draggingState==true)
    {
      let offsetX=dotSize/2;
      let offsetY=dotSize/2;
      setLeftV(e.clientX-offsetX);
      setTopV(e.clientY-offsetY);
    }
  }
  function handleMouseUp()
  {
    setDraggingState(false);
  }
  let dotSize=30;//px
  // console.log(document.getElementsByClassName(styles.square1)[0].getBoundingClientRect());
    return (<>
    <p style={{marginLeft: "100px"}}>{draggingState?"true":"false"}</p>
                  <div onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} className="stylesdot" style={{backgroundImage:`url(${'/public/sunset.png'})`,backgroundSize:"cover", position:"absolute",top: `${topV}px`,left: `${leftV}px`,background:"red",width:`${dotSize}px`,height:`${dotSize}px`,borderRadius:"50%"}}></div>
           </>)

          
}
export default Test;