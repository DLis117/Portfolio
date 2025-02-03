import { useRef, useState } from 'react';
import tierStyle from './TierList.module.css'
function TierList(props)
{
    //let dummyTieredData=['/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png']
    
    const mainVH=50;                                //viewHeight percentage of all tiers combined

    let [tiersData,setTiersData]=useState(                                                                   /* font size will be scaled to fit the tier square*/
        props.tiers.map((x,y)=>({index:y,text:x.tier,color:x.color,height:`${mainVH/props.tiers.length}vh`,fontSize:letterSize(x.tier),data:[]}))
    )

    let [ghost,setGhost]=useState(); //movable object

    let [dataToBeTiered,setDataToBeTiered]=useState(props.data.map((x,y)=>({index:y,src:x,shadow:false})));
    
    //if we drag then we will show ghost object
    let [draggingState,setDraggingState]=useState(false);

    //to know where to put ghost object and from which tier it was taken
    let whereToPutSelectedObjectRef = useRef();

    
    //to handle object deletion from tiers/dataToBeTiered
    let doneOnlyOnce = useRef(false);
    let doneOnlyOnce2 = useRef(false);

    function letterSize(x)
    {
        if(x.length==1)
        {
            return `2.4vw`;
        }
        else if(x.length==2)
        {
            return `1.5vw`;
        }
        else if(x.length>=3&&x.length<=4)
        {
            return `1.3vw`;
        }
        else if(x.length>=5&&x.length<=6)
        {
            return `1vw`;
        }
        else if(x.length>=7&&x.length<=9)
        {
            return `0.8vw`;
        }
        else if(x.length>=10&&x.length<=12)
        {
            return `0.7vw`;
        }
        else if(x.length>=13&&x.length<=16)
        {
            return `0.64vw`;
        }
        else if(x.length>=17)
        {
            return `0.6vw`;
        }
    }
    function handlePutObject(x)
    {
        setDraggingState(false);
        doneOnlyOnce.current=false;
        doneOnlyOnce2.current=false;

        let newTiersData=[...tiersData]

        if(whereToPutSelectedObjectRef.current>=tiersData.length)
        {
            //out of tiers so we put it into DataToBeTiered
            setDataToBeTiered(d=>[...d,{index:x.index,src:x.src,shadow:x.shadow}])
        }
        else
        {
            

            //when we click we try to add data to  whereToPutSelectedObjectRef.current which is undefined at this state
            //so we have to prevent that
            //BUT...! we have to compare it to undefined 
            //bc if we leave it if(whereToPutSelectedObjectRef.current) then it will compare it to 0 and 
            //on first tier items would disappear
            if(whereToPutSelectedObjectRef.current!=undefined) 
            {
                //put object into tier
                newTiersData[whereToPutSelectedObjectRef.current].data.push({index:x.index,src:x.src,shadow:x.shadow});   
            }
            
        }
        //delete shadows
        for(let o of newTiersData)
        {
            o.data= o.data.filter(z=>z.shadow!=true);
        }
        setTiersData(newTiersData);
        //disable ghost 
        setGhost();
        whereToPutSelectedObjectRef.current=undefined;

    }
    function tryToDrag(e,x)
    {
        if(draggingState==true)
        {
            let imageSize = document.getElementsByClassName(tierStyle.img)[0].getBoundingClientRect().height;                                                                                                                                                                                                                                         /* take scroll into account */
            setGhost(<div  onMouseMove={(e)=>tryToDrag(e,x)} onMouseDown={()=>setDraggingState(true)} onMouseUp={()=>handlePutObject(x)} key={x.index} src={x.src} className={tierStyle.img} style={{backgroundImage:`url(${x.src})`,backgroundSize:"cover",position:"absolute",top: `${e.clientY-(imageSize/2)+window.scrollY}px`,left:`${e.clientX-(imageSize/2)}px`,width:`${Math.floor(mainVH/props.tiers.length)}vh`,height:`${Math.floor(mainVH/props.tiers.length)}vh`}}/>)

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

                    //we need to delete it from tier
                    //but we need to delete it only once, not try to delete it every time!

                    let newTiersData=[...tiersData];
                    if(doneOnlyOnce.current==false)
                    {
                        doneOnlyOnce.current=true;
                        // let newTiersData=[...tiersData]
                        newTiersData[i].data=newTiersData[i].data.filter(p=>p!=x)
                        // setTiersData(newTiersData);
                    }

                    
                    //now we will try to put a ghost shadow
                    //first check if already exists
                    let alreadyExists=false;
                    for(let o of newTiersData[i].data)
                    {
                        //compare indexes not objects for now
                        //bc we've put another source
                        //soon it will have different property
                        
                        if(o.index==x.index)
                        {
                            alreadyExists=true;
                            break;
                            //already exists
                        }
                    }
                    
                    for(let j=0;j<newTiersData.length;++j)
                    {
                        //we know where we have put shadow of ghost
                        //so we will delete this shadow from other tiers
                        if(j!=i)
                        {
                            //delete
                            newTiersData[j].data=newTiersData[j].data.filter(p=>p.index!=x.index)
                        }
                    }
                    if(alreadyExists==false)
                    {
                        newTiersData[i].data.push({index:x.index,src:x.src,shadow:true});
                    }

                    setTiersData(newTiersData);
                    return;
                }
            }
            //the mouse is positioned somewhere else so we will put object back to 'dataToBeTiered'
            //because i is var we can do it after the loop
            whereToPutSelectedObjectRef.current=i;
            if(doneOnlyOnce2.current==false)
            {
                //make sure it will happen only once
                doneOnlyOnce2.current=true;
                let newDataToBeTiered = [...dataToBeTiered];
                    //deleting chosen object from 'dataToBeTiered' array
                newDataToBeTiered=newDataToBeTiered.filter(z=>x.index!==z.index)
                setDataToBeTiered(newDataToBeTiered);
            }
        }
        else
        {
            //if its not there, if we click on next element it will show position of last clicked
            //we dont want that so we will reset ghost
            setGhost();
        }
    }
    return (<>
                <div className={tierStyle.tierListContainer}> 
                    {draggingState?ghost:null}
                    {tiersData.map(x=>                                                                                       
                        <div key={x.index} className={tierStyle.tier} id={x.index} style={{minHeight:`${Math.floor(mainVH/props.tiers.length)}vh`}} /*onMouseOver={()=>console.log(x.index,x.data.length)}*/>
                                <div className={tierStyle.flexComponent} style={{background:x.color,minHeight:`${Math.floor(mainVH/props.tiers.length)}vh`,width:`${Math.floor(mainVH/props.tiers.length)}vh`}}>
                                    <h1 style={{fontSize:x.fontSize, width:`${Math.floor(mainVH/props.tiers.length)}vh`,height:`${Math.floor(mainVH/props.tiers.length)}vh`}}>{x.text}</h1>
                                </div>
                                    {x.data?.length>0&&x.data.map(x=><img  onMouseMove={(e)=>tryToDrag(e,x)} onMouseDown={()=>setDraggingState(true)} onMouseUp={()=>handlePutObject(x)} key={x.index}  className={tierStyle.img} style={x.shadow?{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ,url('${x.src}')`,backgroundSize: "cover", backgroundPosition: "center",backgroundRepeat: "no-repeat",width:`${Math.floor(mainVH/props.tiers.length)}vh`,height:`${Math.floor(mainVH/props.tiers.length)}vh`}:{backgroundImage: `url('${x.src}')`,backgroundSize: "cover", backgroundPosition: "center",backgroundRepeat: "no-repeat",width:`${Math.floor(mainVH/props.tiers.length)}vh`,height:`${Math.floor(mainVH/props.tiers.length)}vh`}}/>)}
                                
                        </div>)}
                    <div className={tierStyle.dataContainer} style={{minHeight:`${Math.floor(mainVH/props.tiers.length)}vh`}}>
                    {dataToBeTiered.map(x=><img onMouseMove={(e)=>tryToDrag(e,x)} onMouseDown={()=>setDraggingState(true)} onMouseUp={()=>handlePutObject(x)} key={x.index} className={tierStyle.img} style={{backgroundImage: `url('${x.src}')`,backgroundSize: "cover", backgroundPosition: "center",backgroundRepeat: "no-repeat",width:`${Math.floor(mainVH/props.tiers.length)}vh`,height:`${Math.floor(mainVH/props.tiers.length)}vh`}}/>)}</div>
                </div>
            </>)
            
        
}
export default TierList;