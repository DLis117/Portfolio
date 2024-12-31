import { useEffect, useState } from "react"

function LoadingScreen()
{
    let [datax,setDatax]=useState([]);
    let [loading,setLoading]=useState(false); //if data is being loaded

    async function getData()
    {
        setLoading(true); //indicate that you are loading the data
        let response = await fetch(`https://picsum.photos/v2/list?page=${1}&limit=${10}`)
        return new Promise((resolve,reject)=>{
            
            if(response)
            {
                resolve(response)
            }
            else
            {
                reject("data load failed")
            }
        })
    }

    useEffect(()=>{
            loadData(); //to do next: only load data if response changed
    },[])

    async function loadData()
    {
        try
        {
            const loadedResponse = await getData();
            let array = await loadedResponse.json();
            
            console.log(array)
            setDatax(array);
            setLoading(false); //indicate that you have finished loading the data
        }
        catch(e)
        {
            console.log(e);
        }

        
    }

    
    //if data is loading then display info
    return(<>
            {loading===false?<ul>
                {datax!=[]?(datax.map((x,y)=><li key={y}>{x.url}</li>)):<li>xd</li>}
            </ul>:<h1>Loading data please wait...</h1>}
            
    </>)
}
export default LoadingScreen;