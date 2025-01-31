import { useState } from "react";
import style from './GithubUserFinder.module.css'
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
                    setErr('user not found!');
                    throw new Error('user not found!');
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
            <div className={style.GithubUserFinderComponent}>
                <header className={style.GithubUserFinderHeader}>
                        <input onKeyDown={(e)=>e.key==="Enter"&&setNewUrl(nicknameVar)} type="text" value={nicknameVar} onChange={handnleChangeNicknameVar} placeholder="put username and press enter"></input>
                        <button onClick={()=>setNewUrl(nicknameVar)}>🔎</button>
                </header>
            
                {
                    (data&&data.login)?<div className={style.frame}>
                                            <h1>username: {data.login}</h1>
                                            <img src={data.avatar_url}/>
                                            <div className={style.accountInfoWrapper}>
                                                <p className={style.accountInfo}>amount of public repos: {data.public_repos}</p>
                                                <p className={style.accountInfo}>account created: {data.created_at}</p>
                                                <p className={style.accountInfo}>user id: {data.id}</p>
                                            </div>
                                        </div>
                                            :<div className={style.errContainer}><h1 className={style.err}>{err}</h1></div>
                }
            </div>
            
        </>)
    
}
export default GithubUserFinder;