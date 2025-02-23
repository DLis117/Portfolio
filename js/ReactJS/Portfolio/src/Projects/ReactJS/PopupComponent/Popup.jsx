import style from './PopupComponent.module.css'
function Popup(props)
{
    return (<>
                
                    <div className={style.popup} >
                        <header>
                            <span onClick={props.onClose}>x</span>
                        </header>
                        <div className={style.infoContainer}>
                            <h1>{props.info}</h1>
                        </div>
                        
                    </div>
    </>)
}
export default Popup;