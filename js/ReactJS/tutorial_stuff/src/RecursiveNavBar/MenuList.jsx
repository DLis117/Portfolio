import MenuItem from "./MenuItem";
import style from '/src/RecursiveNavBar/RecursiveNavBar.module.css'
function MenuList(props) {
    return (
        <ul className={style.menuList}>
            {/* {props.data.map((child) => (child.children?.length>0)&&(<MenuItem key={child.id} data={child} />))} */}
            {/*TU JUZ NIE SPRAWDZAJ CZY MA DZIECI TYLKO JAZDA! */}
            {props.data.map((child) =><MenuItem key={child.id} data={child} />)}
        </ul>
    );
}

export default MenuList;

