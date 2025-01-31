import style from './ToDoList.module.css'
import { useState } from "react";

function ToDoList()
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
            setListOfTasks(updatedList=>[...updatedList,task]);
        }
        setTask("");
    }

    function moveUpTask(i)
    {
        //there will be no case when list is empty bc it will not be rendered then
        if(i==0)
        {
            return;
        }
        let updatedList=[...listOfTasks];
        [updatedList[i],updatedList[i-1]]=[updatedList[i-1],updatedList[i]];
        setListOfTasks(updatedList);
    }

    function moveDownTask(i)
    {
        if(i==listOfTasks.length-1)
        {
            return;
        }
        let updatedList=[...listOfTasks];
        [updatedList[i],updatedList[i+1]]=[updatedList[i+1],updatedList[i]];
        setListOfTasks(updatedList);
    }

    function deleteTask(i)
    {
        setListOfTasks(updatedList=>updatedList.filter((_,y)=>y!==i))
    }
    
    return(<>
                <div id={style.toDoContainerFrame}>
                    <div id={style.inputContainer}>
                        <input type="text" placeholder='put task here' value={task} onChange={updateTask}/>
                        <button onClick={()=>updateListOfTasks(task)}>+</button>
                    </div>
                    <ul>
                        {listOfTasks.map((t,indx)=>
                        <div id={style.liContainerFlex}>
                            <div id={style.liContainer}>
                                <li key={indx}>{t}</li>
                                <div id={style.buttonsContainer}>
                                    <button id={style.red} onClick={()=>deleteTask(indx)}>❌</button>
                                    <button className={style.blue} onClick={()=>moveUpTask(indx)}>☝️</button>
                                    <button className={style.blue} onClick={()=>moveDownTask(indx)}>👇</button>
                                </div>
                            </div>
                        </div>)}
                    </ul>
                </div>
           </>)
}
export default ToDoList;