import Description from '../ReactJS/Description/Description';
import WristWatch from './Wristwatch/Wristwatch';
import style from './Embedded.module.css'


let projectsData=   [
                        [//this will be wrapped together
                            [//elements of this project, its title, its description 
                                <>
                                    <WristWatch/>
                                </>,'wristwatch',
                                <div className={style.description}>
                                    <p>this is a wristwatch description</p>
                                    <br/>
                                    <h1>Key Features</h1>
                                    <ul>
                                        <li><span>time counting: </span> it  counts time. (shocking! :o)</li>
                                    </ul>
                                </div>
                            ],
                            
                            // [
                            //     <Counter/>,"Counter",
                            //     <div className={style.description}>
                            //         <p>This component demonstrates the use of state variables, the useState hook, and functional updates, along with onClick event handlers for managing user interactions.</p>
                            //         <br/>
                            //         <h1>Key Features</h1>
                            //         <ul>
                            //             <li><span>State Management: </span>Utilizes the useState hook to store and update component state dynamically.</li>
                            //             <li><span>Functional Updates: </span>Implements functional updates to ensure state changes are correctly applied, particularly when relying on previous state values.</li>
                            //             <li><span>Event Handling: </span>Uses onClick event handlers to trigger state updates in response to user interactions.</li>
                            //         </ul>
                            //     </div>
                            // ],
                        ],
                        
                    ];


function Embedded()
{
    return (<>
                <div className={style.EmbeddedProjectsContainer}>
                    {/* if the there is more than one component, and there is resizeable component we want to wrap those in single row
                    to prevent unknown behaviour if it start to overlap next components and move them unintentionally*/}
                    {projectsData.map((x,y)=>
                        <>
                            <div className={style.wrapTogether}>
                                {x.map((z,q)=>
                                    // <ProjectWrapper project={z[0]} description={z[1]}/>
                                    <>
                                        <div key={q} className={style.projectWrapper}>
                                            <div className={style.titleOfProjectContainer}>
                                                <h1 className={style.titleOfProject}>{z[1]}</h1>
                                            </div>
                                            <div className={style.project}>
                                                {z[0]}
                                            </div>
                                        </div>
                                        <Description info={projectsData[y][q][2]}/>
                                    </>
                                )}
                            </div>
                        </>)}
                </div>
            </>)
}
export default Embedded;
