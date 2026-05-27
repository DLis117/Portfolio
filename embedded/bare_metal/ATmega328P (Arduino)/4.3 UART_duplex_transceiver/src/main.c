#include <avr/io.h>
#include <avr/interrupt.h>
#include "my_millis.h"
#include "UART.h"
#include "button.h"
#include "led.h"

uint32_t time;
Button b_red, b_green;
Led l_red, l_green;
uint8_t received_byte;

int main()
{
  // UART
  UART_init(9600);

  // INTERRUPTS & TIMING
  my_millis_init();
  time = my_millis(); // default value not to get false positive checking for the first time

  // BUTTONS
  button_init(&b_red, &DDRD, &PORTD, PD5, time);
  button_init(&b_green, &DDRD, &PORTD, PD4, time);

  // Rx indicator LEDs
  led_init(&l_red, &DDRD, &PORTD, PD3, time);
  led_init(&l_green, &DDRD, &PORTD, PD2, time);

  while (1)
  {
    time = my_millis();

    // checks if button is pressed
    update_button_state(&b_red, &PIND, time);
    update_button_state(&b_green, &PIND, time);

    // UART SEND
    if ((get_stable_button_state(&b_red, time)) == 0)
    {
      UART_send_byte('R');
    }

    if ((get_stable_button_state(&b_green, time)) == 0)
    {
      UART_send_byte('G');
    }

    // UART RECEIVE
    received_byte = return_received_byte();

    // lights up specific LEDs
    if (received_byte == 'R')
    {
      led_lightup(&l_red, time);
    }
    if (received_byte == 'G')
    {
      led_lightup(&l_green, time);
    }

    // checks if LEDs should be light up
    // turn off if time exceeds LED_LIGHTUP_DURATION
    led_update(&l_red, time);
    led_update(&l_green, time);
  }

  return 0;
}