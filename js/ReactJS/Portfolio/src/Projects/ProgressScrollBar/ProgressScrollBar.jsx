import { useState } from 'react'
import style from './ProgressScrollBar.module.css'
function ProgressScrollBar()
{
    
    let [scrollVar,setScrollVar]=useState(0);
    window.onscroll=()=>
    {
        let maxForScroll= (document.documentElement.scrollHeight-document.documentElement.clientHeight)
        setScrollVar(Math.floor((document.documentElement.scrollTop*100)/maxForScroll))
    }
    return(<>
                <div className={style.scrollBarContainer} >
                    <div className={style.scrollBar} style={{width: `${scrollVar}%`}}></div>
                </div>
          </>)
}
export default ProgressScrollBar;