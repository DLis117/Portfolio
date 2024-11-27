import './Card.css'
function CardComponent()
{
    return(<div className="card">
            <div className='imageContainer'>
                <img src='../public/mountain.png'/>
            </div>
            <div className='descriptionContainer'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec tempor nulla. Cras et purus sit </p>
            </div>
            <div className='nameContainer'>
                <h1>lorem ipsum</h1>
            </div>
        </div>)
}
export default CardComponent;