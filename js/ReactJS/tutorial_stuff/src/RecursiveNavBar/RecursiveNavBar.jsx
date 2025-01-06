import MenuList from "./MenuList";
import style from '/src/RecursiveNavBar/RecursiveNavBar.module.css'
function RecursiveNavBar(props) {
    return (
        <div className={style.NavBarContainer}>
            <MenuList data={props.data}/>
        </div>
    );
}

export default RecursiveNavBar;


