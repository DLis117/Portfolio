import useLocalStorage from './useLocalStorage';
import style from './ThemedComponent.module.css'
function ThemedComponent()
{
    let [chosenTheme,setChosenTheme]=useLocalStorage('theme','dark');

    function toggleTheme()
    {
        setChosenTheme(chosenTheme==='dark'?'light':'dark');
    }
    return (<>
            <div className={style.darkOrLight} data-theme={chosenTheme}> {/*only the main <tag> needs this*/}
                <div className={style.flexContainer}>
                    <h1 >Hello!</h1>
                    <button onClick={toggleTheme}>switch theme</button>
                </div>
            </div>
            </>)
}
export default ThemedComponent;