import ProjectWrapper from './ProjectWrapper/ProjectWrapper.jsx';
import Description from './Description/Description';
import style from './ReactJS.module.css'
import CardComponent from "./Card/Card.jsx"
import Counter from './Counter/Counter.jsx';
import Clock from './DigitalClock/Clock.jsx';
import ShoppingForm from './ShoppingForm/ShoppingForm.jsx';
import Stopwatch from './Stopwatch/Stopwatch.jsx';
import ToDoList from './ToDoList/ToDoList.jsx';
import AccordionComponent from './AccordionComponent/AccordionComponent.jsx';
let mountainpic='/mountain.png';
let fieldpic='/field.png';


  let watch1Style={backgroundImage: 'url("/watch1.png")'}
  let watch2Style={backgroundImage: 'url("/watch2.png")'}
  let watch3Style={backgroundImage: 'url("/watch3.png")'}
function ReactJS()
{
    return (<>
                <div className={style.reactJsProjectsContainer}>
                    <ProjectWrapper project={<>
                                                <CardComponent pic={mountainpic} desc='mountains' name='mountain card' id={0}/>
                                                <CardComponent pic={fieldpic} desc='fields' name='fields card' id={1}/>
                                                <CardComponent/>
                                            </>} description='Card Components'/>
                    <ProjectWrapper project={<Counter/>} description='Counter'/>
                    <ProjectWrapper project={<Clock/>} description='Clock'/>
                    
                    <ProjectWrapper project={<>
                                                <ShoppingForm element="omega constelation"  styles={watch1Style}/>
                                                <ShoppingForm element="omega speedmaster"   styles={watch2Style}/>
                                                <ShoppingForm element="rolex daytona"       styles={watch3Style}/>
                                             </>} description='conditional rendering'/>
                    
                    {/* if the there is more than one component, and there is resizeable component we want to wrap those in single row
                    to prevent unknown behaviour if it start to overlap next components and move them unintentionally*/}
                    <div className={style.wrapTogether}>
                        <ProjectWrapper project={<Stopwatch/>} description='Stopwatch'/>
                        <ProjectWrapper project={<ToDoList/>} description='To Do List'/>
                    </div>
                    
                    <ProjectWrapper project={<AccordionComponent/>} description='AccordionComponent'/>

                    <Description text={`smaple text`}/>
                </div>
            </>)
}
export default ReactJS;
