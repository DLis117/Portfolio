import style from './WelcomePage.module.css'
function WelcomePage()
{
    return (<>
                <div className={style.WelcomePageContainer}>
                    <h1>Hi, I'm Dominik</h1>
                    <h2>and this is my portfolio</h2>
                    <button>Read more</button>
                    <button>🎉 time!</button>
                    <div className={style.DownArrowContainer}>
                        <h3>⇩</h3>
                    </div>

                </div>
            </>)
}
export default WelcomePage;