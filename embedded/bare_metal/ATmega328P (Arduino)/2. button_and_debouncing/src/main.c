#include <avr/io.h>
#include <avr/interrupt.h>
#include "my_millis.h"

uint32_t last_blink_time = 0;
uint32_t last_button_state_change_time = 0;
uint8_t last_button_state = 1; // IDLE STATE HIGH
const uint16_t BLINK_DURATION = 1000;
const uint8_t BUTTON_DEBOUNCE_DURATION = 5;

int main()
{
  DDRB |= (1 << PB5);  // RED LED
  DDRB |= (1 << PB3);  // GREEN LED
  DDRB &= ~(1 << PB4); // BUTTON INPUT
  PORTB |= (1 << PB4); // INPUT_PULLLUP IDLE STATE HIGH

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

    // BUTTON
    
    // if (!(PINB & (1 << PB4))) // if button is pressed PIND will read LOW, so we negate to get 1 -> ON, 0 -> OFF
    // {
    //   PORTB |= (1 << PB3);
    // }
    // else
    // {
    //   PORTB &= ~(1 << PB3);
    // }

    // BUTTON WITH DEBOUNCING
    // debouncing can be handled by capacitor or code
    uint8_t current_button_state = (PINB & (1 << PB4)) ? 1 : 0;

    // if button state changed
    if (current_button_state != last_button_state)
    {
      // note when it happened
      last_button_state_change_time = time;

      // note last button state
      last_button_state = current_button_state;
    }

    // we read the state of a button only if button exceeded set debounce time
    if ((time - last_button_state_change_time) > BUTTON_DEBOUNCE_DURATION)
    {
      if (current_button_state == 0)
      {
        PORTB |= (1 << PB3);
      }
      else
      {
        PORTB &= ~(1 << PB3);
      }
    }
  }

  return 0;
}