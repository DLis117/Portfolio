import { useState,createContext } from "react"
import ComponentB from './ComponentB'
export const NameContext = createContext();
function ComponentA()
{
    let [name,_]= useState("World");
    return (<div className="box">
            <h1>this is component A</h1>
            <h2>{`Hello ${name}`}</h2>
            <NameContext.Provider value={name}>
                <ComponentB/>
            </NameContext.Provider>
            </div>)
}
export default ComponentA;