#define F_CPU 16000000
#define I2C_SLAVE_ADDRESS 0x6A

#include <avr/io.h>
#include "button.h"
#include "led.h"
#include "my_millis.h"
#include "i2c_slave.h"

Button b_red, b_green;
Led l_red, l_green, l_error;

int main(void)
{
  // INTERRUPTS & TIMING
  my_millis_init();

  // BUTTONS
  button_init(&b_red, &DDRD, &PORTD, PD7);
  button_init(&b_green, &DDRD, &PORTD, PD6);

  // Tx indicator LEDs
  led_init(&l_red, &DDRD, &PORTD, PD5);
  led_init(&l_green, &DDRD, &PORTD, PD4);

  // error LED
  led_init(&l_error, &DDRD, &PORTD, PD3);

  // I2C configuration
  // pull up resistors activation
  i2c_init();

  i2c_set_slave_address(I2C_SLAVE_ADDRESS);

  // IRQ configuration

  // PD2 as output
  DDRD |= (1 << PD2);
  // idle state HIGH. IRQ on transmitter configured to trigger on LOW
  PORTD |= (1 << PD2);

  while (1)
  {

    // checks if LEDs should be light up
    // turn off if time exceeds LED_LIGHTUP_DURATION
    led_update(&l_red);
    led_update(&l_green);
    led_update(&l_error);

    // checks if button is pressed
    update_button_state(&b_green, &PIND);
    update_button_state(&b_red, &PIND);

    // I2C transmittion
    if ((get_stable_button_state(&b_green)) == 0)
    {
      // pull PD2 LOW to trigger IRQ
      PORTD &= ~(1 << PD2);

      if (connect_to_master())
      {
        led_lightup(&l_error);
        continue;
      }

      if (transmit_data('G'))
      {
        led_lightup(&l_error);
        continue;
      }

      // back to IDLE on IRQ pin only if data has been received by master
      // otherwise pending data might not get processed
      PORTD |= (1 << PD2);
    }

    else if ((get_stable_button_state(&b_red)) == 0)
    {
      // pull PD2 LOW to trigger IRQ
      PORTD &= ~(1 << PD2);

      if (connect_to_master())
      {
        led_lightup(&l_error);
        continue;
      }

      if (transmit_data('R'))
      {
        led_lightup(&l_error);
        continue;
      }

      // back to IDLE on IRQ pin only if data has been received by master
      // otherwise pending data might not get processed
      PORTD |= (1 << PD2);
    }

    // I2C reception
    else
    {
      if (connect_to_master())
      {
        continue;
      }

      uint8_t received_byte;
      if (receive_data(&received_byte))
      {
        led_lightup(&l_error);
        continue;
      }

      if (received_byte == 'G')
      {
        led_lightup(&l_green);
      }
      else if (received_byte == 'R')
      {
        led_lightup(&l_red);
      }
    }
  }

  return 0;
}