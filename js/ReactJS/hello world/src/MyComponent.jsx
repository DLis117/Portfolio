import { useState,useEffect,useRef } from "react";
function MyComponent()
{
    let inputRef1=useRef(null);
    let inputRef2=useRef(null);
    let inputRef3=useRef(null);

    function handleClick1()
    {
        inputRef1.current.style.backgroundColor="blue";
        inputRef2.current.style.backgroundColor="";
        inputRef3.current.style.backgroundColor="";
    }

    function handleClick2()
    {
        inputRef1.current.style.backgroundColor="";
        inputRef2.current.style.backgroundColor="blue";
        inputRef3.current.style.backgroundColor="";
    }

    function handleClick3()
    {
        inputRef1.current.style.backgroundColor="";
        inputRef2.current.style.backgroundColor="";
        inputRef3.current.style.backgroundColor="blue";
    }

    useEffect(()=>
    {
        console.log("component rerendered");
    });
    return (<>
                <button onClick={handleClick1}>click me!</button>
                <button onClick={handleClick2}>click me!</button>
                <button onClick={handleClick3}>click me!</button>

                <input ref={inputRef1}/>
                <input ref={inputRef2}/>
                <input ref={inputRef3}/>
            </>)
}
export default MyComponent;