import MenuItem from "./MenuItem";
import style from '/src/RecursiveNavBar/RecursiveNavBar.module.css'
function MenuList(props) {
    return (
        <ul className={style.menuList}>
            {props.data.map((child) =><MenuItem key={child.id} data={child} />)}
        </ul>
    );
}

export default MenuList;

