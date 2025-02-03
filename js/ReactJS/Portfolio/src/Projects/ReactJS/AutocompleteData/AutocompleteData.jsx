import style from './AutocompleteData.module.css'
import { useEffect, useState } from "react";
function AutocompleteData()
{
    let [err,setErr]=useState();


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
                setErr('data load failed!');
            }
        }

        useEffect(()=>{
            loadData('https://jsonplaceholder.typicode.com/users/');
        },[])

    let [data,setData]=useState([]);
    let [dataToDsiplay,setDataToDisplay]=useState([]);

    return(<>
            <div className={style.AutocompleteDataContainer}>
                <input className={style.input} type="text" placeholder="put name to filter" onChange={handleSearch}/>
                {err?
                    <div className={style.errContainer}>
                        <h1 className={style.err}>{err}</h1>
                    </div>:
                    <>
                        <div className={style.names}>{dataToDsiplay.map((x,y)=>
                            <div key={y} className={style.name}>
                                <h1 key={y}>{x.name}</h1>
                            </div>)}
                        </div>
                    </>
                }
            </div>
    </>)
}
export default AutocompleteData;
