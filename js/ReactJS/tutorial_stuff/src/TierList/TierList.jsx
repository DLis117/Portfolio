import { useEffect, useState } from 'react';
import tierStyle from '/src/TierList/TierList.module.css'
function TierList(props)
{
    let dummyDataToBeTiered=['/public/sunset.png','/public/sunset.png','/public/sunset.png']
    const mainVH=80;                                //viewHeight percentage of all tiers combined
    const dataVH=10;                                //viewHeight percentage of all 'images to be tiered' combined
    const tiersVH=mainVH-dataVH;                    //calculated default single tier height
    const fontSize=300;
    const width=80;
    const imageWidth=5;                             //percentage width of single image (based on single tier width)
    const howManyObjectsPerTierToChangeHeight=20;   //defined number to know when to change the size of single tier

    //ile jest obiektow /20 i wziac calosc

    let [tiersData,setTierData]=useState(                                                                   /* font size will be scaled to fit the tier square*/
        props.tiers.map((x,y)=>({index:y,text:x.tier,color:x.color,height:`${tiersVH/props.tiers.length}vh`,fontSize:`${fontSize/x.tier.length}%`,data:['/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png','/public/sunset.png']}))
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
                        <div className={tierStyle.tier} id={x.index} style={{background:x.color,width:`${width}vw`,height:`${(tiersVH*(Math.floor(x.data.length/howManyObjectsPerTierToChangeHeight)+1))/props.tiers.length}vh`}} onMouseOver={()=>console.log(x.index)}>
                                <div className={tierStyle.flexComponent} style={{width:`${imageWidth}%`,Height:`${tiersVH/props.tiers.length}vh`}}>

                                    {/* if text is bigger, make font smaller and smaller */}
                                    {/* if length of text is longer than 7 then font size gets negative value and becomes too large 
                                        thats why we have to cap it */}
                                    <h1 style={{fontSize:x.fontSize}}>{x.text}</h1>
                                </div>
                                <div className={tierStyle.dataOfTier}>
                                {/* {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)} */}
                                {/* {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)}
                                {dataToBeTiered.map(x=><img key={x.index} src={x.src} className={tierStyle.img} style={{width:`${imageWidth}%`,height:`${tiersVH/props.tiers.length}vh`}}/>)} */}
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