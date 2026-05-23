#include <avr/io.h>
#include <avr/interrupt.h>
#include "my_millis.h"
#include "blink.h"

#define LED_ARR_SIZE 3

Blink blink_arr[LED_ARR_SIZE];

int main()
{
  my_millis_init();
  uint32_t time = my_millis();

  blink_init(&blink_arr[0], &DDRB, &PORTB, PB5, time, 500);
  blink_init(&blink_arr[1], &DDRB, &PORTB, PB4, time, 1000);
  blink_init(&blink_arr[2], &DDRB, &PORTB, PB3, time, 2000);

  while (1)
  {
    time = my_millis();

    // BLINK
    for (uint8_t i = 0; i < LED_ARR_SIZE; ++i)
    {
      blink_update(&blink_arr[i], time);
    }
  }

  return 0;
}