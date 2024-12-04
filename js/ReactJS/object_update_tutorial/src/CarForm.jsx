import { useState } from "react";

function CarForm()
{
    let [car,updateCar]=useState({year: 2024,make: 'Ford',model: 'Mustang'});

    function updateYear(e)
    {
        updateCar(prevCar=>({...prevCar,year:e.target.value}))
    }
    function updateMake(e)
    {
        updateCar(prevCar=>({...prevCar,make:e.target.value}))
    }

    function updateModel(e)
    {
        updateCar(prevCar=>({...prevCar,model:e.target.value}))
    }
    return (<>
                <h1>your chosen car is:{car.year} {car.make} {car.model}</h1>
                <input type="number" value={car.year} onChange={updateYear}></input>
                <input type="text"  value={car.make} onChange={updateMake}></input>
                <input type="text" value={car.model} onChange={updateModel}></input>
            </>)
}
export default CarForm;