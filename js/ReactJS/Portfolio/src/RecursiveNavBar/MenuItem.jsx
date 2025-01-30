import { useState } from "react";
import MenuList from "./MenuList";
import style from '/src/RecursiveNavBar/RecursiveNavBar.module.css'
function MenuItem(props) 
{
    let [activated,setActivated]=useState(true);

    
    function toggleChildren()
    {
        setActivated(a=>!a);
    }
    return (
        //version without animated arrow
        
        // <li>                                              {/*this is how we know and we can indicate it is a parent */}
        //     <p onClick={toggleChildren}>{props.data.label}{props.data.children?.length>0?activated?"  ▼":"  ►":null}</p>
        //     {activated?(props.data.children?.length>0)&&<MenuList data={props.data.children}/>:null}
        // </li>


        //version with animated arrow:
        <li>
            <p onClick={toggleChildren}>{props.data.label} {props.data.children?.length>0?
                <span className={!activated?style.rotated:style.normal}>▼</span>
            :null}</p>

            {activated?(props.data.children?.length>0)&&<MenuList data={props.data.children}/>:null}
        </li>
        
    );
}

export default MenuItem;
