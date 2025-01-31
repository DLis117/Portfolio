import Description from './Description/Description';
import style from './ReactJS.module.css'
import CardComponent from "./Card/Card.jsx"
import Counter from './Counter/Counter.jsx';
import Clock from './DigitalClock/Clock.jsx';
let mountainpic='/mountain.png';
let fieldpic='/field.png';
function ReactJS()
{
    return (<>
                <div className={style.reactJsProjectsContainer}>
                    <div className={style.projectWrapper}>
                        <CardComponent pic={mountainpic} desc='mountains' name='mountain card' id={0}/>
                        <CardComponent pic={fieldpic} desc='fields' name='fields card' id={1}/>
                        <CardComponent/>
                    </div>
                    <div className={style.projectWrapper}>
                        <Counter/>
                    </div>
                    <div className={style.projectWrapper}>
                        <Clock/>
                    </div>
                   
                    <Description text={`idzie Ola do przedszkola. za nią Ala - zapierdala :)`}/>
                </div>
            </>)
}
export default ReactJS;
