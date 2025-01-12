import { useEffect, useRef, useState } from "react";
import style from '/src/TicTacToe/TicTacToe.module.css'
function TicTacToe()
{
    let nowPlacesRef = useRef('O');
    let winnerRef = useRef('');

    let [data,setData]=useState([[{index:0,value:'',red:false},{index:1,value:'',red:false},{index:2,value:'',red:false}],[{index:3,value:'',red:false},{index:4,value:'',red:false},{index:5,value:'',red:false}],[{index:6,value:'',red:false},{index:7,value:'',red:false},{index:8,value:'',red:false}]]);

    function resetGame()
    {
        setData([[{index:0,value:'',red:false},{index:1,value:'',red:false},{index:2,value:'',red:false}],[{index:3,value:'',red:false},{index:4,value:'',red:false},{index:5,value:'',red:false}],[{index:6,value:'',red:false},{index:7,value:'',red:false},{index:8,value:'',red:false}]])
        winnerRef.current=''
        nowPlacesRef.current='O';
    }
    function makeMove(x)
    {
        // console.log(x.index,x.value);
        let newData=[...data];
        // console.log(data);
        for (let r of newData)
        {
            for (let c of r)
            {
                if(c==x&&x.value=='') //check if the place is already occupied
                {
                    c.value=nowPlacesRef.current;
                    nowPlacesRef.current=nowPlacesRef.current==='X'?'O':'X'
                    
                    //check if win or not (8 ways)
                    if(newData[0][0].value===newData[0][1].value&&newData[0][1].value===newData[0][2].value&&newData[0][0].value!='')
                    {
                        console.log(0)
                        newData[0][0].red=newData[0][1].red=newData[0][2].red=true;
                        if(newData[0][0].value==='O')
                        {
                            winnerRef.current='O'
                        }
                        else if(newData[0][0].value==='X')
                        {
                            winnerRef.current='X'
                        }
                    }
                    else if(newData[1][0].value===newData[1][1].value&&newData[1][1].value===newData[1][2].value&&newData[1][0].value!='')
                    {
                        console.log(1)
                        newData[1][0].red=newData[1][1].red=newData[1][2].red=true;
                        if(newData[1][0].value==='O')
                        {
                            winnerRef.current='O'
                        }
                        else if(newData[1][0].value==='X')
                        {
                            winnerRef.current='X'
                        }
                    }
                    else if(newData[2][0].value===newData[2][1].value&&newData[2][1].value===newData[2][2].value&&newData[2][0].value!='')
                    {
                        console.log(2)
                        newData[2][0].red=newData[2][1].red=newData[2][2].red=true;
                        if(newData[2][0].value==='O')
                        {
                            winnerRef.current='O'
                        }
                        else if(newData[2][0].value==='X')
                        {
                            winnerRef.current='X'
                        }
                    }
                    /// by columns
                    else if(newData[0][0].value===newData[1][0].value&&newData[1][0].value===newData[2][0].value&&newData[2][0].value!='')
                    {
                        console.log(3)
                        newData[0][0].red=newData[1][0].red=newData[2][0].red=true;
                        if(newData[0][0].value==='O')
                        {
                            winnerRef.current='O'
                        }
                        else if(newData[0][0].value==='X')
                        {
                            winnerRef.current='X'
                        }
                    }
                    else if(newData[0][1].value===newData[1][1].value&&newData[1][1].value===newData[2][1].value&&newData[0][1].value!='')
                    {
                        console.log(4)
                        newData[0][1].red=newData[1][1].red=newData[2][1].red=true;
                        if(newData[0][1].value==='O')
                        {
                            winnerRef.current='O'
                        }
                        else if(newData[0][1].value==='X')
                        {
                            winnerRef.current='X'
                        }
                    }
                    else if(newData[0][2].value===newData[1][2].value&&newData[1][2].value===newData[2][2].value&&newData[0][2].value!='')
                    {
                        console.log(5)
                        newData[0][2].red=newData[1][2].red=newData[2][2].red=true;
                        if(newData[0][2].value==='O')
                        {
                            winnerRef.current='O'
                        }
                        else if(newData[0][2].value==='X')
                        {
                            winnerRef.current='X'
                        }
                    }
                    //diagonals
                    else if(newData[0][0].value===newData[1][1].value&&newData[1][1].value===newData[2][2].value&&newData[2][2].value!='')
                    {
                        console.log(6)
                        newData[0][0].red=newData[1][1].red=newData[2][2].red=true;
                        if(newData[0][0].value==='O')
                        {
                            winnerRef.current='O'
                        }
                        else if(newData[0][0].value==='X')
                        {
                            winnerRef.current='X'
                        }
                    }
                    else if(newData[0][2].value===newData[1][1].value&&newData[1][1].value===newData[2][0].value&&newData[2][0].value!='')
                    {
                        console.log(7)
                        newData[0][2].red=newData[1][1].red=newData[2][0].red=true;
                        if(newData[0][2].value==='O')
                        {
                            winnerRef.current='O'
                        }
                        else if(newData[0][2].value==='X')
                        {
                            winnerRef.current='X'
                        }
                    }
                    else if(newData[0][0].value!=''&&newData[0][1].value!=''&&newData[0][2].value!=''&&
                            newData[1][0].value!=''&&newData[1][1].value!=''&&newData[1][2].value!=''&&
                            newData[2][0].value!=''&&newData[2][1].value!=''&&newData[2][2].value!=''
                    )
                    {
                        winnerRef.current='Tie';
                    }
                    setData(newData)
                    return;
                }
            }
        }
    }
    return(<>
            <div className={style.board}>
                {winnerRef.current!=''&&<button className={style.reset} onClick={resetGame}>reset</button>}
                {data.map(x=><div className={style.row}>{x.map(x=>(<div id={x.index}  onClick={winnerRef.current==''?()=>makeMove(x):null} className={style.tile} style={x.red===true?{color: "red"}:null}>{x.value}</div>))}</div>)}
                <h1>{winnerRef.current==''?`now moves ${nowPlacesRef.current}`:winnerRef.current=='Tie'?`Tie!`:`${winnerRef.current} wins!`}</h1>
            </div>
          </>)
}
export default TicTacToe;