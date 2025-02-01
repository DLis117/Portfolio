import { useRef, useState } from "react";
import style from './TicTacToe.module.css'
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
                    
                    let winningPatterns=[[[0,0],[0,1],[0,2]],
                                         [[1,0],[1,1],[1,2]],
                                         [[2,0],[2,1],[2,2]],
                                         [[0,0],[1,0],[2,0]],
                                         [[0,1],[1,1],[2,1]],
                                         [[0,2],[1,2],[2,2]],
                                         [[0,0],[1,1],[2,2]],
                                         [[0,2],[1,1],[2,0]],
                                        ];
                    for(let pattern of winningPatterns)
                    {
                        if(newData[pattern[0][0]][pattern[0][1]].value===newData[pattern[1][0]][pattern[1][1]].value&&newData[pattern[2][0]][pattern[2][1]].value===newData[pattern[1][0]][pattern[1][1]].value&&newData[pattern[1][0]][pattern[1][1]].value!='')
                        {
                            newData[pattern[0][0]][pattern[0][1]].red=newData[pattern[1][0]][pattern[1][1]].red=newData[pattern[2][0]][pattern[2][1]].red=true;
                            if(newData[pattern[0][0]][pattern[0][1]].value==='O')
                            {
                                winnerRef.current='O'
                            }
                            else
                            {
                                winnerRef.current='X'
                            }
                            setData(newData)
                            return;
                        }
                    }
                    if(newData[0][0].value!=''&&newData[0][1].value!=''&&newData[0][2].value!=''&&
                       newData[1][0].value!=''&&newData[1][1].value!=''&&newData[1][2].value!=''&&
                       newData[2][0].value!=''&&newData[2][1].value!=''&&newData[2][2].value!=''
                    )
                    {
                        winnerRef.current='Tie';
                        setData(newData)
                        return;
                    }
                    setData(newData)
                }
            }
        }
    }
    return(<>
            <div className={style.TicTacToeContainer}>
                <div className={style.board}>
                    {data.map(x=><div className={style.row}>{x.map(x=>(<div id={x.index}  onClick={winnerRef.current==''?()=>makeMove(x):null} className={style.tile} style={x.red===true?{color: "red"}:null}>{x.value}</div>))}</div>)} 
                </div>
                <div className={style.winnerContainer}>
                    <h1 className={style.winner}>{winnerRef.current==''?`now moves ${nowPlacesRef.current}`:winnerRef.current=='Tie'?`Tie!`:`${winnerRef.current} wins!`}</h1>
                </div>
                {winnerRef.current!=''&&<button className={style.reset} onClick={resetGame}>reset</button>}
            </div>
          </>)
}
export default TicTacToe;