#include <avr/io.h>
#include <avr/interrupt.h>
#include "my_millis.h"

const uint8_t BUTTON_DEBOUNCE_DURATION = 10;
uint32_t last_button_state_change_time = 0;
uint8_t current_raw_button_state = 1; // IDLE STATE HIGH
uint8_t last_raw_button_state;        // IDLE STATE HIGH
uint8_t current_stable_button_state = 1;      // IDLE STATE HIGH

const uint16_t BLINK_DURATION = 1000;
uint32_t last_blink_time = 0;

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

    // BUTTON & DEBOUNCING
    current_raw_button_state = (PINB & (1 << PB4)) ? 1 : 0;

    // edge detection
    if (current_raw_button_state != last_raw_button_state)
    {
      // change when it happened
      last_button_state_change_time = time;

      // state is only updated when it differs from last
      last_raw_button_state = current_raw_button_state;
    }

    // if we dont detect state changes during debounce duration we assume the state is stable
    if ((time - last_button_state_change_time) >= BUTTON_DEBOUNCE_DURATION)
    {

      // we assume that current state is the opposite of last one
      if (current_stable_button_state != current_raw_button_state)
      {
        current_stable_button_state = current_raw_button_state;
        if (current_stable_button_state == 0)
        {
          // press
          PORTB |= (1 << PB3);
        }
        else if (current_stable_button_state == 1)
        {
          // release
          PORTB &= ~(1 << PB3);
        }
      }
    }
  }

  return 0;
}