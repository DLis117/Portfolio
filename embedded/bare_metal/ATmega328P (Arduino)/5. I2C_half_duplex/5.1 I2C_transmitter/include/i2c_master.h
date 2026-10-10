#ifndef i2C_MASTER_H
#define i2C_MASTER_H

#include <stdint.h>
#include "i2c_status.h"
#include "led.h"

void i2c_init(void);
i2c_status i2c_set_SCL_speed(uint8_t twbr, uint8_t prescaler);
i2c_status i2c_start(void);
i2c_status i2c_stop(void);
i2c_status connect_to_slave(uint8_t slave_address, char mode);
i2c_status transmit_data(uint8_t data);
i2c_status receive_data(uint8_t* data_ptr);
i2c_status send_data_to_slave(uint8_t data, Led *l_error, uint8_t slave_address);

#endif