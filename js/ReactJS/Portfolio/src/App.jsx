import './index.css'
import Content from "./Content/Content"
import Header from './Header/Header'
import RecursiveNavBar from './RecursiveNavBar/RecursiveNavBar'
function App() 
{
    let navBarData = [
        {
          id: 1,
          label: "Home",
          url: "/home",
          children: []
        },
        {
          id: 2,
          label: "About me",
          url: "/about",
          children: [
            {
              id: 3,
              label: "Professional Background",
              url: "/about/team",
              children: []
            },
          ]
        },
        {
          id: 4,
          label: "Aspirations",
          url: "/services",
          children: []
        },
        {
          id: 5,
          label: "Projects",
          url: "/contact",
          children: [
            {
              id: 6,
              label: "Technologies",
              url: "/contact/support",
              children: [

                {
                    id: 7,
                    label: "ReactJS",
                    url: "/contact/support",
                    children:[],
                },
                {
                    id: 8,
                    label: "java",
                    url: "/contact/support",
                    children:[],
                },
                {
                    id: 9,
                    label: "Arduino",
                    url: "/contact/support",
                    children:[],
                },
                {
                    id: 10,
                    label: "Python",
                    url: "/contact/support",
                    children:[],
                },
                {
                    id: 11,
                    label: "others",
                    url: "/contact/support",
                    children:[],
                },
              ]
            },
          ]
        },
        {
            id: 7,
            label: "Contact",
            url: "/contact/sales",
            children: []
        }
      ];
    return (<>
                {/* <Header/> */}
                <RecursiveNavBar data={navBarData}/>
                <Content/>
                
            </>)
}

export default App
