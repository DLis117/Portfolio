import { useEffect, useState } from "react"

//custom hook that will fetch data and return it
function useFetch(defaultUrl)   
{
    let [data,setData]=useState([])
    let [url,setUrl]=useState(defaultUrl);
    let [error,setError]=useState()

    async function fetchData(newUrl)
    {
        try
        {            
            let response = await fetch(newUrl)
            if(response.ok)
            {
                return response
                setError();
            }
            else 
            {
                setError('data load failed!');
                throw new Error('data load failed!');
                
            }
        }
        catch (e)
        {
            throw e;
        }
    }
    async function loadData(newUrl)
    {
        try
        {
            const loadedResponse = await fetchData(newUrl);
            let array = await loadedResponse.json();
            setData(array)
            setError();
        }
        catch(e)
        {
            console.log(e);
            setError('data load failed!');
        }
    }


    useEffect(()=>{
        loadData(url)
    },[url])

    return [setUrl,data,error]; // [x,y,z]=useFetch(defaultvalue)
}
export default useFetch;