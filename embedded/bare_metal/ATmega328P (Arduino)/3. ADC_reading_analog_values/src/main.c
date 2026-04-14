#include <avr/io.h>
#include <avr/interrupt.h>
#include "my_millis.h"
#include "ADC.h"

uint32_t last_blink_time = 0;
uint32_t last_button_state_change_time = 0;
uint8_t last_button_state = 1; // IDLE STATE HIGH
uint16_t pot_val;
uint32_t last_pot_time = 0;
uint32_t blink_duration = 0;
const uint8_t BUTTON_DEBOUNCE_DURATION = 5;
const uint16_t MAX_BLINK_DURATION = 3000;
const uint16_t MAX_ADC_VALUE = 1023;

int main()
{
  DDRB |= (1 << PB5);  // RED LED
  DDRB |= (1 << PB3);  // GREEN LED
  DDRB &= ~(1 << PB4); // BUTTON INPUT
  PORTB |= (1 << PB4); // INPUT_PULLLUP IDLE STATE HIGH

  DDRC &= ~(1 << PC3); // POTENTIOMETER INPUT

  my_millis_init();
  ADC_init();

  sei();

  while (1)
  {

    uint32_t time = my_millis();

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

    // ADC based BLINK
    // we will vary BLINK_DURATION based on ADC reading
    pot_val = ADC_read(PC3);

    // ADC value - blink_duration
    // 0         - 1023 ms
    // 512       - 512 ms
    // 1023      - 0 ms

    // however, we will not get perfect readings due to inaccuracies with AVcc, ADC, EMI etc.
    // so when we meet the treshold we will set the edge value
    if (pot_val <= 17)
    {
      pot_val = 0;
    }
    else if (pot_val >= 1010)
    {
      pot_val = 1023;
    }

    // since pot_val is uint16_t value and multiplication can go beyond that we need to cast it to uint32_t
    // otherwise it will cause an overflow
    blink_duration = ((uint32_t)pot_val * MAX_BLINK_DURATION) / MAX_ADC_VALUE;

    if (time - last_blink_time >= blink_duration)
    {
      PORTB ^= (1 << PB5);
      last_blink_time = time;
    }
  }

  return 0;
}