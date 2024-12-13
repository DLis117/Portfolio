import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

function Stopwatch()
{
    let intrvl=1;
    let timerStartedRef=useRef(false);
    let [time,setTime]=useState(0);

    let intervalRef=useRef(null);

    function formatTime()
    {
        let hours=String(Math.floor(time/3600)).padStart(2,"0");
        let minutes=String(Math.floor((time%3600)/60)).padStart(2,"0");
        let seconds=String(Math.floor((time%3600)%60)).padStart(2,"0");
        return(`${hours}:${minutes}:${seconds}`);
    }
    function runTime()
    {
            setTime(prevT=>prevT+intrvl)
    }
    function start()
    {
        if(timerStartedRef.current==false)
        {
            timerStartedRef.current=true;
            intervalRef.current = setInterval(runTime,intrvl);
        }
        
    }
    function stop()
    {   
        if(timerStartedRef.current==true)
        {
            timerStartedRef.current=false;
            clearInterval(intervalRef.current);
        }
    }
    
    function reset()
    {
        stop();
        setTime(0);
    }

    useEffect(()=>{
            
        console.log("item rerendered");
        return ()=> clearInterval(intervalRef.current);
    },[])

    return(<div className="stopwatch-box">
            <div className="stopwatch-half">
                <h1 className="timer">{formatTime()}</h1>
            </div>
            <div className="stopwatch-half">
                <div className="button-container">
                    <button onClick={start} className="start">start</button>
                    <button onClick={stop} className="stop">stop</button>
                    <button onClick={reset} className="reset">reset</button>
                </div>
            </div>
           </div>)
}
export default Stopwatch;