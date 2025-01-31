import style from './Clock.module.css'
import { useEffect,useState } from "react";
// import { useState } from "react"

function Clock()
{
    let [date,setDate] =useState(new Date());

    function formatTime(x)
    {
        let time="";
        
        if(x<10)
        {
            time+="0";
        }
       return time+=x.toString();
    }
    
    
    function updateClock()
    {
        setDate(new Date());
    }

    useEffect(()=>
        {
            const myInterval = setInterval(updateClock,1000);
            return () => clearInterval(myInterval);
            
        });
    return (<>
                <div id={style.clockContainer}>
                    <h1>{formatTime(date.getHours())}:{formatTime(date.getMinutes())}:{formatTime(date.getSeconds())}</h1>
                </div>
           </>)
}

export default Clock