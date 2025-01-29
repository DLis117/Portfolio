import style from "./AboutMe.module.css"
function AboutMe()
{
    let responsibilities = [
        "Building, configuring, and maintaining development environments,",
        "Preparing toolchains for proper environment usage,",
        "Configuring connections between source and target systems,",
        "Analyzing data,",
        "Handling code integration,",
        "Deploying hotfixes,",
        "Supervising trial and live data migration to a cloud-based system,",
        "Using internal tools to develop, test, and maintain client applications,",
        "Writing scripts to automate processes."
    ];

    let technologies = [
        { title: "Programming & Scripting", technologies: ["Python, ", "Bash"] },
        { title: "Operating Systems", technologies: ["Unix"] },
        { title: "CI/CD & Deployment Tools", technologies: ["TeamCity, ", "Git, ", "UrbanCode Deploy"] },
        { title: "Data & Workflow Management", technologies: ["Ab Initio GDE, ", "Automic Software, ", "Control-M"] },
        { title: "Cloud Services", technologies: ["AWS"] },
        { title: "Other Tools", technologies: ["Excel, ", "VS Code"] }
    ];
    
    return( <>
                <div className={style.aboutMePage}>
                    <h1>
                        <img src={'https://avatars.githubusercontent.com/u/83869800?v=4'}/>
                        I am a Business & Technology Delivery Analyst at a global multinational professional services company with over 700,000 employees worldwide.
                        <br/><br/>
                        Since 2022, I have worked for a leading bank in Germany and one of the largest supermarket chains in the UK as a member of a DevOps team.
                    </h1>
                    <div className={style.textHolder}>
                        <div>
                            <p>My responsibilities include:</p>
                            <ul>{responsibilities.map(x=><li>{x}</li>)}</ul>
                        </div>
                        <div>
                            <p>Technologies I have used:</p>
                            <ul>{technologies.map(x=><li>{x.title} : {x.technologies.map(z=><span>{z}</span>)}</li>)}</ul>
                        </div>
                    </div>
                    <h2 className={style.footer}>Besides that, I have a Bachelor’s degree in Computer Science</h2>
                </div>
            </>)
}
export default AboutMe;