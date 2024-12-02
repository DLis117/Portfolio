
function Button()
{
    let x=0;
    let buttonStyle=
    {
        background: "rgb(85, 121, 239)",
        fontSize: "30px",
        marginLeft: "10px",
        border: "solid 2px white",
        borderRadius: "10px",
        color: "white"

    }
    function count(e)
    {
        x++;
        e.target.textContent=`clicked: ${x} time(s)`;

    }
    return (<button onClick={(e)=>count(e)} style={buttonStyle}>click</button>);
}
export default Button;