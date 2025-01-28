import style from './Header.module.css'
import ContrastIcon from '../ContrastIcon/ContrastIcon';
function Header()
{
    return (<>
                <header className={style.mainHeader}>
                    <ContrastIcon/>
                </header>
            </>)
}
export default Header;