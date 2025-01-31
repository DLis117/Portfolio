import style from './WelcomePage.module.css'
import ConfettiComponent from './ConfettiComponent';
function WelcomePage()
{
    return (<>
                <div className={style.WelcomePageContainer}>
                    <h1>Hi, I'm Dominik</h1>
                    <h2>and this is my portfolio</h2>
                    <div className={style.buttonsContainer}>
                        <button>Proffesional Background</button>
                        <ConfettiComponent/>
                    </div>
                    {/* <div className={style.DownArrowContainer}>
                        <h3>⇩</h3>
                    </div> */}
                    
                </div>
            </>)
}
export default WelcomePage;