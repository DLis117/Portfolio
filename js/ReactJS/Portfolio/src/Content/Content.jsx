import style from './Content.module.css'
import Header from '../Header/Header';
import WelcomePage from '../WelcomePage/WelcomePage';
import NavBar from '../NavBar/NavBar';
function Content()
{
    return (<>
                <div className={style.content}>
                    {/* <Header/> */}
                    <NavBar/>
                    <WelcomePage/>
                </div>
            </>)
}
export default Content;