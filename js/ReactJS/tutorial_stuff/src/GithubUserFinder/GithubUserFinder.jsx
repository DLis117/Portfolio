import { useState,useEffect } from "react";
import style from '/src/GithubUserFinder/GithubUserFinder.module.css'
function GithubUserFinder()
{
        let [data,setData]=useState([])
        let [nicknameVar,setNicknameVar]=useState('');
        let [err,setErr]=useState();

        function setNewUrl(nicknameVar)
        {
            let newUrl = `https://api.github.com/users/${nicknameVar}`
            loadData(newUrl);
        }

        function handnleChangeNicknameVar(e)
        {
            setNicknameVar(e.target.value);
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
                else if(response.status===403)
                {
                    setData([])
                    setErr('github API blocked searching!')
                    throw new Error('github API blocked searching!');
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
                setData(array)
            }
            catch(e)
            {
                console.log(e);
            }
        }
    
        // useEffect(()=>{
        //     loadData(`https://api.github.com/users/DLis117`);
        // },[])
    
        return(<>
            <header>
                <h1>github profile finder</h1>
                <p>put usename to search for data</p>
                <input onKeyDown={(e)=>e.key==="Enter"&&setNewUrl(nicknameVar)} type="text" value={nicknameVar} onChange={handnleChangeNicknameVar} placeholder="Nickname"></input>
                <button onClick={()=>setNewUrl(nicknameVar)}>🔎</button>
            </header>
            
            {(data&&data.login)?<div className={style.frame}>
                <h1>username: {data.login}</h1>
                <img src={data.avatar_url} />
                <p>id: {data.id}</p></div>:<h1 className={style.err}>{err}</h1>}
            
        </>)
    
}
export default GithubUserFinder;