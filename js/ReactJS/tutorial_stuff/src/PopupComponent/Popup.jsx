import style from '/src/PopupComponent/PopupComponent.module.css'
function Popup(props)
{
    return (<>
                <div className={style.popupContainer}>
                    <div className={style.popup}>
                        <header>
                            <span onClick={props.onClose}>x</span>
                        </header>
                        <h1>{props.info}</h1>
                    </div>
                </div>
    </>)
}
export default Popup;