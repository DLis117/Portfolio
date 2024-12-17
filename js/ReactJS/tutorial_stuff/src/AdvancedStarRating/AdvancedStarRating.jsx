import { useState } from 'react';
import style from '/src/AdvancedStarRating/AdvancedStarRating.module.css'
function AdvancedStarRating()
{
    const howManyStars=5;
    let maxRating = 100;
    
    const [rating,setRating]=useState(Array.from({ length: howManyStars }, () => ({x:'★',status: "empty",style:{color: 'white'}})));
    const [realRating,setRealRating]=useState(0);

    let arr=[]

    function commonEvent(indx)
    {
        
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

        //if the star is partially filled, we need to calculate percentage of the fill
        let divider=maxRating/howManyStars;
        
        //flag which tells if we found partially filled star. If so, we know that rest of stars is empty 
        let rest=false;

        //an array to store new rating
        arr=[]
        
        for(let i=1;i<=howManyStars;++i)
        {
            if(rest)
            {
                arr.push({x:'★',status: "empty",style:{color: 'white'}});
            }
            else
            {
                if(((i*divider))<=score)
                {
                    arr.push({x:'★',status: "full",style:{color: 'yellow'}});
                }
                else
                {
                    rest=true;
                    arr.push({x:'★',status: "partial", style:{background: `linear-gradient(to left, white ${100-((score-(divider*(i-1)))*100/divider)}%, yellow ${(score-(divider*(i-1)))*100/divider}%) text`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"}});
                }
            }
        }
        // updating the rating, but dont update the value realRating
        setRating(arr);

        //displaying rating in the UI
        displayStars();
        return score;
    }
    function handleLeaveonRating()
    {
        let score=realRating;
        //based on realRating value calculate and display stars in the UI
        let divider=maxRating/howManyStars;
        
        //flag which tells if we found partially filled star. If so, we know that rest of stars is empty 
        let rest=false;

        //an array to store new rating
        arr=[]
        
        for(let i=1;i<=howManyStars;++i)
        {
            if(rest)
            {
                arr.push({x:'★',status: "empty",style:{color: 'white'}});
            }
            else
            {
                if(((i*divider))<=score)
                {
                    arr.push({x:'★',status: "full",style:{color: 'yellow'}});
                }
                else
                {
                    rest=true;
                    arr.push({x:'★',status: "partial", style:{background: `linear-gradient(to left, white ${100-((score-(divider*(i-1)))*100/divider)}%, yellow ${(score-(divider*(i-1)))*100/divider}%) text`,
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
    
    return (
            <>
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