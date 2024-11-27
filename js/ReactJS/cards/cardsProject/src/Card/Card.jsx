import styles from  '../Card/Card.module.css';
function CardComponent()
{
    return(<div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src='/mountain.png'/>
            </div>
            <div className={styles.descriptionContainer}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec tempor nulla. Cras et purus sit </p>
            </div>
            <div className={styles.nameContainer}>
                <h1>lorem ipsum</h1>
            </div>
        </div>)
}
export default CardComponent;