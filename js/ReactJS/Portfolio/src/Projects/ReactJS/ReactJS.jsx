import Description from './Description/Description';
import style from './ReactJS.module.css'
import CardComponent from "./Card/Card.jsx"
import Counter from './Counter/Counter.jsx';
import Clock from './DigitalClock/Clock.jsx';
import ShoppingForm from './ShoppingForm/ShoppingForm.jsx';
let mountainpic='/mountain.png';
let fieldpic='/field.png';


  let watch1Style={backgroundImage: 'url("/watch1.png")'}
  let watch2Style={backgroundImage: 'url("/watch2.png")'}
  let watch3Style={backgroundImage: 'url("/watch3.png")'}
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

                    <div className={style.projectWrapper}>
                        <ShoppingForm element="omega constelation" styles={watch1Style}/>
                        <ShoppingForm element="omega speedmaster" styles={watch2Style}/>
                        <ShoppingForm element="rolex daytona" styles={watch3Style}/>
                    </div>
                    
                    <Description text={`smaple text`}/>
                </div>
            </>)
}
export default ReactJS;
