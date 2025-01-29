import style from "./Aspirations.module.css"
function Aspirations()
{
    return( <>
                <div className={style.AspirationsPage}>
                    <div className={style.AspirationsContainer}>
                        <div className={style.aspirations}>
                            <h1 className={style.quote}>
                                Life is an art of choice. To discover true passion, one must explore different paths. ✨
                            </h1>

                            <h2>
                                That’s why I have decided to take a new direction and become a developer. 
                                <br/><br/>
                                In the future, I aim to combine web and mobile development with embedded systems—building the hardware, programming it, and creating both a mobile app and a website to complement it.
                            </h2>
                        </div>
                    </div>
                </div>
            </>)
}
export default Aspirations;