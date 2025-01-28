import style from './Content.module.css'
import Header from '../Header/Header';
import WelcomePage from '../WelcomePage/WelcomePage';
function Content()
{
    return (<>
                <div className={style.content}>
                    <Header/>
                    <WelcomePage/>
                </div>
            </>)
}
export default Content;