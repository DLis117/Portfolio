import style from './Description.module.css'
function Description(props)
{
    return( <>
                <div className={style.descriptionContainer}>
                    <div className={style.description}>
                        <p>{props.text}</p>
                    </div>
                </div>
            </>)
}
export default Description;