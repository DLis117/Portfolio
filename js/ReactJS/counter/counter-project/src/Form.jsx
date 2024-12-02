import React, {useState} from "react";

function Form ()
{
    let [textVar ,setText] = useState("");
    let [numberVar, setNumber] = useState(0);

    function updateText(e)
    {
        setText(e.target.value);
    }

    function updateNumber(e)
    {
        setNumber(e.target.value);
    }


    return(
        <>
            <input type="text" onChange={(e)=>updateText(e)} placeholder="put a text here"></input>
            <input type="number" onChange={(e)=>updateNumber(e)} placeholder="put a number here"></input>

            <p>message you have put: {textVar}</p>
            <p>number you have put: {numberVar}</p>
        </>
    );
}

export default Form;