import { useState } from "react";

function ToDoContainer()
{
    let [listOfTasks,setListOfTasks]=useState([]);

    let [task,setTask]=useState("")

    function updateTask(e)
    {
        setTask(e.target.value)
    }

    function updateListOfTasks(task)
    {
        if(task.trim()!='')
        {
            setListOfTasks(prevList=>[...prevList,task]);
        }
        setTask("");
    }

    // function moveUpTask(i)
    // {

    // }

    // function moveDownTask(i)
    // {

    // }

    function deleteTask(i)
    {
        setListOfTasks(prevList=>prevList.filter((_,y)=>y!==i))
    }
    
    return(<>
                <div id="to-do-container-frame">
                <h1>To do List:</h1>
                    <input type="text" value={task} onChange={updateTask}/>
                    <button onClick={()=>updateListOfTasks(task)}>+</button>
                    <ul>
                        {listOfTasks.map((t,indx)=>
                            <li key={indx}>{t}
                                <div id="buttons-container">
                                    <button className="blue" onClick={()=>moveUpTask(indx)}>^</button>
                                    <button id="red" onClick={()=>deleteTask(indx)}>x</button>
                                    <button className="blue" onClick={()=>moveDownTask(indx)}>v</button>
                                </div>
                            </li>)}
                    </ul>
                </div>
           </>)
}
export default ToDoContainer;