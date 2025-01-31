import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from './Stopwatch.module.css'

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
        return ()=> clearInterval(intervalRef.current);
    },[])

    return(<div className={style.stopwatchBox}>
            <div className={style.stopwatchHalf}>
                <h1 className={style.timer}>{formatTime()}</h1>
            </div>
            <div className={style.stopwatchHalf}>
                <div className={style.buttonContainer}>
                    <button onClick={start} className={style.start}>start</button>
                    <button onClick={stop} className={style.stop}>stop</button>
                    <button onClick={reset} className={style.reset}>reset</button>
                </div>
            </div>
           </div>)
}
export default Stopwatch;