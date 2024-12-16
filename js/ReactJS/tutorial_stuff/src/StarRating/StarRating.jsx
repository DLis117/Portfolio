import { useState } from 'react';
import style from '/src/StarRating/StarRating.module.css'
function StarRating()
{
    const howManyStars=5;

    const [rating,setRating]=useState(Array.from({ length: howManyStars }, () => ({x:'★',clicked:false})));
    const [overallRating,setOverallRating]=useState(0);
    const [clickedStarsAmount,setClickedStarsAmount]=useState(0);

    function commonEvent(indx)
    {
        let newRating=[...rating];
        newRating.map((x,y)=>y<=indx?x.clicked=true:x.clicked=false);
        setRating(newRating);
    }
    function handleRating(indx)
    {
        commonEvent(indx);
        setOverallRating(indx+1);
        setClickedStarsAmount(indx+1);
    }
    function handleHoveronRating(indx)
    {
        commonEvent(indx);
    }
    function handleLeaveonRating()
    {
        let newRating=[...rating];
        newRating.map((x,y)=>y<=clickedStarsAmount-1?x.clicked=true:x.clicked=false);
        setRating(newRating);
    }
    
    return (
            <>
                <div className={style.starRatingContainer}>
                    {
                        rating.map((x,y)=><p onClick={()=>handleRating(y)} onMouseOver={()=>handleHoveronRating(y)} onMouseLeave={handleLeaveonRating} className={x.clicked?style.yellowStar:style.blackStar} key={y}>{x.x}</p>)
                    }
                    <h2>overall rating: {overallRating}/{howManyStars}</h2>
                </div>
                
            </>)
}
export default StarRating;