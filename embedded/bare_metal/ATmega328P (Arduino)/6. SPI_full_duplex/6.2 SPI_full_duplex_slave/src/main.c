#define F_CPU 16000000
#define SPI_TRANSFER_TIMEOUT_MS 10

#include <avr/io.h>
#include <avr/interrupt.h>
#include "button.h"
#include "led.h"
#include "my_millis.h"
#include "spi.h"
#include "irq.h"
#include "spi_transfer_status.h"

Button b_red, b_green;
Led l_red, l_green, l_error;
Irq irq;

int main()
{
  // INTERRUPTS & TIMING
  my_millis_init();

  // IRQ configuration
  irq_init(&irq, &DDRD, &PORTD, PD2);

  // SPI Init as Slave
  spi_init_slave();

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
    // checks if button is pressed
    update_button_state(&b_red, &PIND);
    update_button_state(&b_green, &PIND);

    // checks if LEDs should be light up
    // turn off if time exceeds LED_LIGHTUP_DURATION
    led_update(&l_red);
    led_update(&l_green);
    led_update(&l_error);

    // SPI reception
    if (spi_get_transfer_status() == TRANSFER_FINISHED)
    {
      uint8_t spi_recv_byte = spi_get_received_byte();

      if (spi_recv_byte == 'R')
      {
        led_lightup(&l_red);
      }
      else if (spi_recv_byte == 'G')
      {
        led_lightup(&l_green);
      }

      //each time transfer is finished:
      //reset irq, so next button press can be handled
      //put dummy value on data register, so next iteration when master sends data it will not get R or G causing LED lightup on master
      irq_reset(&irq);
      spi_set_transfer_status(TRANSFER_IDLE);
      spi_put_dummy_value_into_data_reg();
    }

    if ((my_millis() - spi_get_transfer_started_time() >= SPI_TRANSFER_TIMEOUT_MS) && spi_get_transfer_status() == TRANSFER_PENDING)
    {
      led_lightup(&l_error);
      spi_set_transfer_status(TRANSFER_IDLE);

      //put dummy value on data register, so next iteration when master sends data it will not get R or G causing LED lightup on master
      spi_put_dummy_value_into_data_reg();
    }

    // SPI transmittion
    if ((get_stable_button_state(&b_red)) == 0 && spi_get_transfer_status() != TRANSFER_PENDING)
    {
      spi_send_data('R');
      irq_set(&irq);
    }

    else if ((get_stable_button_state(&b_green)) == 0 && spi_get_transfer_status() != TRANSFER_PENDING)
    {
      spi_send_data('G');
      irq_set(&irq);
    }
  }

  return 0;
}