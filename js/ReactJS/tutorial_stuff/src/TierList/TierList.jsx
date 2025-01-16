import { useEffect,useRef, useState } from 'react';
import tierStyle from '/src/TierList/TierList.module.css'
function TierList(props)
{
    //let dummyTieredData=['/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png']
    let dummyDataToBeTiered=['/public/autumn.png','/public/field.png','/public/sunset.png']
    const mainVH=80;                                //viewHeight percentage of all tiers combined
    const dataVH=10;                                //viewHeight percentage of all 'images to be tiered' combined
    const tiersVH=mainVH-dataVH;                    //calculated default single tier height
    const fontSize=300;
    const width=80;
    const imageWidth=5;                             //percentage width of single image (based on single tier width)
    const howManyObjectsPerTierToChangeHeight=20;   //defined number to know when to change the size of single tier
    
    let [tiersData,setTiersData]=useState(                                                                   /* font size will be scaled to fit the tier square*/
        props.tiers.map((x,y)=>({index:y,text:x.tier,color:x.color,height:`${tiersVH/props.tiers.length}vh`,fontSize:x.tier.length>6?`${fontSize-200}%`:x.tier.length>2?`${fontSize-150}%`:`${fontSize}%`,data:[]}))
    )

    let [ghost,setGhost]=useState(); //movable object

    let [dataToBeTiered,setDataToBeTiered]=useState(dummyDataToBeTiered.map((x,y)=>({index:y,src:x})));
    
    let [draggingState,setDraggingState]=useState(false);

    let whereToPutSelectedObjectRef = useRef();
    

    return (<>
                <h1>{props.label}</h1>
                <div className={tierStyle.tierListContainer}> 
                    {draggingState?ghost:null}
                    {tiersData.map(x=>
                                                                                                                                  /* we are calculating the height of single tier based on how many objects it has  
                                                                                                                                 (howManyObjectsPerTierToChangeHeight+1) -> +1 because size of all objects in tier exceeds the tier length itself, so we make it resize if it really exceeds the tier length
                                                                                                                                  Math.floor(x.data.length/(howManyObjectsPerTierToChangeHeight+1))+1 -> +1 because we want to calculate by how many times we have to resize and if we dont want to resize we need to put 1 instead of 0, floor to make sure its an Integer */
                        <div className={tierStyle.tier} id={x.index} style={{background:x.color,width:`${width}vw`,height:`${(tiersVH*(Math.floor(x.data.length/(howManyObjectsPerTierToChangeHeight+1))+1))/props.tiers.length}vh`}} /*onMouseOver={()=>console.log(x.index,x.data.length)}*/>
                                <div className={tierStyle.flexComponent} style={{width:`${imageWidth}%`}}>

                                    {/* if text is bigger, make font smaller and smaller */}
                                    {/* if length of text is longer than 7 then font size gets negative value and becomes too large 
                                        thats why we have to cap it */}
                                    <h1 style={{fontSize:x.fontSize}}>{x.text}</h1>
                                </div>
                                <div className={tierStyle.dataOfTier}>
                                    {x.data?.length>0&&x.data.map(x=><img  onMouseMove={(e)=>tryToDrag(e,x)} onMouseDown={()=>setDraggingState(true)} onMouseUp={()=>handlePutObject(x)} key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                </div>
                        </div>)}
                        <p>{whereToPutSelectedObjectRef.current}</p>
                    <div className={tierStyle.dataContainer}>
                        {/* <img src='/public/sunset.png' className={tierStyle.img} style={{width:imageWidth}}/> */}
                        
                        {dataToBeTiered.map(x=><img onMouseMove={(e)=>tryToDrag(e,x)} onMouseDown={()=>setDraggingState(true)} onMouseUp={()=>handlePutObject(x)} key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                    </div>
                </div>
            </>)
        
        function handlePutObject(x)
        {
            
            

            if(whereToPutSelectedObjectRef.current>=tiersData.length)
            {
                //out of tiers so we put it into DataToBeTiered
                setDataToBeTiered(d=>[...d,{index:x.index,src:x.src}])
            }
            else
            {
                //put object into tier
                let newTiersData=[...tiersData]
                newTiersData[whereToPutSelectedObjectRef.current].data.push({index:x.index,src:x.src});
                setTiersData(newTiersData);
            }
            
            //disable ghost 
            setGhost();
            whereToPutSelectedObjectRef.current=undefined;

        }
        function tryToDrag(e,x)
        {
            if(draggingState==true)
            {
                //ale moze byc tez w tierach~! 
                //wiec trzeba przeszukac gdzie jest                                                                                                                                                                                                                                                  /* take scroll into account */
                setGhost(<div  onMouseMove={(e)=>tryToDrag(e,x)} onMouseDown={()=>setDraggingState(true)} onMouseUp={()=>handlePutObject(x)} key={x.index} src={x.src} className={tierStyle.img} style={{backgroundImage:`url(${x.src})`,backgroundSize:"cover",position:"absolute",top: `${e.clientY-30+window.scrollY}px`,left:`${e.clientX-30}px`,width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)

                //now we need to know where to add element
                //we will search, above which tier mouse is positioned
                let tiers = document.getElementsByClassName(tierStyle.tier);
                for(var i=0;i<tiers.length;++i)
                {
                    let rect = tiers[i].getBoundingClientRect();
                    if(e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom)
                    {
                        //this will also work if we take already placed element.
                        //we know the boundary cords so we know where it was and where will it be placed
                        whereToPutSelectedObjectRef.current=i;
                        // console.log(x.index,"index przenoszonego!")
                        //we need to delete it from tier
                        let newTiersData=[...tiersData]
                        newTiersData[i].data=newTiersData[i].data.filter(p=>p!=x)
                        setTiersData(newTiersData);
                        return;
                    }
                }
                //the mouse is positioned somewhere else so we will put object back to 'dataToBeTiered'
                whereToPutSelectedObjectRef.current=i;
                // console.log(i," index przenoszonego!")

                //TO DZIALA A TO DZIWNE W SUMIE
                setDataToBeTiered(d=>d.filter(z=>x.index!==z.index)); //usuwamy z tablicy 'dataToBeTiered'

                // whereToPutSelectedObjectRef.current=i;
                // // console.log(i," index przenoszonego!")
                let newDataToBeTiered = [...dataToBeTiered];
                newDataToBeTiered=newDataToBeTiered.filter(z=>x.index!==z.index)
                setDataToBeTiered(newDataToBeTiered); //usuwamy z tablicy 'dataToBeTiered'
                // console.log(newDataToBeTiered.length);
                
            }
            else
            {
                //if its not there, if we click on next element it will show position of last clicked
                //we dont want that so we will reset ghost
                setGhost();
            }
            // let newDataToBeTiered=dataToBeTiered.map(z=>)
            // setDataToBeTiered(newDataToBeTiered)
        }
}
export default TierList;