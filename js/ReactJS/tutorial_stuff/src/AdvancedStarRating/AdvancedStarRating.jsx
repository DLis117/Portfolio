import { useState } from 'react';
import style from '/src/AdvancedStarRating/AdvancedStarRating.module.css'
function AdvancedStarRating()
{
    const howManyStars=5;
    let maxRating = 100;
    let emptyStarColor='white';
    let fullStarColor="yellow";
    
    const [rating,setRating]=useState(Array.from({ length: howManyStars }, () => ({x:'★',status: "empty",style:{color: emptyStarColor}})));
    const [realRating,setRealRating]=useState(0);

    let arr=[]

    function commonEvent(s) //score
    {
        let divider=maxRating/howManyStars;
        
        //flag which tells if we found partially filled star. If so, we know that rest of stars is empty 
        let rest=false;

        //an array to store new rating
        arr=[]
        
        for(let i=1;i<=howManyStars;++i)
        {
            if(rest)
            {
                arr.push({x:'★',status: "empty",style:{color: emptyStarColor}});
            }
            else
            {
                if(((i*divider))<=s)
                {
                    arr.push({x:'★',status: "full",style:{color: fullStarColor}});
                }
                else
                {
                    rest=true;
                    arr.push({x:'★',status: "partial", style:{background: `linear-gradient(to left, ${emptyStarColor} ${100-((s-(divider*(i-1)))*100/divider)}%, ${fullStarColor} ${(s-(divider*(i-1)))*100/divider}%) text`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"}});
                }
            }
        }
        // updating the rating, but dont update the value realRating
        setRating(arr);

        //displaying rating in the UI
        displayStars();
    }
    function handleRealRating(e)
    {
        //set new realRating value (handleHOverOnRating returns the score value)
        setRealRating(handleHoveronRating(e));
    }
    function displayStars()
    {
        return rating.map((x,y)=><p key={y} style={x.style}>{x.x}</p>)
    }
    function handleHoveronRating(e)
    {
        //div containing stars
        let element = document.getElementsByClassName(style.starsContainer)[0].getBoundingClientRect();

        // x postition of div with stars 
        let positionX=element.x;    

        // width of div with stars 
        let width = element.width;  
        
        //score calculated based on mouse position on the div with stars
        let score=(Math.round((e.clientX-positionX)/width*maxRating))
        if(score<0)
        {
            score=0;
        }

        commonEvent(score);
        
        return score;
    }
    function handleLeaveonRating()
    {
        //based on realRating value calculate and display stars in the UI
        commonEvent(realRating);
    }
    
    return (<>
                <div className={style.starRatingContainer}>
                    {
                        <div className={style.starsContainer} onClick={handleRealRating} onMouseMove={handleHoveronRating} onMouseLeave={handleLeaveonRating}> 
                            {displayStars()}
                        </div>
                    }
                    <h2>overall rating: {realRating}/{maxRating}</h2>
                </div>
            </>)
}
export default AdvancedStarRating;