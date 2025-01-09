import { useEffect, useState } from 'react'
import style from '/src/ProgressScrollBar/ProgressScrollBar.module.css'
function ProgressScrollBar(props)
{
    let [data,setData]=useState([]);
    async function fetchData()
    {
        try
        {
            let response = await fetch(props.url);
            if(response.ok)
            {
                return response;
            }
            else
            {
                throw new Error('data load failed');
            }
        }
        catch(e)
        {
            console.log(e.message)
            throw e;
        }
    }
    async function loadData()
    {
        try 
        {
            const loadedResponse = await fetchData();
            let array= await loadedResponse.json();
            let dataToDsiplay= array.map(x=>(<h1 key={x.id}>{x.title}</h1>));
            console.log(dataToDsiplay)
            setData(dataToDsiplay);
        }   
        catch(e)
        {
            console.log(e.message)
        }
    }

    useEffect(()=>{
        loadData();
    },[data])

    let [scrollVar,setScrollVar]=useState(0);
    window.onscroll=()=>
    {
        let maxForScroll= (document.documentElement.scrollHeight-document.documentElement.clientHeight)
        setScrollVar(Math.floor((document.documentElement.scrollTop*100)/maxForScroll))
    }
    return(<>
            <div className={style.mainContainer}>
                <div className={style.scrollBarContainer} >
                    <div className={style.scrollBar} style={{width: `${scrollVar}%`}}></div>
                </div>
                {data}
            </div>
          </>)
}
export default ProgressScrollBar;