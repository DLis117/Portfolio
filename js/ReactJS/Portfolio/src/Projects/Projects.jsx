import { useState } from 'react';
import style from './Projects.module.css'
function Projects()
{
    let [technologies,setTechnologies]= useState([
        {name: 'react',activated:false},{name: 'java',activated:false},
        {name: 'Node.js',activated:false},{name: 'javax',activated:false},
        {name: 'react Native',activated:false},{name: 'javaxx',activated:false},
        {name: 'Arduino uno nano',activated:false},{name: 'javaxxx',activated:false},
        {name: 'Arduino uno nano dlugi tekst',activated:false},{name: 'javaxxxx',activated:false},
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
                        {technologies.map((x,y)=><button key={y} onClick={()=>handleActivation(y)} className={style.technologyButton} style={x.activated?{background: `rgba(108, 45, 179, 0.674)`}:null}>{x.name}</button>)}
                    </div>

                </div>
            </>)
}
export default Projects;