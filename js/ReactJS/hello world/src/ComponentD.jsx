import { useContext } from "react";
import {NameContext} from './ComponentA.jsx';

function ComponentD()
{
    const name=useContext(NameContext);

    return (<div className="box">
            <h1>this is component D</h1>
            <h2>{`Goodbye cruel ${name}`}</h2>
            </div>)
}
export default ComponentD;