import style from './Counter.module.css'
import React, {useState} from "react";
function Counter()
{
    let [num, setNum] =useState(0);

    let incrementNum = () =>setNum(prevNum=>prevNum+1);
    let decrementNum = () =>setNum(prevNum=>prevNum-1);
    let resetNum = () => setNum(0);

    return(<>
            <div id={style.counterContainer}>
                <h1 className={style.num}>{num}</h1>
                <div id={style.buttonsContainer}>
                    <button onClick={incrementNum}>increment</button>
                    <button onClick={resetNum}>reset</button>
                    <button onClick={decrementNum}>decrement</button>
                </div>
            </div>
            </>)
}
export default Counter;