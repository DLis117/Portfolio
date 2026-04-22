![wristwatch demo](/embedded/docs/gifs/ATmega328P_Wristwatch/wristwatch.gif)


This is a complete guide to building a wristwatch based on a standalone ATmega328P microcontroller.

The design was inspired by 1970s LED watches and a steampunk-style project described here:
https://akademiaelektroniki.com/blog/wyswietlacz-7-segmentowy-w-klimatach-steampunku-budujemy-zegarek/


<h3>1. Electronic Components:</h3>

![wristwatch components](/embedded/docs/photos/ATmega328P_Wristwatch/components.jpg)


<b>🧠 Microcontroller</b>  
Since I was already familiar with Arduino, I chose the ATmega328P. It provides enough I/O pins, is reliable for this type of project, and supports the I²C interface required for the RTC module.

<b>🖥️ Display</b>  
To achieve a compact, vintage look similar to 1970s watches, I used an HP QDSP-6064 4-digit, 7-segment LED bubble display. It is small, offers excellent contrast and brightness, and remains clearly readable at around 1 mA per segment.

<b>Ω Resistors</b>  
Because the display uses LEDs, each segment requires current-limiting resistors. To save space, I used two 4-element Y-type resistor arrays (150 Ω each).

<b>⏱️ Real-Time Clock (RTC)</b>   
I selected the DS3231 module. It includes an internal oscillator, making it both space-efficient and highly accurate (unlike, for example, the DS1302). It can also be salvaged from a ready-made module (with two 4.3kΩ pull up resistors and capacitor for proper I²C communication), which I reused in this project.
The DS3231 communicates via I²C and requires only 4 connections.

<b>⚡ Power Supply</b>  
The watch is powered by a LiPo 1S 120 mAh (401230) rechargeable battery. It is compact and provides long battery life (over a year in this setup).

<b>🕹️ Switch</b>  
A 4 mm × 4 mm tactile switch is used to turn the watch on.

<b>🔌 Programming & Charging</b>  
Programming and charging are handled via Dupont pin headers, which serve as both an ISP interface and a charging port.

<b>🛠️ other components for watch assembly:</b>  
- 3M VHB 4910 double-sided acrylic 1mm foam tape
- foam double-sided mounting tape 1cm x 1mm
- 20mm strap 
- super glue
- soldering station

<h3>2. PCB Design (KiCad)</h3>

![wristwatch pcb](/embedded/docs/photos/ATmega328P_Wristwatch/pcbs.png)


After prototyping on a breadboard, I designed a custom PCB using KiCad. The design consists of two 2-layer boards that can be stacked together using pin headers to minimize space.
the bottom board also supports strap attachment.
The final design files were then sent to a PCB manufacturer for production.

[FILES DESCRIPTION]

<h3>3. How the Wristwatch Works</h3>

The battery is connected permanently to the RTC. Since the entire system already runs on a battery, I chose not to use a separate backup battery for power outages, which also helps save space. All other components are powered only while a button is held down, significantly reducing overall power consumption and extending battery life. When powered, the microcontroller reads the current time from the RTC and displays it.

<h3>4. Setting Fuses for Standalone Setup</h3>

<i>The watch board includes support for an external oscillator, which allows the fuse bits to be configured after the PCB assembly.</i>

The ATmega328P used in this project was salvaged from an Arduino Nano.

Since Arduino boards use an external 16 MHz clock, I first burned a bootloader configured for standalone operation (for proper fuse settings) before removing the chip.
This was done via the ISP interface using another Arduino board.

In order to set fuses for standalone configuration I needed to burn a bootloader.

One common way to burn a it onto an AVR microcontroller is by using the ICSP (In-Circuit Serial Programming) interface with another Arduino acting as the programmer.

<b>🔌 4.1. Connections instruction</b>  

![wristwatch connections](/embedded/docs/photos/ATmega328P_Wristwatch/connections.png)

Connect the programmer (master Arduino) to the target (bare MCU) as follows:

Master (Programmer) ->	Slave (Target)  
5V -> 5V  
GND ->	GND  
MISO (D12 on Uno) -> MISO  
MOSI (D11 on Uno) -> MOSI  
SCK (D13 on Uno) ->	SCK  
D10 -> RESET  


<b>🔄 4.2. Prevent Programmer Reset</b>  
Add a 10 µF capacitor between RESET and GND on the programmer (master) board.
This prevents the programmer Arduino from resetting during the process.

<b>📤 4.3. Upload ArduinoISP Sketch</b>  
Before burning the bootloader:

Open Arduino IDE
Go to:  
File → Examples → 11.ArduinoISP → ArduinoISP  
Upload this sketch to the master Arduino

<b>⚙️ 4.4. Configure Arduino IDE for MiniCore Boards</b>  

<h4 style="margin:0">4.4.1. If you don’t have MiniCore:</h4>
- Go to File → Preferences
- Add this URL to Additional Board Manager URLs:
https://mcudude.github.io/MiniCore/package_MCUdude_MiniCore_index.json
- Open Tools → Board → Boards Manager
- Search for MiniCore and install it

<h4 style="margin-bottom:0">4.4.2. Select Board Settings</h4>

![wristwatch minicore_config](/embedded/docs/photos/ATmega328P_Wristwatch/minicore_config.png)

In Tools, configure:

- Board → (e.g., ATmega328)
- Clock → (e.g., 2 MHz internal)
- Variant → e.g., 328P / 328PB
- Bootloader -> No Bootloader
- Baud rate -> default
- Programmer → Arduino as ISP

<b>🔥 4.5. Burn the Bootloader</b>  
Go to Tools → Burn Bootloader  
This will set fuse bits.

<h3>5. Assembly</h3>
Next, the ATmega328P was removed from an Arduino Nano using hot air desoldering.  

![wristwatch components trimmed](/embedded/docs/photos/ATmega328P_Wristwatch/components_trimmed.jpg)


To keep the watch as compact as possible, I trimmed the leads of all through-hole components, including the pin headers and the display. I also sanded down the plastic housings of the female Dupont connectors (used for programming and charging) to make them narrower.

It’s good practice to start with the smallest components, so I began by soldering the SMD parts. First, I soldered the resistor arrays, followed by the ATmega328P and the RTC module along with its supporting components.

Next, I proceeded from top to bottom, which makes soldering with a standard iron more comfortable and precise.

At this stage, I soldered:
- programming header pins,
- display,
- male board-to-board connection pins (on one board only),
- female charging connectors.

![wristwatch soldering](/embedded/docs/photos/ATmega328P_Wristwatch/soldering1.png)


After that, I joined the two PCBs together by soldering the pin headers, effectively stacking them into a compact module. The battery was then connected, as shown in the photos.

I modified the tactile switch by removing two of its legs and soldered it directly into the designated two-pin footprint. To ensure mechanical stability, I secured it with a small amount of super glue.

![wristwatch plexi_cover](/embedded/docs/photos/ATmega328P_Wristwatch/plexi_cover.png)


to cover fragile components as well as give the watch more stylish look, I have ordered a black plexi glass cover. It's dimensions are 3.1 cm x 2.4 cm x 3 mm with the hole in the center of 1.53 cm x 0.8 cm.
It is glued directly to the board with 3M VHB 4910 double-sided acrylic 1 mm foam tape.

To hold the battery in place (so it is not vulnerable to vibrations from everyday use) I also guled it with double-sided acrylic tape.

![wristwatch tape](/embedded/docs/photos/ATmega328P_Wristwatch/tape.png)


The MCU was secured by applying two layers of 10 mm-wide, 1 mm-thick double-sided foam mounting tape. This also helped level the back of the watch, as the battery had made it uneven.

In the final assembly, I added a 20 mm NATO strap, making use of the strap attachment on the bottom board.

<h3>6. Programming</h3>
The watch is programmed the same way as burning the bootloader which was described in already mentioned step, using the ATmega328P in a standalone configuration via the ISP interface.

First, the Arduino as ISP sketch must be uploaded to a master Arduino board, which will act as the programmer. A 10 µF capacitor is then placed between the RESET and GND pins on the Arduino programmer to disable its auto-reset and ensure stable ISP communication.

Once the programmer is ready, the ATmega328P on the watch PCB is connected through the ICSP (ISP) header. After wiring the connections correctly, the firmware can be uploaded directly to the microcontroller.

<h3>7. Code</h3>

<h3>8. Use cases</h3>

<h3>9. Limitations</h3>

- The watch is not water-resistant. Although it features a plexiglass cover and its more fragile components are insulated with tape, it should not be exposed to moisture.

- There is no reverse polarity protection (intentionally omitted to save space and reduce power consumption). Extra care must be taken when connecting or charging the battery to avoid damage.

- Programming the device currently requires uploading the code twice, which is not user-friendly. This could be improved by adding a detection mechanism (e.g., using an additional pin to distinguish between time-setting and normal operation), but this was avoided to keep the design simple and compact. (TODO)

- The watch cannot be used while charging or during programming. Doing so may result in a short circuit and potentially damage the device.


<i>🚀 Apart from that, it is very reliable and performs its function well in everyday use!</i>

![wristwatch finished](/embedded/docs/photos/ATmega328P_Wristwatch/showcase.png)