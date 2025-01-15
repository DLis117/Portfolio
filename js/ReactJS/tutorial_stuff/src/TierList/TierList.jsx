import tierStyle from '/src/TierList/TierList.module.css'
function TierList(props)
{
    let mainVH=80;
    let dataVH=10;
    let tiersVH=mainVH-dataVH;
    let fontSize=300;

     let tiers=props.tiers.map(x=>(
                                    <div className={tierStyle.tier} style={{background:`${x.color}`,height:`${tiersVH/props.tiers.length}vh`}}>
                                        <div className={tierStyle.flexComponent}>
                                            {/* if length of text is longer than 7 then font size gets negative value and becomes too large */}
                                            <h1 style={{fontSize:x.tier.length<7?`${fontSize-(x.tier.length*30)}%`:'10px'}}>{x.tier}
                                            </h1>
                                        </div>
                                            <div className={tierStyle.dataOfTier}>

                                            </div>
                                    </div>))
    //  console.log(tierNames,tierNames.length);
console.log(tiersVH/props.tiers.length);

    return (<>
                <h1>{props.label}</h1>
                <div className={tierStyle.tierListContainer}>
                    <div className={tierStyle.tiersContainer}>
                        {tiers}
                    </div>
                    <div className={tierStyle.dataContainer}></div>
                </div>
                </>)
}
export default TierList;