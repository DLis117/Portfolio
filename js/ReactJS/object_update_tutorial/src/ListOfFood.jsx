import { useState } from "react";

function ListOfFood()
{
    let [listelement,setListElement] =useState("");
    let [list, setList]=useState([]);

    function updateListElement(e)
    {
        setListElement(e.target.value)
    }

    function updateList()
    {
        setList(prevList=>[...prevList,listelement]);
        setListElement("");
    }
    function removeElement(index)
    {
        setList(list.filter((_,y)=>y!==index))
            
    }

    return (<>
                <h1>add elements to the list</h1>
                <p>if you want to delete an element just click on it</p>
                <ul>
                    {list.map((x,y)=><li key={y} onClick={()=>removeElement(y)}>added element: {x} with index {y}</li>)}
                </ul>
                <input type="text" value={listelement} onChange={updateListElement}></input>
                <button onClick={updateList}>add element to the list</button>
            </>)
}
export default ListOfFood;