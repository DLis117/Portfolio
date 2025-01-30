import propTypes from 'prop-types';
import style from './ProgressBar.module.css'
function ProgressBar(props)
{
    ProgressBar.propTypes=
    {
        data:propTypes.arrayOf(propTypes.shape({item:propTypes.string,stared: propTypes.bool,finished:propTypes.bool})),
        indicatorLeftMargin:propTypes.number,
    }
    ProgressBar.defaultProps=
    {
        data:[],
        indicatorLeftMargin:0
    }
    let howManyComponents = props.data.length;
    let widthOfProgressBar = 90;//%
    let widthOfFlexComponent = Math.floor(widthOfProgressBar/howManyComponents);
    let ballSize = widthOfFlexComponent*1.9;
    let lineWidth = widthOfFlexComponent*9;
    let height= 16;// vh
    


    function returnDiv(x,y)
    {
        let filledBall = <div className={style.ballFlexComponent}><div className={style.filledBall} style={{width:`${ballSize}px`,height:`${ballSize}px`}}>✓</div><p>{x.item}</p></div>;
        let emptyBall  = <div className={style.ballFlexComponent}><div className={style.emptyBall}  style={{width:`${ballSize}px`,height:`${ballSize}px`}}></div><p>{x.item}</p></div>;
        let filledLine = <div className={style.filledLine} style={{width:`${lineWidth}px`,height:`${ballSize/8}px`}}/>;
        let emptyLine  = <div className={style.emptyLine}  style={{width:`${lineWidth}px`,height:`${ballSize/8}px`}}/>;
        let halfLine   = <div className={style.halfLine}   style={{width:`${lineWidth}px`,height:`${ballSize/8}px`}}/>;

        if(y===props.data.length-1)
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
                {howManyComponents>0&&<div className={style.ProgressBarContainer}>
                        <div className={style.progressArrowContainer} style={{width:`${widthOfFlexComponent*howManyComponents}%`,height:`5vh`}}><h3 className={style.progressArrow} style={{marginLeft:`${props.indicatorLeftMargin}px`}}>⬐ i am currently here</h3></div>
                        <div className={style.all}>
                            {props.data.map((x,y)=><div className={style.flexComponent} style={{width: `${widthOfFlexComponent}%`,height: `${height*0.4}vh`}}>{returnDiv(x,y)}</div>)}
                        </div>
                </div>}
            </>)
}
export default ProgressBar;