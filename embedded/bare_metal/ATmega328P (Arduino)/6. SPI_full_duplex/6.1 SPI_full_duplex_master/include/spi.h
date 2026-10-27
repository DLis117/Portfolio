#ifndef SPI_H
#define SPI_H

#include <stdint.h>

//master
void spi_init_master(void);
void spi_start_communication(void);
void spi_stop_communication(void);

//slave
void spi_init_slave(void);
void spi_put_dummy_value_into_data_reg(void);

//both
void spi_set_transfer_status(uint8_t x);
uint8_t spi_get_transfer_status(void);
void spi_set_transfer_started_time(void);
uint32_t spi_get_transfer_started_time(void);
void spi_send_data(uint8_t tx_data);
uint8_t spi_get_received_byte(void);

#endif