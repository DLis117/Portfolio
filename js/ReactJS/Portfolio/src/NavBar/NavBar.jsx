import style from './NavBar.module.css'
function NavBar()
{
    return (<>
                <div className={style.navBar}>
                    <h1>Home</h1>
                    <h1>About</h1>
                    <h1>stuff</h1>
                    <h1>next</h1>
                </div>
    </>)
}
export default NavBar;