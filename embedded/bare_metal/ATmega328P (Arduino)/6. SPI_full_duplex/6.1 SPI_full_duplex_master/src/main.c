#define F_CPU 16000000
#define SPI_TRANSFER_TIMEOUT_MS 10

#include <avr/io.h>
#include <avr/interrupt.h>
#include "button.h"
#include "led.h"
#include "my_millis.h"
#include "spi.h"
#include "spi_transfer_status.h"

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

  // IRQ init
  // IRQ activated on FALLING edge
  EICRA |= (1 << ISC01);
  EICRA &= ~(1 << ISC00);

  // INT0 enabled
  EIMSK |= (1 << INT0);

  // input pullup INT0
  DDRD &= ~(1 << PD2);
  PORTD |= (1 << PD2);

  // SPI init as Master
  spi_init_master();

  // BUTTONS
  button_init(&b_red, &DDRD, &PORTD, PD7);
  button_init(&b_green, &DDRD, &PORTD, PD6);

  // Rx indicator LEDs
  led_init(&l_red, &DDRD, &PORTD, PD5);
  led_init(&l_green, &DDRD, &PORTD, PD4);

  // error LED
  led_init(&l_error, &DDRD, &PORTD, PD3);

  while (1)
  {

    if ((my_millis() - spi_get_transfer_started_time() >= SPI_TRANSFER_TIMEOUT_MS) && spi_get_transfer_status() == TRANSFER_PENDING)
    {
      led_lightup(&l_error);
      spi_set_transfer_status(TRANSFER_IDLE);
      spi_stop_communication();
    }

    // checks if button is pressed
    update_button_state(&b_red, &PIND);
    update_button_state(&b_green, &PIND);

    // checks if LEDs should be light up
    // turn off if time exceeds LED_LIGHTUP_DURATION
    led_update(&l_red);
    led_update(&l_green);
    led_update(&l_error);

    if (irq && spi_get_transfer_status() != TRANSFER_PENDING)
    {
      irq = 0;

      // SPI reception

      // start transfer
      spi_start_communication();
      spi_send_data(0xFF);
      spi_set_transfer_status(TRANSFER_PENDING);
      spi_set_transfer_started_time();
    }


    if (spi_get_transfer_status() == TRANSFER_FINISHED)
    {
      uint8_t recv_byte = spi_get_received_byte();

      if (recv_byte == 'R')
      {
        led_lightup(&l_red);
      }
      else if (recv_byte == 'G')
      {
        led_lightup(&l_green);
      }
      spi_stop_communication();
      spi_set_transfer_status(TRANSFER_IDLE);
    }

    // SPI transmittion
    if ((get_stable_button_state(&b_red)) == 0 && spi_get_transfer_status() != TRANSFER_PENDING)
    {
      spi_start_communication();
      spi_send_data('R');
    }

    else if ((get_stable_button_state(&b_green)) == 0 && spi_get_transfer_status() != TRANSFER_PENDING)
    {
      spi_start_communication();
      spi_send_data('G');
    }
  }

  return 0;
}