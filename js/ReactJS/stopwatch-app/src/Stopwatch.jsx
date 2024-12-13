import { useEffect } from "react";
import { useState } from "react";

function Stopwatch()
{
    let intrvl=1;
    let [timerStarted,setTimerStarted]=useState(false);
    let [timeHolder,setTimeHolder]=useState("00:00:00");
    let [time,setTime]=useState(0);

    function runTime()
    {
        if(timerStarted)
        {
            setTime(prevT=>prevT+intrvl)
        }
        let hours=String(Math.floor(time/3600)).padStart(2,"0");
        let minutes=String(Math.floor((time%3600)/60)).padStart(2,"0");
        let seconds=String(Math.floor((time%3600)%60)).padStart(2,"0");

        setTimeHolder(`${hours}:${minutes}:${seconds}`);
        
    }
    function start()
    {
        setTimerStarted(true);
    }
    function stop()
    {
        setTimerStarted(false);
    }
    function reset()
    {
        setTime(0);
        setTimerStarted(false);
    }
    
    useEffect(()=>{
        let myInterval = setInterval(runTime,intrvl);
        return ()=> clearInterval(myInterval);
    },[])

    return(<div className="stopwatch-box">
            <div className="stopwatch-half">
                <h1 className="timer">{timeHolder}</h1>
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