import { useState } from 'react';
import style from './AdvancedStarRating.module.css'
function AdvancedStarRating()
{
    const howManyStars=5;
    let maxRating = 100;
    let emptyStarColor='white';
    let fullStarColor="yellow";
    
    const [rating,setRating]=useState(Array.from({ length: howManyStars }, () => ({x:'★',style:{color: emptyStarColor}})));
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
                if(((i*divider))<=s)
                {
                    arr.push({x:'★',style:{color: fullStarColor}});
                }
                else
                {
                    let rigthVal = (s-(divider*(i-1)))*100/divider;
                    let leftVal = 100-rigthVal;
    
                    if(leftVal>=100||rest===true)
                    {
                        arr.push({x:'★',style:{color: emptyStarColor}});
                    }
                    else
                    {
                        arr.push({x:'★',style:{background: `linear-gradient(to left, ${emptyStarColor} ${leftVal}%, ${fullStarColor} ${rigthVal}%) text`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"}});
                        rest=true;
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
        return rating.map((x,y)=><p className={style.singleStar} key={y} style={x.style}>{x.x}</p>)
    }
    function handleHoveronRating(e)
    {
        //div containing stars
        let element = document.getElementsByClassName(style.starsContainer)[0].getBoundingClientRect();

        // x postition of div with stars 
        let positionX=element.x;    

        // width of div with stars 
        let width = element.width;  

        let score=(Math.round((e.clientX-positionX)/width*maxRating))

        //to make it possible to score maxRating instead of maxRating-1 (due to positioning mouse out of the frame)
        //we took into consideration not the div with stars but its parent div 
        //so if we go beyond div with stars it will let us click 0 or maxRating score
        //but if we go beyond it would give us negative or score>maxRating
        //thats why we have to correct it here 
        if(score>maxRating)
        {
            score=maxRating;
        }
        else if(score<0)
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
                <div className={style.starRatingContainer} onClick={handleRealRating} onMouseMove={handleHoveronRating} onMouseLeave={handleLeaveonRating}>
                    {
                        <div className={style.starsContainer}> 
                            {displayStars()}
                        </div>
                    }
                    <h2 className={style.overallRating}>overall rating: {realRating}/{maxRating}</h2>
                </div>
            </>)
}
export default AdvancedStarRating;