import './index.css'
import Content from "./Content/Content"
import AboutMe from "./AboutMe/AboutMe"
import Aspirations from  "./Aspirations/Aspirations"
function App() 
{
    return (<>
                <Content/>
                <AboutMe/>
                {/* <div className='test'>
                    <div className='one'></div>
                    <div className='two'></div>
                </div> */}
                <Aspirations/>
            </>)
}

export default App
