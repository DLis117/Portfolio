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
import StarRating from './StarRating/StarRating.jsx';
import AdvancedStarRating from './AdvancedStarRating/AdvancedStarRating.jsx';
import ApiDataGallery from './ApiDataGallery/ApiDataGallery.jsx';
import AutocompleteData from './AutocompleteData/AutocompleteData.jsx';
import GithubUserFinder from './GithubUserFinder/GithubUserFinder.jsx';
import ThemedComponent from './LightDarkModeTheme/ThemedComponent.jsx';
import Popup from './PopupComponent/Popup.jsx';
import PopupComponent from './PopupComponent/PopupComponent.jsx';
let mountainpic='/mountain.png';
let fieldpic='/field.png';


let watch1Style={backgroundImage: 'url("/watch1.png")'}
let watch2Style={backgroundImage: 'url("/watch2.png")'}
let watch3Style={backgroundImage: 'url("/watch3.png")'}

let accordionComponentInfo = [
{info: 'Mercury is the planet nearest to the Sun',
    additionalInfo: "and the smallest planet in our solar system",
    additionalInfoActivated: false},

{info: 'Venus is the second planet from the Sun',
additionalInfo: "and the sixth largest planet",
additionalInfoActivated: false},

{info: 'Earth – our home planet – is the third planet from the Sun',
additionalInfo: "and the fifth largest planet",
additionalInfoActivated: false,}
]
let urlForGallery=`https://picsum.photos/v2/list?page=${1}`;

function ReactJS()
{
    return (<>
                <div className={style.reactJsProjectsContainer}>
                    {/* if the there is more than one component, and there is resizeable component we want to wrap those in single row
                    to prevent unknown behaviour if it start to overlap next components and move them unintentionally*/}
                    <div className={style.wrapTogether}>
                        <ProjectWrapper project={<>
                                                    <CardComponent pic={mountainpic} desc='mountains' name='mountain card' id={0}/>
                                                    <CardComponent pic={fieldpic} desc='fields' name='fields card' id={1}/>
                                                    <CardComponent/>
                                                </>} description='Card Components'/>
                        <ProjectWrapper project={<Counter/>} description='Counter'/>
                        <ProjectWrapper project={<Clock/>} description='Clock'/>
                    </div>
                    
                    <div className={style.wrapTogether}>
                        <ProjectWrapper project={<>
                                                    <ShoppingForm element="omega constelation"  styles={watch1Style}/>
                                                    <ShoppingForm element="omega speedmaster"   styles={watch2Style}/>
                                                    <ShoppingForm element="rolex daytona"       styles={watch3Style}/>
                                                    </>} description='conditional rendering'/>
                    </div>
                    
                    <div className={style.wrapTogether}>
                        <ProjectWrapper project={<Stopwatch/>} description='Stopwatch'/>
                        <ProjectWrapper project={<ToDoList/>} description='To Do List'/>
                    </div>
                    
                    <div className={style.wrapTogether}>
                        <ProjectWrapper project={<AccordionComponent info={accordionComponentInfo}/>} description='accordion like List'/>
                        <ProjectWrapper project={<StarRating/>} description='star rating'/>
                        <ProjectWrapper project={<AdvancedStarRating/>} description='advanced star rating'/>
                    </div>

                    <div className={style.wrapTogether}>
                    <ProjectWrapper project={<ApiDataGallery url={urlForGallery} limit={10}/>} description='gallery from API data'/>
                        <ProjectWrapper project={<AutocompleteData/>} description='display only filtered data'/>
                        
                    </div>
                    <div className={style.wrapTogether}>
                        <ProjectWrapper project={<GithubUserFinder/>} description='Github User Finder'/>
                        <ProjectWrapper project={<ThemedComponent/>} description='theme which remembers state after refresh'/>
                        <ProjectWrapper project={<PopupComponent/>} description='popup toggler'/>
                    </div>
                    <div className={style.wrapTogether}>
                        
                        
                    </div>

                    <Description text={`smaple text`}/>
                </div>
            </>)
}
export default ReactJS;
