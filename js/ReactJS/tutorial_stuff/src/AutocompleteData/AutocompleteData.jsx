import { useEffect, useState } from "react";
function AutocompleteData()
{
    function handleSearch(e)
    {
        //if data is empty it will show everything since '' includes ''
        setDataToDisplay(data.filter(x=>((x.name.toUpperCase()).includes(e.target.value.toUpperCase()))))
    }
    async function fetchData(newUrl)
        {
            try
            {            
                let response = await fetch(newUrl)
                if(response.ok)
                {
                    return response
                }
                else 
                {
                    setData([])
                    setErr('data load failed!');
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
                let mappedArr=array.map(x=>({name:x.name}))
                setData(mappedArr)
                setDataToDisplay(mappedArr);
            }
            catch(e)
            {
                console.log(e);
            }
        }

        useEffect(()=>{
            loadData('https://jsonplaceholder.typicode.com/users/');
        },[])

    let [data,setData]=useState([]);
    let [dataToDsiplay,setDataToDisplay]=useState([]);

    return(<>
    <input type="text" placeholder="put name to search" onChange={handleSearch}/>
    <div>
        {dataToDsiplay.map((x,y)=><h1 key={y}>{x.name}</h1>)}
    </div>
    </>)
}
export default AutocompleteData;
