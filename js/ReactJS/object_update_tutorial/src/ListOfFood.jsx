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

    return (<>
                <h1>add elements to the list</h1>
                <ul>
                    {list.map((x,y)=><li key={y}>added element: {x} with index {y}</li>)}
                </ul>
                <input type="text" value={listelement} onChange={updateListElement}></input>
                <button onClick={updateList}>add food to the list</button>
            </>)
}
export default ListOfFood;