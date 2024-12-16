import { useState } from 'react';
import style from '/src/StarRating/StarRating.module.css'
function StarRating()
{
    const howManyStars=5;

    const [rating,setRating]=useState(Array.from({ length: howManyStars }, () => ({x:'★',clicked:false})));
    const [overallRating,setOverallRaing]=useState(0);

    function handleRating(indx)
    {
        let newRating=[...rating];
        newRating.map((x,y)=>y<=indx?x.clicked=true:x.clicked=false);
        setRating(newRating);
        setOverallRaing(indx+1);
    }
    
    return (
            <>
                <div className={style.starRatingContainer}>
                    {
                        rating.map((x,y)=>x.clicked===true?
                        <p onClick={()=>handleRating(y)} className={style.yellowStar} key={y}>{x.x}</p>
                        :<p onClick={()=>handleRating(y)} className={style.blackStar} key={y}>{x.x}</p>)
                    }
                    <h2>overall rating: {overallRating}/{howManyStars}</h2>
                </div>
                
            </>)
}
export default StarRating;