// while (1)
// {
//     _delay_ms(1000);
//     PORTB ^= (1 << PB5);
// }

// delay is blocking code from execution.
// moreover, ATmega328P uses Fast PWM mode, and Arduino changes it to normal mode.
// we could use millis but it's not accurate enough:
// in normal mode counter counts from 0 to 255 which means 256 ticks
// it means that if we want to count 1000ms it does not allow to do so (only 1024ms)

// so we need to create our own millis() function
// to do that, we need 3 things: waveform generator, prescaler and interrupts.
// those 3 are included in my_millis.c file

#include <avr/io.h>
#include <avr/interrupt.h>
#include "my_millis.h"

uint32_t last_blink_time = 0;
const int BLINK_DURATION = 1000;

int main()
{
  DDRB |= (1 << PB5); // RED LED

  my_millis_init();
  sei();

  while (1)
  {
    // BLINK
    uint32_t time = my_millis();

    if (time - last_blink_time >= BLINK_DURATION)
    {
      PORTB ^= (1 << PB5);
      last_blink_time = time;
    }
  }

  return 0;
}
