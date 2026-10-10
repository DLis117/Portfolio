#ifndef i2C_SLAVE_H
#define i2C_SLAVE_H

#include <stdint.h>
#include "i2c_status.h"

void i2c_init(void);
void i2c_set_slave_address(uint8_t address);
i2c_status connect_to_master(void);
i2c_status transmit_data(uint8_t data);
i2c_status receive_data(uint8_t *data_ptr);


#endif