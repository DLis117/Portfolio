import { useState } from 'react';
import style from './Projects.module.css'
import ProgressScrollBar from './ProgressScrollBar/ProgressScrollBar';
import { technologiesArray } from '../Content/Content';
function Projects(props)
{
    //we could hardcode finding the index of Technologies label on navBar ...but just in case...
    

    let [technologies,setTechnologies]= useState(()=>{
            //we assume that "Technologies" children do not have any children
            if(props.defaultPage)
            {
                return (technologiesArray.children.map(x=>({name:x.label,activated:x.label===props.defaultPage,page:x.page})));
            }
            return (technologiesArray.children.map((x,y)=>({name:x.label,activated:y===0,page:x.page})));       
    })

    function handleActivation(y)
    {
        //if its already displayed then prevent rerendering the same component
        if(technologies[y].activated===false)
        {
            setTechnologies(()=>{
                let newTechnologies = technologies.map((x,z)=>({...x,activated:z===y}));
                return newTechnologies;
            })
        }
       
    }
    
    return( <>
                <div className={style.projectsPage}>
                    <div className={style.technologiesBar}>
                        {technologies.map((x,y)=><button key={y} onClick={()=>handleActivation(y)} className={style.technologyButton} style={x.activated?{background: `rgb(65, 3, 136)`}:null}>{x.name}</button>)}
                        <ProgressScrollBar/>
                    </div>
                        {/* if a technology is activated - show it 
                            because only one technology can be activated at once
                            it will display the clicked one
                        */}
                        {technologies.map((x,y)=>x.activated&&technologies[y].page)}
                </div>
            </>)
}
export default Projects;