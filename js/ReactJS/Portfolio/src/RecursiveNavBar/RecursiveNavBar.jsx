import MenuList from "./MenuList";
import style from '/src/RecursiveNavBar/RecursiveNavBar.module.css'
function RecursiveNavBar(props) {
    return (
        <div className={style.navBarMain}>
            <div className={style.NavBarContainer}>
                <MenuList data={props.data}/>
            </div>
        </div>
    );
}

export default RecursiveNavBar;


