import style from './WelcomePage.module.css'
import ConfettiComponent from './ConfettiComponent';
import AboutMe from '../AboutMe/AboutMe';
function WelcomePage(props)
{
    return (<>
                <div className={style.WelcomePageContainer}>
                    <h1>Hi, I'm Dominik</h1>
                    <h2>and this is my portfolio</h2>
                    <div className={style.buttonsContainer}>
                        <button onClick={()=>{props.setPage(<AboutMe/>)}}>Proffesional Background</button>
                        <ConfettiComponent/>
                    </div>
                    {/* <div className={style.DownArrowContainer}>
                        <h3>⇩</h3>
                    </div> */}
                    
                </div>
            </>)
}
export default WelcomePage;