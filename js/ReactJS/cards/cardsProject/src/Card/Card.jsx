import styles from  '../Card/Card.module.css';

function CardComponent(props)
{

    return(<div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={props.pic}/>
            </div>
            <div className={styles.descriptionContainer}>
                <p>{props.desc}</p>
            </div>
            <div className={styles.nameContainer}>
                <h1>{props.name}</h1>
            </div>
        </div>);
}

CardComponent.defaultProps=
{
    name:'noname',
    desc: 'nodesc',
}

export default CardComponent;