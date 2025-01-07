import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import { navBarData } from "/src/App.jsx";
function MenuItem(props) 
{
    let [myData,setMyData]=useState(navBarData);

    function recursiveSearch(x,arr,d) 
    {
        //rekursywnie przejdz po wszystkich
        //wypisz tablice elementow z zaznaczeniem glebokosci
            arr.push({label:x.label,depth:d})
            if(x.children?.length > 0)
            {
                d++;
                for(let child of x.children) 
                { 
                    recursiveSearch(child,arr,d);
                }
            }
        return arr
    }

    function setNewData(x,label,arr) 
    {
        //rekursywnie przejdz po wszystkich
        //wypisz tablice elementow z zaznaczeniem glebokosci
        if(x.label===label)
        {
            x.activated=!x.activated
        }
        arr.push(x)
        if(x.children?.length > 0)
        {
            for(let child of x.children) 
            { 
                setNewData(child,label,arr);
            }
        }
        return arr
    }
    
    // function toggleChildren(label)
    // {
    //     // console.log("looking for : ",label)
    //     let j=0;

    //     for(let x of navBarData)
    //     {
    //         let arr=[];
    //         let depth=0;
    //         // console.log("przeszukuje root: ",x.label)
    //        let results = recursiveSearch(x,arr,depth);
    //         for(let i=0;i<results.length;++i)
    //         {
    //             // console.log("sciezka do labelki:",results[i].label)
    //             if(results[i].label==label&&results[i].father===true)
    //             {
    //                 j=i+1;//should be ok bc if someone is a father then he has at least one child!
    //                 for(;j<results.length;++j)
    //                 {
    //                     if(j!==0&&results[j].depth!==results[i].depth)
    //                     {
    //                         console.log("do schowania: ",results[j].label,results[j])
    //                     }
    //                 }
    //                 return;
    //             }
               
    //         }
            
    //     }
    //     // console.log(xx) // cos nie dziala
    // }

    function toggleChildren(label)
    {
        let childrenToToggle=[]
        let found=false;
        let j=-1;
        for(let x of navBarData)
            {
                let arr=[];
                let depth=0;
                // console.log("przeszukuje root: ",x.label)
               let results = recursiveSearch(x,arr,depth);
               for(let i=0;i<results.length;++i)
               {
                if(!found)
                {
                    if(results[i].label===label)
                        {
                            j=i;
                            found=true;
                        }
                }
                else
                {
                    //znaleziony
                    if(results[j].depth<results[i].depth)
                    {
                        //wylaczaj tylko nizsze zaglebieniem od kliknietego

                        //wiedzac ktore schowac mozemy zmodyfikowac glowna tablice danych:
                        childrenToToggle.push(results[i]);

                        let newNavData =[...navBarData];
                        //this will not work!
                        // newNavData.map((x,y)=>({...x,activated:results[i].label===x.label&&!x.activated}))

                        //we have to change it recursively  :)
                        let combinedData=[]
                        for(let h of newNavData)
                        {
                            
                            let arr=[]
                            let results2= setNewData(h,results[i].label,arr)
                            // console.log("resu:",results2)
                            combinedData.push(results2);
                            setMyData(combinedData)
                        }
                        // console.log("combined: ", combinedData)
                        
                        // let nd=setNewData(newNavData,results[i].label);
                        // console.log(nd);
                        // console.log(newNavData)
                        

                        // console.log("do schowania ",results[i].label)
                    }

                    //ale gdy natrafisz na taki sam lub wiekszy, to koncz, bo to oznacza ze tam jest kolejny ojciec
                    else //if(results[j].depth>=results[i].depth)
                    {
                        if(childrenToToggle.length>0)
                        console.log(childrenToToggle)
                        return;
                    }
                }
                    
               }
               if(found)
               {
                if(childrenToToggle.length>0)
                console.log(childrenToToggle)
                return;
               }
            }
    }
    useEffect(()=>{
        // console.log(navBarData)
    },[myData])
    return (
        // if children are activated ▼
        props.data.activated?(<li>                                                                    {/*this is how we know and we can indicate it is a parent */}
                                <p onClick={()=>toggleChildren(props.data.label)}>{props.data.label}{props.data.children?.length>0?"  ▼":null}</p>
                                {(props.data.children?.length>0)&&<MenuList data={props.data.children}/>}
                            </li>):null
        
    );
}

export default MenuItem;
