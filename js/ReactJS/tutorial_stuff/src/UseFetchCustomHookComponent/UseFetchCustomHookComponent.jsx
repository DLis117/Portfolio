import { useState } from "react";
import useFetch from "./useFetch";
import style from '/src/UseFetchCustomHookComponent/UseFetchCustomHookComponent.module.css'
function UseFetchCustomHookComponent()
{
    let url = `https://jsonplaceholder.typicode.com/posts`
    // https://jsonplaceholder.typicode.com/users
    let [setUrlx,datax,error]=useFetch(url);
    let [potentialUrl,setPotentialUrl]=useState('');

    
    function handlePotentialUrlChange(e)
    {
        setPotentialUrl(e.target.value)
    }
    function handleUrlChange()
    {
        setUrlx(potentialUrl);
        setPotentialUrl('')
    }

    function displayData(x)
    {
        return (<ul className={style.dataFrame}>{Object.keys(x).map(key => <li>{key}: {x[key]}</li>)}</ul>)
    }

    let dataToDsiplay=<>{datax?.length>0&&<div className={style.flexContainer}>{datax.map(x=>displayData(x))}</div>}</>;
    let errorMessage=<h1 className={style.error}>{`bad data format! be sure to put url with data format of [{...},{...},{...},] where '...' are primitive data types`}</h1>;
    return (<>
                <h1>put url to fetch data</h1>
                <input className={style.input} type="text" placeholder="url" value={potentialUrl} onChange={handlePotentialUrlChange}/>
                <button className={style.button} onClick={handleUrlChange}>🔎</button>
                {error==undefined?dataToDsiplay:errorMessage}
           </>)
}
export default UseFetchCustomHookComponent;
        