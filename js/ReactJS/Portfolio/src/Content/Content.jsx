import style from './Content.module.css'
import WelcomePage from '../WelcomePage/WelcomePage';
import AboutMe from '../AboutMe/AboutMe';
import Aspirations from  "../Aspirations/Aspirations";
import Projects from '../Projects/Projects';
function Content()
{
    return (<>
                <div className={style.content}>
                    {/* <WelcomePage/> */}
                    {/* <AboutMe/> */}
                    {/* <Aspirations/> */}
                    <Projects/>
                </div>
            </>)
}
export default Content;