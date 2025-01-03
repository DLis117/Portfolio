import { useState,useEffect } from 'react';
import style from '/src/LoadMoreData/LoadMoreData.module.css'
function LoadMoreData(props)
{
    let [limit,setLimit]=useState(props.limit);
    let [url,setUrl] = useState(`${props.url}&limit=${props.limit}`); //url to fetch from
    let [loading,setLoading] = useState(false); //if data is being loaded (i think it has to trigger rerender) thats why useState
    let [data,setData]=useState([])

    let howManyToLoad=5;
    
    async function fetchData(newUrl)
    {
        try
        {            
            setLoading(true); //indicate that you are loading the data
            let response = await fetch(newUrl)
            console.log("current url: ",url);
            if(response.ok)
            {
                return response
            }
            else 
            {
                throw new Error('data load failed');
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
            setData(array.map(x=>(x.download_url)))
            setLoading(false); //indicate that you have finished loading the data
        }
        catch(e)
        {
            console.log(e);
        }
    }

    useEffect(()=>{
        loadData(url); //to do next: only load data if response changed
    },[])

    function loadMore()
    {
        // setLimit((prevLimit)=>{
        //     let newLimit = prevLimit+howManyToLoad;
        //     setUrl(`${props.url}&limit=${newLimit}`)
        //     console.log("load more url: ",url);
        //     return newLimit;
        // })
        let newLimit=limit+howManyToLoad;
        setLimit(newLimit)
        let newUrl=`${props.url}&limit=${newLimit}`
        setUrl(newUrl)
        
        loadData(newUrl);// theres no need for it anymore since url change will trgger a rerender bc of useEffect
    }
    
    
    let dataToDsiplay = <>
                            <ul>
                                {data.map((x,y)=><li key={y}>{x}</li>)}
                            </ul>
                            <button onClick={loadMore}>load more data</button>
                        </>

    let loadingInfo = <h1 className={style.loading} >↻</h1>
    return(<>
            <div className={style.frame}>
                {loading===true?loadingInfo:dataToDsiplay}
            </div>
          </>)
}
export default LoadMoreData;