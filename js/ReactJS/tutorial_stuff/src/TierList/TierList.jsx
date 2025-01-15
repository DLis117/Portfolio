import { useEffect, useState } from 'react';
import tierStyle from '/src/TierList/TierList.module.css'
function TierList(props)
{
    let dummyDataToBeTiered=['/public/sunset.png','/public/sunset.png','/public/sunset.png']
    let mainVH=80;
    let dataVH=10;
    let tiersVH=mainVH-dataVH;
    let fontSize=300;
    let width=80;
    let imageWidth=5;

    let [tiersData,setTierData]=useState(                                                                   /* font size will be scaled to fit the tier square*/
        props.tiers.map((x,y)=>({index:y,text:x.tier,color:x.color,height:`${tiersVH/props.tiers.length}vh`,fontSize:`${fontSize/x.tier.length}%`,data:[]}))
    )


    // let [dataToBeTiered,setDataToBeTiered]=useState(props.imagesData.map((x,y)=>({index:y,src:x})));
    let [dataToBeTiered,setDataToBeTiered]=useState(dummyDataToBeTiered.map((x,y)=>({index:y,src:x})));
    


    
    useEffect(()=>{
    },[])
    // for (let x of );
    //  console.log(tierNames,tierNames.length);
    // console.log(tierFrames);

    return (<>
                <h1>{props.label}</h1>
                <div className={tierStyle.tierListContainer}>
                    {tiersData.map(x=>
                    // height:x.height
                        <div className={tierStyle.tier} id={x.index} style={{background:x.color,width:`${width}vw`}} onMouseOver={()=>console.log(x.index)}>
                                <div className={tierStyle.flexComponent} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}>

                                    {/* if text is bigger, make font smaller and smaller */}
                                    {/* if length of text is longer than 7 then font size gets negative value and becomes too large 
                                        thats why we have to cap it */}
                                    <h1 style={{fontSize:x.fontSize}}>{x.text}</h1>
                                </div>
                                <div className={tierStyle.dataOfTier}>
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                
                                </div>
                        </div>)}
                    <div className={tierStyle.dataContainer}>
                        {/* <img src='/public/sunset.png' className={tierStyle.img} style={{width:imageWidth}}/> */}
                        
                        {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                    </div>
                </div>
            </>)
}
export default TierList;



// tier
// {
//     index: 0,
//     text: 'a',
//     color: '#ffffff',
//     height: 12 //vh to bedzie ulegalo zmianie a na poczatku zostanie wyliczone na podstawie ilosci tierow
//     //top i bottom bedzie znany jak dasz onmousemove na danym komponencie
        // data=[] //tu beda obrazki
// }

//na podstawie tego ile jest tierow ustalimy min height
//ale damy inline-block zeby mogl sie powiekszac

//w srodku text + miejsce na dane
//text odpowiednio bedzie sie zmniejszal zeby sie zmiescic w ramce
// dane inline block? ale raczej o min height =100% width = 90% (w zaleznosci ile text bedzie zajmowal)
//dane inline block zeby dalo sie je wrzucic i zeby sie powiekszaly