import { useState } from "react";

function ListOfObjects()
{
    let [objectsList,setObjectList]=useState([]);
    let [year, setYear] =useState(new Date().getFullYear());
    let [brand,setBrand]=useState();
    let [model, setModel]=useState();
    let [color, setColor] =useState("#FFFFFF");
    function handleAddObject(obj)
    {
        setObjectList(prevObjectList=>[...prevObjectList,obj]);
        setYear(new Date().getFullYear());
        setBrand("");
        setModel("");
        setColor("");
    }
    function updateYear(e)
    {
        setYear(e.target.value)
    }

    function updateBrand(e)
    {
        setBrand(e.target.value)
    }

    function updateModel(e)
    {
        setModel(e.target.value)
    }

    function updateColor(e)
    {
        setColor(e.target.value)
    }

    function handleDeleteObject(i)
    {
        setObjectList(prevObjectList=>prevObjectList.filter((_,index)=>index!=i))
    }
    return(<>
                <div id="list-of-objects-frame">
                <p>if you want to delete an element just click on it</p>
                    <input type="number" value={year} placeholder="put year of the car here" onChange={updateYear}/>
                    <br/>
                    <input type="text" value={brand} placeholder="put brand of the car here" onChange={updateBrand}/>
                    <br/>
                    <input type="text" value={model} placeholder="put model of the car here" onChange={updateModel}/>
                    <br/>
                    <input type="color" value={color} placeholder="put color of the car here" onChange={updateColor}/>
                    <button onClick={()=>handleAddObject({year,brand,model,color})}>submit</button>
                    <br/>

                    <p>provided values:</p>
                    <ul>
                            {objectsList.map((x,y)=><li key={y} onClick={()=>handleDeleteObject(y)}>
                                added {x.year} {x.brand} {x.model} in {x.color} color. object has index of {y}
                                </li>)}
                    </ul>
                </div>
           </>)
}
export default ListOfObjects;