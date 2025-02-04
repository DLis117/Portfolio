import MenuList from "./MenuList";
import style from '/src/RecursiveNavBar/RecursiveNavBar.module.css'

import Projects from "../Projects/Projects";
import { useState } from "react";
import { navBarDataPages,technologiesArray } from "../Content/Content";


function RecursiveNavBar(props) 
{
    //always display first (welcome) page
    let [page,setPage]= useState(navBarDataPages[0].page);

    function handleChangePage(e)
    { 
        //go through all pages
        for (page of navBarDataPages)
        {
            //check which page was clicked
            if(e.target.innerHTML.trim()===page.label)
            {
                //check if the page belongs to Projects/Technology parent
                for (let technology of technologiesArray.children)
                {
                    if(technology.label===page.label)
                    {
                        // render Projects Component with clicked technology
                        setPage(<Projects defaultPage={page.label}/>)
                        return;
                    }
                }
                //render clicked page
                setPage(page.page)
                return;
            }
        }
    }
    
    return (
        <>
            <div className={style.navBarMain} onClick={handleChangePage}>
                <div className={style.NavBarContainer}>
                    <MenuList data={props.data}/>
                </div>
            </div>
            {page}
        </>
    );
}

export default RecursiveNavBar;


