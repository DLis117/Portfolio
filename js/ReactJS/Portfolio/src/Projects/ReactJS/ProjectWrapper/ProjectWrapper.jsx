import style from './ProjectWrapper.module.css'
function ProjectWrapper(props)
{
    return(
            <div className={style.projectWrapper}>
                <div className={style.titleOfProjectContainer}>
                    <h1 className={style.titleOfProject}>{props.description}</h1>
                </div>
                
                <div className={style.project}>
                    {props.project}
                </div>
            </div>)
}
export default ProjectWrapper;