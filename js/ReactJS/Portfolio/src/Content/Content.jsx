import style from './Content.module.css'
import RecursiveNavBar from '../RecursiveNavBar/RecursiveNavBar';
import ReactJS from '../Projects/ReactJS/ReactJS';
import Embedded from '../Projects/Embedded/Embedded';
import WelcomePage from '../WelcomePage/WelcomePage';
import AboutMe from '../AboutMe/AboutMe';
import Aspirations from '../Aspirations/Aspirations';
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

    export let technologiesArray;
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
    return (<>
                {/* <Header/> */}
                
                <div className={style.content}>
                    <RecursiveNavBar data={navBarData}/>
                </div>
                
            </>)
}
export default Content;