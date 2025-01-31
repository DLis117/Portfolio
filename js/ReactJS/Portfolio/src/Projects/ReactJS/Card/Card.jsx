import styles from  '../Card/Card.module.css';
import propTypes from 'prop-types';

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
                    <h1>id: {props.id}</h1>
                </div>
            </div>);
}

//check if types of props are correct
CardComponent.propTypes=
{
    name: propTypes.string,
    desc: propTypes.string,
    pic: propTypes.string,
    id: propTypes.number
}

CardComponent.defaultProps=
{
    name:'card without a name',
    desc: 'description not available',
    pic: '/default.png',
    id: '?',
}

export default CardComponent;