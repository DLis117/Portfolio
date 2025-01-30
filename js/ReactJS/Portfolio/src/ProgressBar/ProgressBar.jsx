import style from './ProgressBar.module.css'
function ProgressBar()
{
    let progressData=[  
                        {item: 'react1',started: true,finished: true},
                        {item: 'react2',started: true,finished: false},
                        {item: 'react3',started: false,finished: false},
                        {item: 'react4',started: false,finished: false},
                        {item: 'react5',started: false,finished: false},
                        {item: 'react5',started: false,finished: false},
                        {item: 'react5',started: false,finished: false},
                    ];

    let howManyComponents = progressData.length;
    let widthOfProgressBar = 100;//%
    let widthOfFlexComponent = Math.floor(widthOfProgressBar/howManyComponents);
    console.log(widthOfFlexComponent);
    let ballSize = widthOfFlexComponent*1.9;
    let lineWidth = widthOfFlexComponent*9;
    let height= 15;// vh


    function returnDiv(x,y)
    {
        let filledBall = <div className={style.filledBall} style={{width:`${ballSize}px`,height:`${ballSize}px`}}>✓</div>;
        let emptyBall  = <div className={style.emptyBall}  style={{width:`${ballSize}px`,height:`${ballSize}px`}}></div>;
        let filledLine = <div className={style.filledLine} style={{width:`${lineWidth}px`,height:`${ballSize/8}px`}}/>;
        let emptyLine  = <div className={style.emptyLine}  style={{width:`${lineWidth}px`,height:`${ballSize/8}px`}}/>;
        let halfLine   = <div className={style.halfLine}   style={{width:`${lineWidth}px`,height:`${ballSize/8}px`}}/>;

        if(y===progressData.length-1)
        {
            if(x.finished===true)
            {
                return(filledBall)
            }
            return(emptyBall)
        }
        else
        {
            if(x.finished===true)
            {
                return( <>
                            {filledBall}
                            {filledLine}
                        </>)
            }
            else if (x.started===false)
            {
                return( <>
                            {emptyBall}
                            {emptyLine}
                        </>)
            }
            else if(x.started===true)
            {
                return( <>
                            {filledBall}
                            {halfLine}
                        </>)
            }
        }
    }
    return(<>
                <div className={style.ProgressBarContainer} style={{height: `${height}vh`}}>
                    <p>progress:</p>
                    {progressData.map((x,y)=><div className={style.flexComponent} style={{width: `${widthOfFlexComponent}%`,height: `${height*0.4}vh`}}>{returnDiv(x,y)}</div>)}
                </div>
            </>)
}
export default ProgressBar;