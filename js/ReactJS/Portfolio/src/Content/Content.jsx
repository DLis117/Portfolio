import style from './Content.module.css'
import WelcomePage from '../WelcomePage/WelcomePage';
import AboutMe from '../AboutMe/AboutMe';
import Aspirations from  "../Aspirations/Aspirations";
import RecursiveNavBar from '../RecursiveNavBar/RecursiveNavBar';
import ReactJS from '../Projects/ReactJS/ReactJS';
import Embedded from '../Projects/Embedded/Embedded';
import { useEffect, useState } from 'react';
import React from 'react';
export let navBarData = [
  {
    id: 0,
    label: "Home",
    page: <WelcomePage/>,
    children: []
  },
  {
    id: 1,
    label: "About me",
    children: [
      {
        id: 2,
        label: "Professional Background",
        page: <AboutMe/>,
        children: []
      },
    ]
  },
  {
    id: 3,
    label: "Aspirations",
    page: <Aspirations/>,
    children: []
  },
  {
    id: 4,
    label: "Projects",
    children: [
      {
        id: 5,
        label: "Technologies",
        children: [

          {
              id: 6,
              label: "ReactJS",
              page: <ReactJS/>,
              children:[],
          },
          {
              id: 7,
              label: "Embedded",
              page: <Embedded/>,
              children:[],
          },
          {
              id: 8,
              label: "Arduino",
              page: "TBA",
              children:[],
          },
          {
              id: 9,
              label: "Python",
              page: "TBA",
              children:[],
          },
          {
              id: 10,
              label: "others",
              page: "TBA",
              children:[],
          },
        ]
      },
    ]
  },
  {
      id: 11,
      label: "Contact",
      children: []
  }
];

export let technologiesArray;

function getTechnologiesIndex(d)
{
    if(d.label==="Technologies")
    {
        return d;
    }
    
    if(d.children)
    {
        for (let child of d.children)
        {
            return getTechnologiesIndex(child);
        }
    }
}

for(let d of navBarData)
{
    technologiesArray=getTechnologiesIndex(d)
    if(technologiesArray)
    {
        //if Technologies array found then dont search anymore through other data
        break;
    }
}




export let navBarDataPages=[];
function findNotParentPages(d)
{
    if(d.children)
    {
        for (let child of d.children)
        {
            findNotParentPages(child);
        }
    }
    if(d.children?.length<=0)
    {
        navBarDataPages.push(d);
    }
}
for(let d of navBarData)
{
    findNotParentPages(d)
}


function Content()
{
  let [page, setPage]= useState(navBarDataPages[0].page); //welcome page
  useEffect(()=>{

  },[page])
    return (<>
                {/* <Header/> */}
                <RecursiveNavBar data={navBarData} setPage={setPage}/>
                <div className={style.content}>
                  {/* redirect to pages are made with setPage setter
                    we want button from WelcomePage to be able to redirect to other pages
                    but we cannot add this setter function as a prop in navBarData, because it is set here
                    and it would be undefined if we set it above Content

                    that's why we clone the element with React.cloneElement() function
                    and this way we can give it setter function as props

                    then in WelcomePage.jsx button will simply call the setter and it will pass new page
                    which will set it here
                    */}
                  {React.cloneElement(page, setPage={setPage})}
                </div>
                
            </>)
}
export default Content;