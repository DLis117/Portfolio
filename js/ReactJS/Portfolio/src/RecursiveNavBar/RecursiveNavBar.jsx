import MenuList from "./MenuList";
import style from '/src/RecursiveNavBar/RecursiveNavBar.module.css'
import Projects from "../Projects/Projects";
import { technologiesArray } from "../Content/Content";

function RecursiveNavBar(props) 
{

    
    function recursivelyFindIndexOfPage(d,label)
    {
        if(d.label===label)
        {
            for(let technology of technologiesArray.children)
            {
                if(label===technology.label)
                {
                    props.setPage(<Projects defaultPage={label}/>)
                    return;
                }
            }
            props.setPage(d.page)
            return;
        }
        if(d.children)
        {
            for(let child of d.children)
            {
                recursivelyFindIndexOfPage(child,label);
            }
        }
    }
    function handlePageChange(e)
    {
        for (let d of props.data)
        {
            recursivelyFindIndexOfPage(d,e.target.innerHTML.trim())
        }

    }
    return (
        <div className={style.navBarMain} onClick={handlePageChange}>
            <div className={style.NavBarContainer}>
                <MenuList data={props.data}/>
            </div>
        </div>
    );
}

export default RecursiveNavBar;


