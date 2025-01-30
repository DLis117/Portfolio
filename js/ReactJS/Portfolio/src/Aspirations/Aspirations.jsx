import style from "./Aspirations.module.css"
import ProgressBar from "../ProgressBar/ProgressBar";
function Aspirations()
{
    let progressData=[  
        {item: 'start',started: true,finished: true},
        {item: 'React.js',started: true,finished: false},
        {item: 'React_Native',started: false,finished: false},
        {item: 'Node.js',started: false,finished: false},
        {item: 'IoT/embedded',started: false,finished: false},
        {item: 'and more...',started: false,finished: false},
    ];
    

    return( <>
                <div className={style.AspirationsPage}>
                            <h1 className={style.quote}>
                                Life is an art of choice. To discover true passion, one must explore different paths. ✨
                            </h1>
                            <h2>
                                That’s why I have decided to take a new direction and become a developer. 
                                <br/><br/>
                                In the future, I aim to combine web and mobile development with embedded systems—building the IoT hardware, programming it, and creating both a mobile app and a website to complement it.
                                <br/><br/>
                                To begin my journey, I have chosen to start with React.js for front-end web development. Next, I will expand into React Native for mobile development, followed by Node.js for both. Meanwhile, I am also learning embedded systems.
                            </h2>
                            <h3>
                                <ProgressBar data={progressData} indicatorLeftMargin={295}/>
                            </h3>
                </div>
            </>)
}
export default Aspirations;