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
                    /*  Clicking a technology from the navbar correctly updates the Projects component.
                        Clicking a technology inside the Projects component updates its internal state (technologies), re-rendering Projects.
                        Clicking the same technology from the navbar does nothing because React does not detect a state change (it sees the same state being set again). 

                        If setPage in RecursiveNavBar sets <Projects defaultPage="ReactJS" /> but defaultPage is already "ReactJS", React does not re-render because it thinks nothing changed.

                        Instead of just passing <Projects defaultPage="ReactJS" />, add a unique key that forces React to treat it as a new instance:
                    */
                    props.setPage(<Projects key={label + Date.now()} defaultPage={label}/>)
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


