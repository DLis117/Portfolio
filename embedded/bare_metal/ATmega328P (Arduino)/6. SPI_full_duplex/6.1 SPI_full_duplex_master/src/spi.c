
#define SPI_TIMEOUT_MS 10

#include <avr/io.h>
#include "my_millis.h"
#include "spi.h"
#include <avr/interrupt.h>
#include "spi_transfer_status.h"

volatile static uint8_t spi_transfer_sts = TRANSFER_IDLE;
static uint32_t spi_transfer_started_time = 0;

volatile static uint8_t spi_received_byte;

ISR(SPI_STC_vect)
{
    spi_received_byte = SPDR;
    spi_set_transfer_status(TRANSFER_FINISHED);
}

// master

void spi_init_master(void)
{
    // first we define I/O pins
    DDRB |= (1 << DDB5) | (1 << DDB3) | (1 << DDB2); // SCLK, MOSI, CS as output
    DDRB &= ~(1 << DDB4);                            // MISO as INPUT

    PORTB |= (1 << PB2); // IDLE state of CS HIGH

    // then we configure SPI as a master:
    // SPI Enabled
    // Interrupts after transfer enabled
    // MSB first
    // Master mode
    // SPI mode 0
    // 1MHz freq
    SPCR = (1 << SPE) | (1 << SPIE) | (1 << MSTR) | (1 << SPR0);
}

void spi_start_communication(void)
{
    PORTB &= ~(1 << PB2); // CS pulled LOW initiating communication
}

void spi_stop_communication(void)
{
    PORTB |= (1 << PB2); // CS back to IDLE state ending the communication
}

// slave

void spi_init_slave(void)
{

    // first we define I/O pins
    DDRB &= ~((1 << DDB5) | (1 << DDB3) | (1 << DDB2)); // SCLK, MOSI, CS as input
    DDRB |= (1 << DDB4);                                // MISO as output

    // then we configure SPI as a slave:
    // SPI Enabled
    // Interrupts after transfer enabled
    // MSB first
    // Slave mode
    // SPI mode 0
    // freq is set only on master
    SPCR = (1 << SPE) | (1 << SPIE);
}

void spi_put_dummy_value_into_data_reg(void)
{
    SPDR = 0xFF;
}

// both

void spi_set_transfer_status(uint8_t x)
{
    spi_transfer_sts = x;
}

uint8_t spi_get_transfer_status(void)
{
    return spi_transfer_sts;
}

void spi_set_transfer_started_time(void)
{
    spi_transfer_started_time = my_millis();
}

uint32_t spi_get_transfer_started_time(void)
{
    return spi_transfer_started_time;
}

void spi_send_data(uint8_t tx_data)
{
    SPDR = tx_data;
    spi_set_transfer_status(TRANSFER_PENDING);
    spi_set_transfer_started_time();
}

uint8_t spi_get_received_byte(void)
{
    return spi_received_byte;
}