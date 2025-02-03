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
                                </>,'Card Components',
                                <div className={style.description}>
                                    <p>This component demonstrates the use of props, allowing it to be rendered multiple times with different sets of data. Additionally, it utilizes prop-types to ensure that the provided data adheres to the correct data types and defaultProps to handle cases where data is missing.</p>
                                    <br/>
                                    <h1>Key Features</h1>
                                    <ul>
                                        <li><span>Props: </span> Enables rendering the same component multiple times while displaying unique content for each instance.</li>
                                        <li><span>Prop-Types: </span> Validates incoming data, ensuring type safety and reducing potential errors.</li>
                                        <li><span>DefaultProps: </span>Provides fallback values when certain props are not supplied, ensuring the component remains functional even with incomplete data.</li>
                                    </ul>

                                </div>
                            ],
                            [
                                <Counter/>,"Counter",
                                <div className={style.description}>
                                    <p>This component demonstrates the use of state variables, the useState hook, and functional updates, along with onClick event handlers for managing user interactions.</p>
                                    <br/>
                                    <h1>Key Features</h1>
                                    <ul>
                                        <li><span>State Management: </span>Utilizes the useState hook to store and update component state dynamically.</li>
                                        <li><span>Functional Updates: </span>Implements functional updates to ensure state changes are correctly applied, particularly when relying on previous state values.</li>
                                        <li><span>Event Handling: </span>Uses onClick event handlers to trigger state updates in response to user interactions.</li>
                                    </ul>
                                </div>
                            ],
                            [
                                <Clock/>,"Clock",
                                <div className={style.description}>
                                    <p>This component demonstrates the use of the useEffect hook in combination with interval handling to display a real-time clock.</p>
                                    <br/>
                                    <h1>Key Features</h1>
                                    <ul>
                                        <li><span>Real-Time Updates: </span>Utilizes the useEffect hook to set up an interval that updates the clock at regular intervals.</li>
                                        <li><span>Interval Management: </span>Ensures efficient handling of time updates by correctly setting and clearing intervals to prevent memory leaks.</li>
                                        <li><span>Dynamic Rendering: </span>The displayed time updates in real-time, providing an accurate and continuously running clock.</li>
                                    </ul>
                                </div>
                            ]
                        ],
                        [//this will be wrapped together
                            [//elements of this project, its title, its description 
                                <>
                                    <ShoppingForm element="omega constelation"  styles={watch1Style}/>
                                    <ShoppingForm element="omega speedmaster"   styles={watch2Style}/>
                                    <ShoppingForm element="rolex daytona"       styles={watch3Style}/>
                                </>,"conditional rendering card components",
                                <div className={style.description}>
                                    <p>This component utilizes conditional rendering and onChange event handlers within input fields to manage user interactions dynamically.<br/>This component imitates list of products on a shopping site. It enables to chose amount of product, fill delivery and payment data, and submit an order so it can be processed by a shop.</p>
                                    <br />
                                    <h1>Functionality</h1>
                                    <ul>
                                        <li><span>Product Selection: </span>Users can select the desired quantity of a product.
                                        </li>
                                        <li><span>elivery & Payment Details: </span>Input fields allow users to provide necessary delivery and payment information.</li>
                                        <li><span>Order Submission: </span>Once all required fields are filled, the user can submit the order for processing by the shop.</li>
                                    </ul>
                                    <br />
                                    <h1>Behavior & Interaction</h1>
                                    <ul>
                                        <li>The component dynamically updates based on user input, ensuring a seamless and interactive shopping experience.</li>
                                        <li>Conditional rendering ensures that only relevant fields are displayed at each stage of the order process.</li>
                                    </ul>
                                    <br />
                                    <p>This approach creates an intuitive and user-friendly product ordering interface, similar to those found on e-commerce websites.</p>
                                </div>
                            ]
                        ],
                        [
                            [
                                <Stopwatch/>,"Stopwatch",
                                <div className={style.description}>
                                    <p>This component serves as an example of using the useRef hook for managing intervals, enabling the functionality of a stopwatch.</p>
                                    <br />
                                    <h1>Key Features</h1>
                                    <ul>
                                        <li><span>Interval Toggling: </span>Utilizes useRef to store and control the interval without triggering unnecessary re-renders.</li>
                                        <li><span>Stopwatch Functionality: </span>Provides three buttons to control the timer:</li>
                                        <ul>
                                            <li><span>Start: </span>Begins counting time.</li>
                                            <li><span>Stop: </span>Pauses the counter.</li>
                                            <li><span>Reset: </span>Resets the counter to its initial state.</li>
                                        </ul>
                                        <li><span>Efficient State Management: </span>Ensures that the stopwatch runs smoothly while preventing performance issues by properly handling intervals.</li>
                                    </ul>
                                </div>
                            ],
                            [
                                <ToDoList/>,"To Do List",
                                <div className={style.description}>
                                    <p>This component represents a classic to-do list application that enables users to manage a list of tasks by adding and deleting items dynamically.</p>
                                    <br />
                                    <h1>Key Features</h1>
                                    <ul>
                                        <li><span>State Management: </span>Utilizes useState to maintain an up-to-date list of tasks.</li>
                                        <li><span>Adding Tasks: </span>Users can input and add new tasks to the list.</li>
                                        <li><span>Deleting Tasks: </span>Each task can be removed individually, allowing for efficient task management.</li>
                                        <li><span>Dynamic Rendering: </span>The list updates in real-time as tasks are added or removed, ensuring a seamless user experience.</li>
                                    </ul>
                                </div>
                            ]
                        ],
                        [
                            [
                                <AccordionComponent info={accordionComponentInfo}/>,'accordion like List',
                                <div className={style.description}>
                                    <p>This component allows users to control the visibility of selected elements with two distinct modes:</p>
                                    <br/>
                                    <ul>
                                        <li>
                                            <span>Single Selection Mode –</span> Only the most recently clicked element remains visible, while all others are hidden.
                                        </li>
                                        <li>
                                            <span>Multi-Selection Mode –</span> All clicked elements remain visible, allowing multiple selections to be remembered simultaneously.
                                        </li>
                                    </ul>
                                </div>
                            ],
                            [
                                <StarRating/>,"Star Rating",
                                <div className={style.description}>
                                    <p>This component leverages onClick, onMouseOver, and onMouseLeave event handlers to dynamically update the visual representation of its elements. When a star is selected, all preceding stars are also marked as filled, while the remaining stars remain unfilled, typically represented by a white color. The colors for both filled and unfilled stars can be customized through the component's configuration settings.<br/><br/>During user interaction, hovering over the stars temporarily updates their appearance to reflect the current hover position. However, once the mouse leaves the component, the stars revert to their previously saved state unless a new selection is made. Additionally, the total number of stars is configurable, allowing for customization based on different rating scales.</p>
                                </div>
                            ],
                            [
                                <AdvancedStarRating/>,"Advanced Star Rating",
                                <div className={style.description}>
                                    <p>Similar to the Star Rating component, this component incorporates the same fundamental features while employing a more advanced approach. One key improvement is the ability to define the maximum rating independently from the number of stars displayed. Unlike the Star Rating component, where the number of stars directly corresponded to the maximum rating, this version allows for flexible customization of the rating scale.</p>
                                    <br/>
                                    <h1>Star Fill Calculation</h1>
                                    <p>The star fill level is determined based on the mouse position within the component:</p>
                                    <ul>
                                        <li>Since the exact position and width of each star are known, the component can track how far the mouse has moved within its boundaries.</li>
                                        <li>Using this data, the number of fully filled stars is calculated, along with the percentage fill of a partially filled star, if applicable.</li>
                                        <li>A flag is set if a partially filled star is detected. If this occurs, all subsequent stars remain in an empty state.<br/></li>
                                    </ul>
                                    <br/>
                                    <h1>Handling Edge Cases</h1>
                                    <p>One minor issue with this approach arises from the method used to calculate star fill percentage based on the mouse position. This makes it difficult to accurately set the rating to its minimum (0) or maximum value.<br/>To resolve this, the star container is wrapped within a parent component. The component then detects if the mouse moves slightly beyond the boundaries of the star container (both before and after it). If the cursor extends into these areas, the computed rating might initially fall below 0 or exceed the maximum value. However, a simple function trims these values, ensuring the final rating remains within the valid range of 0 to the maximum rating.</p>
                                </div>
                            ]
                        ],
                        [
                            [
                                <ApiDataGallery url={urlForGallery} limit={10}/>,'gallery from API data',
                                <div className={style.description}>
                                    <p>This component is designed to fetch data from an API and use it to generate a photo gallery with a slider effect.</p>
                                    <br/>
                                    <h1>Functionality</h1>
                                    <ul>
                                        <li><span>Navigation: </span>Users can switch between photos using previous and next buttons.</li>
                                        <li><span>Interactive Indicators: </span>Dots at the bottom indicate the current photo position. Clicking on a dot navigates directly to the corresponding photo.</li>
                                        <br/>
                                        <li>
                                            Data Fetching & Persistence:
                                            <ul>
                                                <li>If the user exceeds the last photo, the URL is updated, and new data is fetched from the API.</li>
                                                <li>The component retains the previously viewed photo index, ensuring the user remains on the same photo after fetching new data.</li>
                                            </ul>
                                        </li>
                                        <li><span>Customizable Photo Count: </span>The number of photos loaded can be adjusted as needed.</li>
                                    </ul>
                                    <br/>
                                    <h1>Implementation Details:</h1>
                                    <ul>
                                        <li>Photos are aligned horizontally and transitioned using the translateX CSS property to create a smooth sliding effect.</li>
                                        <li>Photos that exceed the viewport are hidden using overflow: hidden in the parent container.</li>
                                        <li>A loading animation is displayed while data is being fetched to enhance user experience.</li>
                                        <li><span>Optimized Image Rendering: </span>Since high-resolution photos can impact performance, the component modifies the API request URL to fetch images at a specified size. This size is easily configurable based on requirements.</li>
                                    </ul>
                                </div>
                            ],
                            [
                                <AutocompleteData/>,'display only filtered data',
                                <div className={style.description}>
                                    <p>This component displays only filtered data, allowing users to dynamically search through a dataset and view matching results in real-time.</p>
                                    <br />
                                    <h1>Key Features</h1>
                                    <ul>
                                        <li><span>Dynamic Filtering: </span>The filtering process occurs instantly as the user types, providing immediate feedback.</li>
                                        <li><span>Real-Time Search: </span>Ensures that only relevant results are rendered, improving usability and performance.</li>
                                    </ul>
                                    <br />
                                    <p>This implementation demonstrates efficient state management and real-time filtering, making it a practical example of interactive search functionality.</p>
                                </div>
                            ]
                        ],
                        [
                            [
                                <GithubUserFinder/>,'Github User Finder',
                                <div className={style.description}>
                                    <p>This component fetches and displays GitHub user data by querying the GitHub API based on a provided username.</p>
                                    <br />
                                    <h1>Functionality</h1>
                                    <ul>
                                        <li><span>User Search: </span>The user enters a GitHub username in the search bar and initiates a search by clicking the 🔎 button or pressing the Enter key.</li>
                                        <li><span>API Request: </span>The component fetches data from the GitHub API using the provided username.</li>
                                    </ul>
                                    <br />
                                    <h1>Key Features</h1>
                                    <ul>
                                        <li><span>User Found: </span>If the user exists, the component displays username, profile picture, number of public repositiories, account creation date, user id</li>
                                        <li><span>User Not Found: </span>If the username does not exist, a specific message is displayed.</li>
                                        <li><span>Error Handling: </span>Any errors encountered during the API request (e.g., network issues) are also displayed to the user.</li>
                                    </ul>
                                </div>
                            ],
                            [
                                <ThemedComponent/>,'theme which remembers state after refresh',
                                <div className={style.description}>
                                    <p>This component retains its state persistently, even after a page refresh, by utilizing a custom hook (useLocalStorage).<br/> It provides a theme toggle functionality that allows users to switch between light and dark modes.</p>
                                    <br />
                                    <h1>Key Features</h1>
                                    <ul>
                                        <li><span>Persistent State: </span>The selected theme is stored in local storage, ensuring that the preference is maintained across page reloads.</li>
                                        <li><span>Theme Toggle: </span>A button allows users to seamlessly switch between light and dark themes.</li>
                                        <li><span>Custom Hook Integration: </span>Uses useLocalStorage to handle reading and updating the theme state efficiently.</li>
                                    </ul>
                                </div>
                            ],
                            [
                                <PopupComponent/>,'popup toggler',
                                <div className={style.description}>
                                    <p>This component features a button that allows users to enable or disable a recurring popup notification.</p>
                                    <br />
                                    <h1>Functionality</h1>
                                    <ul>
                                        <li>The popup is displayed at set intervals (adjustable via configuration).</li>
                                        <li>After closing the popup, it will reappear after the defined interval unless disabled.</li>
                                        <li>Clicking the disable button stops the popup from appearing by clearing the interval.</li>
                                        <li>The popup content can be customized via props, allowing for flexible messaging.</li>
                                    </ul>
                                </div>
                            ]
                        ],
                        [
                            [
                                <TicTacToe/>,'Tic Tac Toe',
                                <div className={style.description}>
                                    <p>This component implements a Tic-Tac-Toe game consisting of a 3×3 grid.</p>
                                    <br />
                                    <h1>Game Mechanics</h1>
                                    <ul>
                                        <li>Each tile can be clicked to place a mark (X or O), but once selected, it becomes disabled until the game is reset.</li>
                                        <li>After each move, the program checks for a winning pattern.</li>
                                        <li>If a winning pattern is detected, the winner's name is displayed, and the winning tiles are highlighted in red.</li>
                                        <li>If all tiles are filled without a winning pattern, the game declares a Tie.</li>
                                        <li>At the end of the game, a reset button appears, allowing users to start a new round.</li>
                                    </ul>
                                </div>
                            ],
                            [  
                                <TierList tiers={tiers} data={dataToBeTiered} label={`tier list`}/>,"Tier List",
                                <div className={style.description}>
                                    <p>This component provides a customizable tier list where the title and tier data can be set via props. It supports dynamic scaling, drag-and-drop functionality, and automatic resizing based on content.</p>
                                    <br />
                                    <h1>Layout & Sizing</h1>
                                    <ul>
                                        <li>The height of each tier is determined by the total height of the tier list divided by the number of tiers.</li>
                                        <li>Font size within each tier is dynamically adjusted to fit its respective section.</li>
                                        <li>Tiered images are resized proportionally, ensuring their height and width scale according to the number of tiers.</li>
                                        <li>Tiers automatically expand in height when more images are added.</li>
                                    </ul>
                                    <br />
                                    <h1>Drag & Drop Functionality</h1>
                                    <p>The component supports a drag-and-drop mechanism, implemented using onMouseDown, onMouseMove, and onMouseUp event handlers:</p>
                                    <ul>
                                        <li>When an item is dragged, it is removed from its current tier and converted into a draggable object.</li>
                                        <li>The system determines the current tier by tracking the mouse position at the start of the drag and comparing it with the coordinates of each tier.</li>
                                        <li>As the item is moved, a <span>ghost indicator</span> appears above the tier it is currently hovering over, showing where the item will be placed if dropped.</li>
                                        <li>When the item is dropped, it is assigned to the appropriate tier, and both the ghost indicator and draggable object disappear.</li>
                                        <li>If the item is dropped outside the tiers, it is placed into the untiered data section.</li>
                                    </ul>

                                    <br />
                                    <h1>Initial State & Dynamic Updates</h1>
                                    <ul>
                                        <li>At the start, all items are stored in the untiered data section.</li>
                                        <li>As users interact with the tier list, items can be dragged, dropped, and reordered dynamically.</li>
                                    </ul>
                                </div>
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
                    <div className={style.reactJsProjectsContainerHeaderContainer}>Click on a specific application to read it's description</div>
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
                            </div>{whereToDisplayInfo===y&&<Description info={displayProjectInfo}/>}
                        </>)}
                </div>
            </>)
}
export default ReactJS;
