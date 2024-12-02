import React, {useState} from "react";
function Counter()
{
    let [num, setNum] =useState(0);

    let incrementNum = () =>setNum(num+1);
    let decrementNum = () =>setNum(num-1);
    let resetNum = () => setNum(0);

    return(<>
            <div id="counterContainer">
                <h1>{num}</h1>
                <div id="buttonsContainer">
                    <button onClick={incrementNum}>increment</button>
                    <button onClick={resetNum}>reset</button>
                    <button onClick={decrementNum}>decrement</button>
                </div>
            </div>
            </>)
}
export default Counter;