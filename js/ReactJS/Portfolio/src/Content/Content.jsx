import style from './Content.module.css'
import WelcomePage from '../WelcomePage/WelcomePage';
import AboutMe from '../AboutMe/AboutMe';
import Aspirations from  "../Aspirations/Aspirations";
import Projects from '../Projects/Projects';
import RecursiveNavBar from '../RecursiveNavBar/RecursiveNavBar';
export let navBarData = [
    {
      id: 1,
      label: "Home",
      children: []
    },
    {
      id: 2,
      label: "About me",
      children: [
        {
          id: 3,
          label: "Professional Background",
          children: []
        },
      ]
    },
    {
      id: 4,
      label: "Aspirations",
      children: []
    },
    {
      id: 5,
      label: "Projects",
      children: [
        {
          id: 6,
          label: "Technologies",
          children: [

            {
                id: 7,
                label: "ReactJS",
                children:[],
            },
            {
                id: 8,
                label: "java",
                children:[],
            },
            {
                id: 9,
                label: "Arduino",
                children:[],
            },
            {
                id: 10,
                label: "Python",
                children:[],
            },
            {
                id: 11,
                label: "others",
                children:[],
            },
          ]
        },
      ]
    },
    {
        id: 7,
        label: "Contact",
        children: []
    }
  ];


function Content()
{
    return (<>
                {/* <Header/> */}
                <RecursiveNavBar data={navBarData}/>
                <div className={style.content}>
                    {/* <WelcomePage/> */}
                    {/* <AboutMe/> */}
                    {/* <Aspirations/> */}
                    <Projects/>
                </div>
                
            </>)
}
export default Content;