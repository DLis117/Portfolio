import { useEffect, useState } from "react";
import Popup from "./Popup";
import style from '/src/PopupComponent/PopupComponent.module.css'
function PopupComponent()
{

        let [popUpShow,setPopUpShow]=useState(true);
        if(popUpShow)
        {
            document.getElementById("root").style.cssText = "overflow: hidden; width: 100vw; height: 100vh;";
        }
        function closePopUp()
        {
            setPopUpShow(false)
            document.getElementById("root").style="";
        }
    
        useEffect(()=>{
            setInterval(()=>{setPopUpShow(true)},1000)
        },[])


    return (<>
                <div className={style.page}>
                    {popUpShow&&<Popup onClose={closePopUp} className={style.popup} info={'this is absolutely not annoying popup! :)'}/>}
                </div>
                <div className={style.page}></div>
    </>)
}
export default PopupComponent;