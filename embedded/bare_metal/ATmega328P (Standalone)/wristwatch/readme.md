![wristwatch demo](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/wristwatch.gif)

This is a complete guide to building a wristwatch based on a standalone ATmega328P microcontroller.

The design was inspired by 1970s LED watches and a steampunk-style project described here:
https://akademiaelektroniki.com/blog/wyswietlacz-7-segmentowy-w-klimatach-steampunku-budujemy-zegarek/

![wristwatch components](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/components.jpg)

### 1. Electronic Components:

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

---

![wristwatch pcb](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/pcbs.png)

### 2. PCB Design (KiCad)

After prototyping on a breadboard, I designed two custom PCBs using KiCad. Both are 2-layer boards that can be stacked together using pin headers to minimize space. The bottom board also supports strap attachment. The final design files were then sent to a PCB manufacturer for production.

you can find the files in <a href="\KiCad PCB Design" style="text-decoration:underline">KiCad PCB Design</a> folder.

---

### 3. How the Wristwatch Works

The battery is connected permanently to the RTC. Since the entire system already runs on a battery, I chose not to use a separate backup battery for power outages, which also helps save space. All other components are powered only while a button is held down, significantly reducing overall power consumption and extending battery life. When powered, the microcontroller reads the current time from the RTC and displays it.

---

### 4. Setting Fuses for Standalone Setup

<i>The watch board includes support for an external oscillator, which allows the fuse bits to be configured after the PCB assembly.</i>

The ATmega328P used in this project was salvaged from an Arduino Nano.

Since Arduino boards use an external 16 MHz clock, I first burned a bootloader configured for standalone operation (for proper fuse settings) before removing the chip.
This was done via the ISP interface using another Arduino board.

In order to set fuses for standalone configuration I needed to burn a bootloader.

One common way to burn a it onto an AVR microcontroller is by using the ICSP (In-Circuit Serial Programming) interface with another Arduino acting as the programmer. 

![wristwatch connections](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/connections.png)

<b>🔌 4.1. Connections instruction</b> 

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

![wristwatch minicore_config](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/minicore_config.png)

<h4 style="margin-bottom:0">4.4.2. Select Board Settings</h4>

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

---

![wristwatch components trimmed](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/components_trimmed.jpg)

### 5. Assembly
Next, the ATmega328P was removed from an Arduino Nano using hot air desoldering.  

To keep the watch as compact as possible, I trimmed the leads of all through-hole components, including the pin headers and the display. I also sanded down the plastic housings of the female Dupont connectors (used for programming and charging) to make them narrower.

It’s good practice to start with the smallest components, so I began by soldering the SMD parts. First, I soldered the resistor arrays, followed by the ATmega328P and the RTC module along with its supporting components.

Next, I proceeded from top to bottom, which makes soldering with a standard iron more comfortable and precise.

At this stage, I soldered:
- programming header pins,
- display,
- male board-to-board connection pins (on one board only),
- female charging connectors.

![wristwatch soldering](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/soldering1.png)


After that, I joined the two PCBs together by soldering the pin headers, effectively stacking them into a compact module. The battery was then connected, as shown in the photos.

I modified the tactile switch by removing two of its legs and soldered it directly into the designated two-pin footprint. To ensure mechanical stability, I secured it with a small amount of super glue.

![wristwatch plexi_cover](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/plexi_cover.png)

to cover fragile components as well as give the watch more stylish look, I have ordered a black plexi glass cover. It's dimensions are 3.1 cm x 2.4 cm x 3 mm with the hole in the center of 1.53 cm x 0.8 cm.
It is glued directly to the board with 3M VHB 4910 double-sided acrylic 1 mm foam tape.

To hold the battery in place (so it is not vulnerable to vibrations from everyday use) I also guled it with double-sided acrylic tape.

![wristwatch tape](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/tape.png)

The MCU was secured by applying two layers of 10 mm-wide, 1 mm-thick double-sided foam mounting tape. This also helped level the back of the watch, as the battery had made it uneven.

In the final assembly, I added a 20 mm NATO strap, making use of the strap attachment on the bottom board.

---

### 6. Programming
The watch is programmed the same way as burning the bootloader which was described in already mentioned step, using the ATmega328P in a standalone configuration via the ISP interface.

First, the Arduino as ISP sketch must be uploaded to a master Arduino board, which will act as the programmer. A 10 µF capacitor is then placed between the RESET and GND pins on the Arduino programmer to disable its auto-reset and ensure stable ISP communication.

Once the programmer is ready, the ATmega328P on the watch PCB is connected through the ICSP (ISP) header. After wiring the connections correctly, the firmware can be uploaded directly to the microcontroller.

---

### 7. Code
The code that needs to be uploaded can be found <a href="src\wristwatch\wristwatch.ino" style="text-decoration:underline">here</a>.  


<b>🔎 7.1. Overview</b>

The firmware is written in bare-metal C++ for ATmega328P, without relying on the full Arduino framework. This was done to achieve:

- Lower memory usage
- Faster execution
- Direct hardware control
- Predictable timing behavior
- CPU Clock Configuration (2 MHz)

This trade-off was chosen to:

- Reduce power consumption significantly
- Maintain sufficient speed for LED multiplexing
- Keep I²C communication stable with the DS3231 RTC

Despite the lower clock speed, the system remains fully responsive due to interrupt-driven design.

<b>🖥️ 7.2. Interrupt-Driven Display Multiplexing</b>

A hardware timer interrupt (TIMER0_COMPA_vect) is used to multiplex the 4-digit 7-segment display every 8 ms.

This approach:

- Prevents flickering and ghosting
- Removes the need for blocking delays
- Allows the CPU to sleep between refresh cycles
- Ensures stable brightness across all digits

Each interrupt activates only one digit at a time while updating the segment data.

<b>🔌 7.3. Direct Port Manipulation (Performance Optimization)</b>

All LED segments are connected to PORTD, allowing fast updates using a single instruction:

PORTD = DIGITS[displays[n]];

This is significantly faster than digitalWrite() calls and reduces CPU overhead.

Benefits:

- Single-cycle port update
- Minimal CPU usage per refresh
- Clean and efficient segment encoding
- Sleep Mode (Power Optimization)

<b>💤 7.4. SLEEP_MODE_IDLE</b>

This mode was chosen because:

The timer interrupt must remain active for display multiplexing
CPU halts between interrupts, reducing power consumption
Peripherals (Timer0, I²C) remain operational

This design ensures the MCU is only active when necessary, significantly improving battery life.

<b>⏱️ 7.5. RTC Communication (I²C Optimization)</b>

The DS3231 RTC is accessed using I²C via the Wire library, but:

It is read only once per ~960 ms (≈1 second)
Controlled using a tick counter (ticks_counter)
Prevents repeated unnecessary reads of the same time value

This avoids constant bus activity and reduces power waste while ensuring accurate time updates.

<b>🚩 7.6. Time Synchronization (EXTRF Reset Flag)</b>

Because the wristwatch has no dedicated reset button, time initialization is handled automatically:

if (MCUSR & (1 << EXTRF))
{  
&nbsp;&nbsp;&nbsp;&nbsp;clock.setDateTime(__ DATE __, __ TIME __);  
}

This means:

When the device is programmed via ISP, the EXTRF flag is triggered
The RTC time is automatically set to compile time
Ensures correct time after firmware upload without manual setup

This makes the system fully self-initializing and reliable after flashing.

<b>💾 7.7. Memory management</b>

To improve performance and reduce memory usage, pointers are used instead of copying entire structures.

RTCDateTime* clock_get_rdt_ptr()
{  
  &nbsp;&nbsp;&nbsp;&nbsp; return &rdt;  
}

Instead of copying the whole RTCDateTime structure, only a pointer to the structure is copied.
This reduces RAM usage and improves execution speed, which is especially important on embedded systems.

---
#### ⚠️ WARNING! ⚠️
In a typical Arduino build system (based on gcc/g++ and dependency tracking), a .cpp file is only recompiled when one of the following changes:

the .cpp source file itself,
any header file included by it,
compiler options or build flags.

Otherwise, the build system reuses the previously generated object file (.o) from the incremental build cache.

This behavior also affects predefined compilation-time macros such as `__TIME__` and `__DATE__`.  

So in case of clock.cpp file containing `__TIME__`, when the clock.cpp has already been compiled once, then subsequent builds will continue using the previously compiled object file as long as the file and its dependencies remain unchanged.

 As a result, the value of `__TIME__` will remain the original compilation time and will not update on every project build.

---

![wristwatch use cases](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/scenarios.png)

### 8. Use cases

<b>🔌 8.1. Programming Mode</b>

In this mode, the watch is connected to an Arduino (via ISP) for firmware upload.

- The microcontroller is powered directly from the Arduino (5V).
- ⚠️ **Important:** Do **NOT** press or hold the button during programming. Doing so can short two power sources together. This may damage the components.

<b>☀️ 8.2. Everyday Use</b>

This is the normal operating mode of the watch:

- The device runs from a single-cell LiPo battery (3.7V).
- The RTC (DS3231S) communicates with the ATmega328P via I²C.
- Pull-up resistors (4.7kΩ) are used for SDA and SCL lines.
- The button is used for normal user interaction.

<b>⚡ 8.3. Charging Mode</b>

In this mode, the battery is charged using a TP4056 module.

- Charging is designed for a **1S LiPo battery (120mAh)**.
- A **20kΩ resistor** is used to set the charging current.
- This results in a safe charging current of approximately **60mA**, which is appropriate for the battery capacity.

⚠️ **Important: Do NOT press or hold the button while charging.**

Pressing the button during charging may:
- Connect multiple power paths simultaneously
- Cause instability or potential hardware damage

<b>🚧 8.4. Design Limitation</b>

The restriction on pressing the button during **programming** and **charging** is intentional.

A more advanced design could include:
- Automatic power path switching (e.g., using a MOSFET)
- Charger detection logic

However:
- This would increase circuit complexity
- It would require additional PCB space

The primary goal of this project was to keep the watch as compact as possible, so these features were intentionally omitted.

#### Summary of Constraints

| Scenario        | Button Allowed | Reason |
|----------------|----------------|--------|
| Programming     | ❌ No          | Risk of shorting Arduino 5V with battery |
| Everyday Use    | ✅ Yes         | Normal operation |
| Charging        | ❌ No          | Risk of power conflict and damage |

---

### 9. Power Consumption

This wristwatch is designed as a duty-cycled system, where high-power components are active only during short user interactions, while the microcontroller and RTC are optimized for ultra-low idle consumption.

<b>⚡ 9.1. Average power consumption scenario</b>

- Battery: 1S LiPo, 120 mAh (3.85 V nominal)
- Always-on component: DS3231 RTC module (~0.16 mA)
- High-power components (MCU + LED display): enabled only when the tactile switch is pressed
- Firmware design: sleep-first with minimal wake-ups and controlled I²C access

#### Active Mode Consumption

LED segments: ~61.65 mA (5 segments lit per digit assumption)
ATmega328P: ~0.30 mA (active execution + interrupts)
DS3231 RTC: ~0.16 mA

Total active current: **~62 mA**

The watch is intended for short interactions: Approx. 30 seconds of active use per day.

##### Duty cycle:

D=86400/30 ≈ 0.000347

##### Average Current Consumption

Taking sleep behavior into account:

Active consumption weighted by duty cycle
Baseline RTC consumption during idle periods

Effective average current: ~0.14 mA

| Mode        | Estimated Runtime |
|----------------|----------------|
| Continuous active use     | ~1.9 hours          |
| Real usage (30 s/day)        | ~35 days          |

##### Summary
The system achieves long battery life by:

Keeping the MCU in sleep mode most of the time
Limiting I²C (RTC) communication frequency
Powering the LED display only during user interaction

This design prioritizes energy efficiency and simplicity, relying on firmware-level optimization rather than additional power management hardware.

---

### 10. Limitations

- The watch is not water-resistant. Although it features a plexiglass cover and its more fragile components are insulated with tape, it should not be exposed to moisture.

- There is no reverse polarity protection (intentionally omitted to save space and reduce power consumption). Extra care must be taken when connecting or charging the battery to avoid damage.

- The watch cannot be used while charging or during programming. Doing so may result in a short circuit and potentially damage the device.

- The design does not utilize the DS3231 INT/SQW (square wave interrupt) pin for timekeeping interrupts. Instead, timing is handled via software polling and a timer-based loop. This was a missed design opportunity during PCB development, as the INT/SQW output could have significantly reduced MCU wake-ups and further improved power efficiency by allowing true hardware-driven periodic interrupts. However, this also means the project has a clear upgrade path and could be improved in future revisions by integrating this pin into the interrupt system for even lower power consumption and cleaner timing architecture.

<i>🚀 Apart from that, it is very reliable and performs its function well in everyday use!</i>

![wristwatch finished](/embedded/docs/ATmega328P%20(Standalone)/wristwatch/showcase.png)