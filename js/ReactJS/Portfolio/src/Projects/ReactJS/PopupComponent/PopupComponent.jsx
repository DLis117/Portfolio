import { useEffect, useState } from "react";
import Popup from "./Popup";
import style from './PopupComponent.module.css'
import { useRef } from "react";
function PopupComponent()
{

        let [popUpShow,setPopUpShow]=useState(false);
        let [popUpShowToggle,setPopUpShowToggle] = useState(false);
        //since the interval will be reset after each rerender we need to store reference to it
        let myIntervalRef= useRef(null);

        function toggleShowPopup()
        {
            let newPopUpShowToggle = !popUpShowToggle;
            
            if(newPopUpShowToggle===true)
            {
                myIntervalRef.current=setInterval(()=>{setPopUpShow(true)},5000)
            }
            else
            {
                clearInterval(myIntervalRef.current);
                setPopUpShow(false);
            }
            setPopUpShowToggle(newPopUpShowToggle);
        }
        function closePopUp()
        {
            setPopUpShow(false)
        }
    return (<>
                <div className={style.popupComponent}>
                    <button onClick={toggleShowPopup}>{popUpShowToggle?`disable`:`enable`} popup</button>
                    {popUpShow&&<Popup onClose={closePopUp} info={'this is absolutely not annoying popup! :)'}/>}
                </div>    
            </>)
}
export default PopupComponent;