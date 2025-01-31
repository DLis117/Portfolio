import { useState } from "react";
import style from './AccordionComponent.module.css';


function AccordionComponent(props)
{
    let [listOfStuff,setListOfStuff]=useState(props.info);

    let [multipleInfosToggled,setMultipleInfosToggled]=useState(false);

    function handleMultipleInfosToggled()
    {
        setMultipleInfosToggled(m=>m=!m);
    }
    function handleShowAdditionalInfo(indx)
    {
        let newListOfStuff=[...listOfStuff];
        if(multipleInfosToggled)
        {
            newListOfStuff.map((x,y)=>y!=indx?x.additionalInfoActivated=false:null)
            newListOfStuff[indx].additionalInfoActivated=!newListOfStuff[indx].additionalInfoActivated;
        }
        else
        {
            newListOfStuff[indx].additionalInfoActivated=!newListOfStuff[indx].additionalInfoActivated;
        }

        setListOfStuff(newListOfStuff);
        newListOfStuff=null;
    }
    return(
    <>
    <div className={style.accordionListBox}>
        <div className={style.header}>
            <button onClick={handleMultipleInfosToggled}>{multipleInfosToggled?"click to activate multiple selection":"click to activate single selection"}</button>
        </div>
        <ul>
            
            {
                listOfStuff!=undefined?
                (listOfStuff.map((x,indx)=>
                    <li onClick={()=>handleShowAdditionalInfo(indx)} key={indx}>{x.info} 🔽 {x.additionalInfoActivated&&
                        <h2>{x.additionalInfo}</h2>}
                    </li>)):
                <li style={{background: "red"}}>your list is empty!</li>
            }
        </ul>
    </div>
    </>
    )
}
export default AccordionComponent