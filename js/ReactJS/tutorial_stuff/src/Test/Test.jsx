import { useEffect, useState } from "react";
import styles from '/src/Test/Test.module.css'
let xdd=[
    {
      id: 1,
      label: "Home",
      url: "/home",
      children: [],
      activated: true
    },
    {
      id: 2,
      label: "About Us",
      url: "/about",
      children: [
        {
          id: 3,
          label: "Our Team",
          url: "/about/team",
          children: [
            {
              id: 4,
              label: "Leadership",
              url: "/about/team/leadership",
              children: [],
              activated: true
            },
            {
              id: 5,
              label: "Staff",
              url: "/about/team/staff",
              children: [],
              activated: true
            },
          ],
          activated: true
        },
        {
          id: 6,
          label: "Our History",
          url: "/about/history",
          children: [],
          activated: true
        },
      ],
      activated: true
    },
    {
      id: 7,
      label: "Services",
      url: "/services",
      children: [
        {
          id: 8,
          label: "Consulting",
          url: "/services/consulting",
          children: [],
          activated: true
        },
        {
          id: 9,
          label: "Implementation",
          url: "/services/implementation",
          children: [
            {
              id: 10,
              label: "Software Development",
              url: "/services/implementation/software-development",
              children: [],
              activated: true
            },
            {
              id: 11,
              label: "System Integration",
              url: "/services/implementation/system-integration",
              children: [],
              activated: true
            },
          ],
          activated: true
        },
      ],
      activated: true
    },
    {
      id: 12,
      label: "Contact",
      url: "/contact",
      children: [
        {
          id: 13,
          label: "Support",
          url: "/contact/support",
          children: [],
          activated: true
        },
        {
          id: 14,
          label: "Sales",
          url: "/contact/sales",
          children: [],
          activated: true
        },
      ],
      activated: true
    },
  ]

  
function Test()
{
    let [navigationData,setNavigationData]=useState(xdd)
    let [x,setX]=useState(5);
    let [y,setY]=useState(-5);
    function doSmth()
    {
        setX(x=>x+1);
        // setY(x);
        setY(x+1)
        console.log("x ",x)
        console.log("y ",y);
    }
    function recursivelyToggleData(c)
    {
       
    //    else
    //    {
        //nie ma dzieci wiec zostaw wlaczony
        let newNavData = navigationData.map((x,y)=>({...x,activated:y!==c.id}))
        setNavigationData(newNavData)
        displayData(newNavData)
    //    }
        if(c.children?.length>0)
        {
             recursivelyToggleData(c.children)
        }
    }

    function toggleElement(x)
    {
        console.log(x.activated)
        if(x.children?.length>0)
        {
            //ma dzieci
            recursivelyToggleData(x.children)
        }
    }

    function displayData(d)
    {
        // let dataToDsiplay=d.map((x,y)=><ul className={styles.navUl} key={y}>{x.label}:{displayData(x.children)}</ul>)
        // let dataToDsiplay=d.map((x,y)=><ul className={styles.navUl} key={y}>{x.label}:{x.children.map((x,y)=><li className={styles.navLi} key={y}>{x.label}{x.children.map((x,y)=><h1 className={styles.navH1} key={y}>{x.label}</h1>)}</li>)}</ul>)

        let dataToDsiplay=<ul className={styles.navUl}>
                                 {d.map((x)=>x.activated==true&&<li onClick={()=>toggleElement(x)} key={x.id}>{x.label}{x.children?.length>0&&displayData(x.children)}</li>)}
                          </ul>

        //this gotta be a pain in the ass

        // for(x of d)
        // {
        //     console.log(x.label)
        //     // dataToDsiplay.push(<p className={styles.navUl}>{x.label}:</p>)
        //     // console.log(x.label);
        //     // let labels=<ul>{x.map((x,y)=><li key={y}>{x.label}:</li>)}</ul>
        //     if(x.children.length!==0)
        //     {
        //         // displayData(x.children)
        //         // displayData(x.children)
        //         console.log(displayData(x.children))
        //     }
        // }
        
        return dataToDsiplay;
        // console.log(d)
    }
    // useEffect (()=>{
    //     displayData(navigationData);
    // })
    return (<>
            <div className={styles.navBar}>
                {displayData(navigationData)}
            </div>
           </>)
}
export default Test;