import MenuList from "./MenuList";
function MenuItem(props)
{
    return (
        <li>
            <p>{props.data.label}</p>
            {(props.data.children?.length>0)&&<MenuList data={props.data.children}/>}
        </li>
    );
}

export default MenuItem;