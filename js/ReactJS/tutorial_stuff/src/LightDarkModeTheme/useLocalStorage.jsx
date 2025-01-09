import { useEffect, useState } from "react"

//custom hook that will send data to localStorage
function useLocalStorage(key,defaultValue)   
{

    const [value,setValue]=useState(()=>{
        let currentValue;
        try
        {
            //data is already in localStorage? get it || get default value
            //we parse data from string since localStorage can only store and retrieve data as string
            currentValue=JSON.parse(localStorage.getItem(key)||String(defaultValue))
        }
        catch(e)
        {
            console.log(e)
            currentValue=defaultValue;  // an error occured?  then default value will stay
        }
        return currentValue;
    })

    //ten fragment ustawia wartosc w localStorage: klucz key ma wartosc value

    //The useEffect hook is necessary to ensure that changes to the value state are synchronized
    //with the browser's localStorage.
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value)) //we need to convert js value back to JSON string bc localStorage can only store data as string
    },[key,value])

    return [value,setValue]; // [x,y]=useLocalStorage(key,defaultvalue)
}
export default useLocalStorage