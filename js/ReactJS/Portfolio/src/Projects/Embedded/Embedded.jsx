import Description from '../ReactJS/Description/Description';
import WristWatch from './Wristwatch/Wristwatch';
import style from './Embedded.module.css'

/* THOSE TWO CODES NEED TO BE FORMATED LIKE THIS! DO NOT MOVE */
let code1 = <pre>
<code className={style.code}>
{`#include <virtuabotixRTC.h> //RTC
virtuabotixRTC myRTC(14,13,12); //RTC connection

void setup()
{
  myRTC.setDS1302Time(0, 37, 15, 2, 31, 10, 2023);
  /* seconds, minutes, hours, day of the week, day of the month, month, year */
}

void loop()
{
  myRTC.updateTime();
}`}
</code>
</pre>

let code2 = <pre>
<code className={style.code}>
{`#include <virtuabotixRTC.h> //RTC
int q=0;                                                //time wristwatch is on
int w=0;                                                //flag to make sure time adjustment happens only once
virtuabotixRTC myRTC(14,13,12);                         //RTC connection
int NUMBERS[10]={63,6,91,79,102,109,125,39,127,111};    //SEGMENTS CONVERTED TO INT FOR DISPLAY

void light_digit(int a)
{
  int x=NUMBERS[a];
  for(int i=0;i<8;++i)
  {
  if(x%2==0)
  {
    digitalWrite(i,1);
  }
  else
  {
    digitalWrite(i,0);
  }
    x/=2;
  }
}

void disptime()
{
  //which displays should be on and off
  digitalWrite(11,1); digitalWrite(10,0); digitalWrite(9,0); digitalWrite(8,0);     

  //digit calculation
  light_digit(myRTC.hours/10);

  delayMicroseconds(80);
  for(int i=0;i<8;++i)
  {
    digitalWrite(i,1);
  }

  digitalWrite(11,0); digitalWrite(10,1); digitalWrite(9,0); digitalWrite(8,0);
  light_digit(myRTC.hours%10);
  delayMicroseconds(80);

  //make animation on ":" by toggling it's segment after specific interval 
  if(q>40&&q<100)
  {
    digitalWrite(7,0);          
  }
  else if(q>100)
  {
    q=0;
  }
  q++;


  for(int i=0;i<8;++i)
  {
    digitalWrite(i,1);
  }

  digitalWrite(11,0); digitalWrite(10,0); digitalWrite(9,1); digitalWrite(8,0);
  light_digit(myRTC.minutes/10);
  delayMicroseconds(80);
  for(int i=0;i<8;++i)
  {
    digitalWrite(i,1);
  }

  digitalWrite(11,0); digitalWrite(10,0); digitalWrite(9,0); digitalWrite(8,1);
  light_digit(myRTC.minutes%10);
  delayMicroseconds(80);
  for(int i=0;i<8;++i)
  {
    digitalWrite(i,1);
  }
}

void setup()
{
  pinMode(0,OUTPUT);//A
  pinMode(1,OUTPUT);//B
  pinMode(2,OUTPUT);//C
  pinMode(3,OUTPUT);//D
  pinMode(4,OUTPUT);//E
  pinMode(5,OUTPUT);//F
  pinMode(6,OUTPUT);//G
  pinMode(7,OUTPUT);//.
  pinMode(8,OUTPUT);//1
  pinMode(9,OUTPUT);//2
  pinMode(10,OUTPUT);//3
  pinMode(11,OUTPUT);//4
}

void loop()
{
  //set time from DS1302 to attiny2313 microcontroller 
  myRTC.updateTime();

  //display time on 7 segment display
  disptime();

  //check if button was hold for more than 10 seconds
  if(millis()>1500&&w==0)
  {
    //set the time to a minute ago
    myRTC.setDS1302Time(myRTC.seconds, myRTC.minutes-1, myRTC.hours, myRTC.dayofweek, myRTC.dayofmonth, myRTC.month, myRTC.year);
    w=1;
  }
}`}
</code>
</pre> 
/* THOSE TWO CODES NEED TO BE FORMATED LIKE THIS! DO NOT MOVE */


let projectsData=   [
                        [//this will be wrapped together
                            [//elements of this project, its title, its description 
                                <>
                                    <WristWatch/>
                                </>,'wristwatch',
                                <div className={style.description}>
                                    <div className={style.descriptionTitle}>Energy-Efficient Wristwatch with Attiny2313 & DS1302</div>
                                    <div className={style.imgDescription}>
                                        <img className={style.img} src='/Wristwatch/wristwatch_assembled.jpg'/>
                                        <p>This wristwatch is designed for low power consumption, displaying the time only when the button is pressed. By limiting power usage, the watch can operate for several years on a single CR2032 battery.</p>
                                    </div>
                                    <br />
                                    <h1>Technical Specifications</h1>
                                    <p>The wristwatch is built using the following components:</p>
                                    <ul>
                                        <li><span>Microcontroller: </span>DIP20 Attiny2313</li>
                                        <li><span>Timekeeping IC: </span>DS1302 real-time clock module</li>
                                        <li><span>Display: </span>3462BS 0.36-inch common anode 7-segment display</li>
                                        <li><span>Power Source: </span>CR2032 battery & battery holder</li>
                                        <li><span>Clock Reference: </span>32.768 kHz quartz crystal</li>
                                        <li><span>Resistors: </span>4 × 100Ω</li>
                                        <li><span>Input Control: </span>Button (for activating time display)</li>
                                        <li><span>Programming Interface: </span> 5-pin female goldpin socket</li>
                                    </ul>
                                    <br />
                                    <h1>Working Principle</h1>
                                    <ul>
                                        <li>The battery is permanently connected to the DS1302 module, ensuring continuous timekeeping.</li>
                                        <li>When the button is pressed, power is supplied to the Attiny2313 microcontroller, which reads the current time from the DS1302 module and displays it on the 7-segment display.</li>
                                        <li>The custom PCB, designed in KiCad, includes a 5-pin programming interface, allowing firmware updates via an Arduino-based programmer.</li>
                                    </ul>
                                    <div className={style.imgDescriptionBig}>
                                        <img className={style.img} src='/Wristwatch/wristwatch_kiCad_red_traces.png'/>
                                        <img className={style.img} src='/Wristwatch/wristwatch_kiCad_blue_traces.png'/>
                                    </div>
                                    <h1>PCB Overview & Features</h1>

                                    <p>The images above display the first and second PCB layer traces designed in KiCad.</p>
                                    
                                    
                                    <br />
                                    <h1>Key PCB Components & Labels:</h1>
                                    <ul>
                                        <li><span>4 mounting holes (labeled MH)</span> for securing the case. These holes are intended for copper rods, with an additional iron layer for easier soldering</li>
                                        <li><span>5-pin female goldpin socket </span>(vertical layout).</li>
                                        <ul>
                                            <li>The slots are labeled "+" (5V input) and 13 - 10. These labels indicate which wristwatch pins should be connected to the corresponding pins on a <span>universal Attiny programming shield</span>.</li>
                                        </ul>
                                    </ul>
                                    <br />
                                    <h1>Assembly Instructions:</h1>
                                    <p>To ensure proper functionality, the components should be soldered in the following order:</p>
                                    <ol>
                                        <li>Resistor Installation:</li>
                                        <p>Solder 4 × 100Ω resistors with the following connections:</p>
                                        <ul>
                                            <li>Pin 14 → D4 of the 7-segment display</li>
                                            <li>Pin 13 → D3 of the 7-segment display</li>
                                            <li>Pin 12 → D2 of the 7-segment display</li>
                                            <li>Pin 11 → D1 of the 7-segment display</li>
                                            <li><span>Trim excess resistor legs after soldering.</span></li>
                                        </ul>
                                        <br />
                                        <li>7-Segment Display</li>
                                        <ul>
                                            <li>Place the 7-segment display on top of the resistors and solder it.</li>
                                            <li>Trim the display’s legs after soldering.</li>
                                        </ul>
                                        <br />
                                        <li>Quartz Crystal</li>
                                        <ul>
                                            <li>Flip the PCB to the back side and solder the 32.768 kHz quartz crystal.</li>
                                            <li>Trim its legs after soldering.</li>
                                        </ul>
                                        <br />
                                        <li>IC Components</li>
                                        <ul>
                                            <li>Solder the DS1302 RTC module.</li>
                                            <li>Solder the Attiny2313 microcontroller.</li>
                                            <li>Solder the female goldpin socket.</li>
                                        </ul>
                                        <br />
                                        <li>Battery Holder</li>
                                        <ul>
                                            <li>Place the battery holder on the back side of the display and solder it.</li>
                                        </ul>
                                        <br />
                                        <li>Button Installation</li>
                                        <ul>
                                            <li>Solder the button and secure it to the goldpin socket.</li>
                                            <li>Cut two unnecessary endings.</li>
                                        </ul>
                                    </ol>
                                    <br />
                                    <p><span>Proper trimming of component legs is crucial for avoiding short circuits.</span></p>
                                    <br />
                                    <h1>Programming Process & Limitations</h1>
                                    <p>Due to memory constraints of the Attiny2313, programming must be done in two steps:</p>
                                    <ul>
                                        <li>First firmware upload: Initializes the DS1302 module and sets the current time.</li>
                                        <li>Second firmware upload: Enables time display functionality on the 7-segment display.</li>
                                    </ul>
                                    <br />
                                    <div className={style.twoCodes}>
                                            <div className={style.codeTitleContainer}>setting time on DS1302</div>
                                            {code1}
                                            <div className={style.codeTitleContainer}>showing time on display</div>
                                            {code2}
                                    </div>
                                    <br /><br />
                                    



                                    <h1>During programming:</h1>
                                    <ul>
                                        <li>The watch must be powered by the battery.</li>
                                        <li>The button must be held to activate the microcontroller for flashing the firmware until second code is uploaded.</li>
                                    </ul>
                                    <br />
                                    <h1>Error Handling & Time Correction</h1>
                                    <p>While the wristwatch is functional, it occasionally runs fast due to timing inaccuracies.</p>
                                    <ul>
                                        <li><span>Hardware Limitation: </span>The Attiny2313 has no available pins for additional adjustment buttons.</li>
                                        <li><span>Software Fix: </span>A self-correcting function detects if the microcontroller has been running for over 10 seconds. If so, it automatically adjusts the time back by one minute once to compensate for any drift.</li>
                                    </ul>
                                </div>
                            ],
                            
                            // [
                            //     <Counter/>,"Counter",
                            //     <div className={style.description}>
                            //         <p>This component demonstrates the use of state variables, the useState hook, and functional updates, along with onClick event handlers for managing user interactions.</p>
                            //         <br/>
                            //         <h1>Key Features</h1>
                            //         <ul>
                            //             <li><span>State Management: </span>Utilizes the useState hook to store and update component state dynamically.</li>
                            //             <li><span>Functional Updates: </span>Implements functional updates to ensure state changes are correctly applied, particularly when relying on previous state values.</li>
                            //             <li><span>Event Handling: </span>Uses onClick event handlers to trigger state updates in response to user interactions.</li>
                            //         </ul>
                            //     </div>
                            // ],
                        ],
                        
                    ];


function Embedded()
{
    return (<>
                <div className={style.EmbeddedProjectsContainer}>
                    {/* if the there is more than one component, and there is resizeable component we want to wrap those in single row
                    to prevent unknown behaviour if it start to overlap next components and move them unintentionally*/}
                    {projectsData.map((x,y)=>
                        <>
                            {/* <div className={style.wrapTogether}> */}
                                {x.map((z,q)=>
                                    // <ProjectWrapper project={z[0]} description={z[1]}/>
                                    <>
                                        <div key={q} className={style.projectWrapper}>
                                            <div className={style.titleOfProjectContainer}>
                                                <h1 className={style.titleOfProject}>{z[1]}</h1>
                                            </div>
                                            <div className={style.project}>
                                                {z[0]}
                                            </div>
                                        </div>
                                        <Description info={projectsData[y][q][2]}/>
                                    </>
                                )}
                            {/* </div> */}
                        </>)}
                </div>
            </>)
}
export default Embedded;
