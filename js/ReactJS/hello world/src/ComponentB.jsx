import ComponentC from './ComponentC'
function ComponentB()
{
    return (<div className="box">
            <h1>this is component B</h1>
            <ComponentC/>
            </div>)
}
export default ComponentB;