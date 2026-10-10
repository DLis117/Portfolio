#define F_CPU 16000000
#define I2C_SLAVE_ADDRESS 0x6A

#include <avr/io.h>
#include <avr/interrupt.h>
#include "button.h"
#include "led.h"
#include "my_millis.h"
#include "i2c_master.h"

Button b_red, b_green;
Led l_red, l_green, l_error;

volatile uint8_t irq = 0;

ISR(INT0_vect)
{
  irq = 1;
}

int main()
{
  // INTERRUPTS & TIMING
  my_millis_init();

  // BUTTONS
  button_init(&b_red, &DDRD, &PORTD, PD7);
  button_init(&b_green, &DDRD, &PORTD, PD6);

  // Rx indicator LEDs
  led_init(&l_red, &DDRD, &PORTD, PD5);
  led_init(&l_green, &DDRD, &PORTD, PD4);

  // error LED
  led_init(&l_error, &DDRD, &PORTD, PD3);

  // IRQ init
  // IRQ activated on FALLING edge
  EICRA |= (1 << ISC01);
  EICRA &= ~(1 << ISC00);

  // INT0 enabled
  EIMSK |= (1 << INT0);

  // input pullup INT0
  DDRD &= ~(1 << PD2);
  PORTD |= (1 << PD2);

  // I2C configuration
  // pull up resistors activation
  i2c_init();

  // 100 KHz SCL
  if (i2c_set_SCL_speed(72, 1))
  {
    led_lightup(&l_error);
    return 1;
  }

  while (1)
  {

    // checks if button is pressed
    update_button_state(&b_red, &PIND);
    update_button_state(&b_green, &PIND);

    // checks if LEDs should be light up
    // turn off if time exceeds LED_LIGHTUP_DURATION
    led_update(&l_red);
    led_update(&l_green);
    led_update(&l_error);

    if (irq)
    {
      irq = 0;

      uint8_t received_byte;

      // I2C reception
      if (i2c_start())
      {
        if (i2c_stop())
        {
          led_lightup(&l_error);
          return 1;
        }
        continue;
      }
      if (connect_to_slave(I2C_SLAVE_ADDRESS, 'R'))
      {
        if (i2c_stop())
        {
          led_lightup(&l_error);
          return 1;
        }
        continue;
      }

      if (receive_data(&received_byte))
      {
        if (i2c_stop())
        {
          led_lightup(&l_error);
          return 1;
        }
        continue;
      }

      if (i2c_stop())
      {
        led_lightup(&l_error);
        return 1;
      }

      if (received_byte == 'R')
      {
        led_lightup(&l_red);
      }
      else if (received_byte == 'G')
      {
        led_lightup(&l_green);
      }
    }

    // I2C transmittion
    else if ((get_stable_button_state(&b_red)) == 0)
    {
      send_data_to_slave('R', &l_error, I2C_SLAVE_ADDRESS);
    }

    else if ((get_stable_button_state(&b_green)) == 0)
    {
      send_data_to_slave('G', &l_error, I2C_SLAVE_ADDRESS);
    }
  }

  return 0;
}
