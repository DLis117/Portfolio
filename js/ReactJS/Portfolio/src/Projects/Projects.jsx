import { useState } from 'react';
import style from './Projects.module.css'
import ProgressScrollBar from './ProgressScrollBar/ProgressScrollBar';
import ReactJS from './ReactJS/ReactJS';
import Embedded from './Embedded/Embedded';
function Projects()
{
    let [technologies,setTechnologies]= useState([
        {name: 'react',activated:false},{name: 'embedded',activated:false},
        
       ])

    function handleActivation(y)
    {
        setTechnologies(()=>{
            let newTechnologies = technologies.map((x,z)=>({...x,activated:z===y}));
            return newTechnologies;
        })
    }
    
    return( <>
                <div className={style.projectsPage}>
                    <div className={style.technologiesBar}>
                        {technologies.map((x,y)=><button key={y} onClick={()=>handleActivation(y)} className={style.technologyButton} style={x.activated?{background: `rgb(65, 3, 136)`}:null}>{x.name}</button>)}
                        <ProgressScrollBar/>
                    </div>
                    {/* <ReactJS/> */}
                    <Embedded/>

                </div>
            </>)
}
export default Projects;