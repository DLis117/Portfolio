/*
  ATmega328P based wristwatch. source: https://github.com/DLis117/Portfolio/tree/main/embedded/bare_metal/ATmega328P%20(Standalone)/wristwatch

  Programming Procedure:

  1. Upload the "Arduino as ISP" sketch to the Arduino board.
  2. Connect the watch to the programmer while it is powered by its battery.
   - Do NOT press the button during this process.
  3. Place a capacitor between the RST and GND pins on the Arduino.

  Configuration:
  - Board → (e.g., ATmega328)
  - Clock frequency: 2 MHz (verified to operate reliably)
  - Variant → e.g., 328P / 328PB
  - Bootloader -> No Bootloader
  - Baud rate -> default
  - Programmer → Arduino as ISP

  --------------------------------------------------

  Charging Characteristics:
  - Charging current: 60 mA

  if the code uses DS3231 library which can be downloaded from https://github.com/jarzebski/Arduino-DS3231
*/

#include "config.h"
#include <avr/io.h>
#include <Wire.h>
#include <DS3231.h>
#include <avr/interrupt.h>
#include <avr/sleep.h>
#include <util/atomic.h>
#include "ctc_8_ms_interrupt.h"
#include "clock.h"
#include "display.h"
#include "ticks.h"

const uint8_t RTC_REFRESH_TICKS = 120;

void set_time_on_display()
{
  clock_get_date_time();
  RTCDateTime* rdt_ptr = clock_get_rdt_ptr();
  set_displays((*rdt_ptr).hour, (*rdt_ptr).minute, (*rdt_ptr).second);
  reset_ticks_counter();
}

int main()
{
  set_sleep_mode(SLEEP_MODE_IDLE);
  ctc_8ms_interrupt_init();
  clock_init();
  display_init();

  if (MCUSR & (1 << EXTRF)) // if there has been an external reset (which here only happens with ISP programming) then EXTRF flag will be set
  {
    clock_set_date_time();
  }

  //clear all reset indicator flags 
  MCUSR = 0;

  set_time_on_display();

  while (1)
  {
    // to avoid reading the same values multiple times a tick counter is set which limits amount of checks
    if (get_ticks_counter() >= RTC_REFRESH_TICKS) // 120 * 8ms = 960ms (almost second)
    {
      set_time_on_display();
    }
    sleep_mode();
  }
  return 0;
}
