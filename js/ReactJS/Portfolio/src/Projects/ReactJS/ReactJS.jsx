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
import PopupComponent from './PopupComponent/PopupComponent.jsx';
import TicTacToe from './TicTacToe/TicTacToe.jsx';
import TierList from './TierList/TierList.jsx';
import { useState } from 'react';
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

let tiers = [
                    {tier:'S',color:'#f5ef42'},
                    {tier:'A',color:'#b6f542'},
                    {tier:'B',color:'#42f5b3'},
                    {tier:'C',color:'#42d1f5'},
                    {tier:'D',color:'#4248f5'},
                    {tier:'F',color:'#9b42f5'}
                   ]

let dataToBeTiered =['/public/autumn.png','/public/field.png','public/mountain.png','/public/sunset.png','public/vite.svg',
    '/public/autumn.png','/public/field.png','public/mountain.png','/public/sunset.png','public/vite.svg',
    '/public/autumn.png','/public/field.png','public/mountain.png','/public/sunset.png','public/vite.svg',
    '/public/autumn.png','/public/field.png','public/mountain.png','/public/sunset.png','public/vite.svg'
]

let projectsData=   [
                        [//this will be wrapped together
                            [//elements of this project, its title, its description 
                                <>
                                    <CardComponent pic={mountainpic} desc='mountains' name='mountain card' id={0}/>
                                    <CardComponent pic={fieldpic} desc='fields' name='fields card' id={1}/>
                                    <CardComponent/>
                                </>,'Card Components',"test description"
                            ],
                            [
                                <Counter/>,"Counter","test description 2"
                            ],
                            [
                                <Clock/>,"Clock","clock desc TEST"
                            ]
                        ],
                        [//this will be wrapped together
                            [//elements of this project, its title, its description 
                                <>
                                    <ShoppingForm element="omega constelation"  styles={watch1Style}/>
                                    <ShoppingForm element="omega speedmaster"   styles={watch2Style}/>
                                    <ShoppingForm element="rolex daytona"       styles={watch3Style}/>
                                </>,"conditional rendering card components","conditional rendering card components description"
                            ]
                        ],
                        [
                            [
                                <Stopwatch/>,"Stopwatch","Stopwatch descriptoin"
                            ],
                            [
                                <ToDoList/>,"To Do List","to do desc"
                            ]
                        ],
                        [
                            [
                                <AccordionComponent info={accordionComponentInfo}/>,'accordion like List','accordion like List desc'
                            ],
                            [
                                <StarRating/>,"Star Rating", "xd"
                            ],
                            [
                                <AdvancedStarRating/>,"Advanced Star Rating","Xd"
                            ]
                        ],
                        [
                            [
                                <ApiDataGallery url={urlForGallery} limit={10}/>,'gallery from API data',"xd"
                            ],
                            [
                                <AutocompleteData/>,'display only filtered data',"xd"
                            ]
                        ],
                        [
                            [
                                <GithubUserFinder/>,'Github User Finder','xd'
                            ],
                            [
                                <ThemedComponent/>,'theme which remembers state after refresh','xd'
                            ],
                            [
                                <PopupComponent/>,'popup toggler','xd'
                            ]
                        ],
                        [
                            [
                                <TicTacToe/>,'Tic Tac Toe','xd' 
                            ],
                            [  
                                <TierList tiers={tiers} data={dataToBeTiered} label={`tier list`}/>,'Tier List' 
                            ]
                        ]
                        
                    ];


function ReactJS()
{
    
    let [displayProjectInfo,setDisplayProjectInfo] = useState();
    let [whereToDisplayInfo,setWhereToDisplayInfo] = useState();

    function handleShowDescription(y,q)
    {
        //y - index of wrapTogether
        //q - index of project in wrapTogether
        if(displayProjectInfo!=projectsData[y][q][2])
        {
            setDisplayProjectInfo(projectsData[y][q][2]);
        }
        setWhereToDisplayInfo(y);
        
    }
    return (<>
                <div className={style.reactJsProjectsContainer}>
                    {/* if the there is more than one component, and there is resizeable component we want to wrap those in single row
                    to prevent unknown behaviour if it start to overlap next components and move them unintentionally*/}
                    {projectsData.map((x,y)=>
                        <>
                            <div className={style.wrapTogether}>
                                {x.map((z,q)=>
                                    // <ProjectWrapper project={z[0]} description={z[1]}/>
                                    <div className={style.projectWrapper} onClick={()=>handleShowDescription(y,q)}>
                                        <div className={style.titleOfProjectContainer}>
                                            <h1 className={style.titleOfProject}>{z[1]}</h1>
                                        </div>
                                        <div className={style.project}>
                                            {z[0]}
                                        </div>
                                    </div>
                                )}
                            </div>{whereToDisplayInfo===y&&<Description text={displayProjectInfo}/>}
                        </>)}

                    {/* <div className={style.wrapTogether}>
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
                                                    </>} description='conditional rendering card components'/>
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
                        <ProjectWrapper project={<TicTacToe/>} description='Tic Tac Toe'/>
                        <ProjectWrapper project={<TierList tiers={tiers} data={dataToBeTiered} label={`tier list`}/>} description='Tier List'/>    
                    </div> */}
                    

                    
                </div>
            </>)
}
export default ReactJS;
