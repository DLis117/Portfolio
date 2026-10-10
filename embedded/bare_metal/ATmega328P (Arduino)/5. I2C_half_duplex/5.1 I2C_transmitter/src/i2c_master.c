
#define I2C_TIMEOUT_MS 10

#include <avr/io.h>
#include "i2c_master.h"
#include "my_millis.h"
#include "led.h"

void i2c_init(void)
{
    // activation of pull up resistors for SCL & SDA
    DDRC &= ~((1 << DDC4) | (1 << DDC5));
    PORTC |= (1 << PORTC4) | (1 << PORTC5);
}

i2c_status i2c_set_SCL_speed(uint8_t twbr, uint8_t prescaler)
{
    // F_SCL = F_CPU/(16+(2*TWBR)* prescaler)
    TWBR = twbr;
    switch (prescaler)
    {
    case 1:
        TWSR = 0; // TWSR1 = 0 TWSR0 = 0
        return I2C_OK;
    case 4:
        TWSR = 1; // TWSR1 = 0 TWSR0 = 1
        return I2C_OK;
    case 16:
        TWSR = 2; // TWSR1 = 1 TWSR0 = 0
        return I2C_OK;
    case 64:
        TWSR = 3; // TWSR1 = 1 TWSR0 = 1
        return I2C_OK;
    default:
        return I2C_PRESCALER_ERROR;
    }
}

i2c_status i2c_start(void)
{
    // set TWINT to start next operation (write one to clear (W1C) flag)
    TWCR = (1 << TWINT) |
           // enable TWI
           (1 << TWEN) |
           // generate start
           (1 << TWSTA);

    uint32_t timestamp = my_millis();
    // wait for start transmition and slave response
    while (!(TWCR & (1 << TWINT)))
    {
        if (my_millis() - timestamp >= I2C_TIMEOUT_MS)
        {
            return I2C_TIMEOUT;
        }
    }

    // check the status of slave response
    // 0xF8 is a mask to check 5 of the most significant bits.
    // 0x08 means start transmitted
    if ((TWSR & 0xF8) != 0x08)
    {
        return I2C_START_ERROR;
    }

    return I2C_OK;
}

i2c_status i2c_stop(void)
{

    // set TWINT to start next operation (write one to clear (W1C) flag)
    TWCR = (1 << TWINT) |
           // enable TWI
           (1 << TWEN) |
           // generate stop
           (1 << TWSTO);

    uint32_t timestamp = my_millis();
    // wait for stop transmition
    while (TWCR & (1 << TWSTO))
    {
        if (my_millis() - timestamp >= I2C_TIMEOUT_MS)
        {
            return I2C_TIMEOUT;
        }
    }

    return I2C_OK;
}

i2c_status connect_to_slave(uint8_t slave_address, char mode)
{
    // slave address is shifted one bit left, because in TWDR it is saved on 7-1 bits.
    // Last bit represents R/W mode.
    switch (mode)
    {
    case 'W':
    case 'w':
        TWDR = (slave_address << 1) | 0;
        break;
    case 'R':
    case 'r':
        TWDR = (slave_address << 1) | 1;
        break;
    default:
        return I2C_CONNECTION_MODE_ERROR;
    }

    // send SLA + W/R
    TWCR = (1 << TWINT) | (1 << TWEN);

    uint32_t timestamp = my_millis();
    // wait for transmition and slave response to stablish a connection
    while (!(TWCR & (1 << TWINT)))
    {
        if (my_millis() - timestamp >= I2C_TIMEOUT_MS)
        {
            return I2C_TIMEOUT;
        }
    }

    // 0x18 SLA + W transmitted, ACK received
    // 0x40 SLA + R transmitted, ACK received

    switch (mode)
    {
    case 'W':
    case 'w':
        if ((TWSR & 0xF8) != 0x18)
        {
            return I2C_CONNECTION_ERROR;
        }
        return I2C_OK;
    case 'R':
    case 'r':
        if ((TWSR & 0xF8) != 0x40)
        {
            return I2C_CONNECTION_ERROR;
        }
        return I2C_OK;
    }

    // SLA + W/R send, ACK received
    // Master is ready to send/receive data.
}

i2c_status transmit_data(uint8_t data)
{
    TWDR = data;

    // transmit data to slave
    TWCR = (1 << TWINT) | (1 << TWEN);

    uint32_t timestamp = my_millis();
    // wait for transmition and slave response
    while (!(TWCR & (1 << TWINT)))
    {
        if (my_millis() - timestamp >= I2C_TIMEOUT_MS)
        {
            return I2C_TIMEOUT;
        }
    }

    if ((TWSR & 0xF8) != 0x28)
    {
        return I2C_TRANSMITTION_ERROR;
    }

    // byte sent, ACK received
    return I2C_OK;
}

i2c_status receive_data(uint8_t *data_ptr)
{
    // receive data from slave response with NACK
    TWCR = (1 << TWINT) |
           (1 << TWEN);

    uint32_t timestamp = my_millis();
    // wait for master's reception and response
    while (!(TWCR & (1 << TWINT)))
    {
        if (my_millis() - timestamp >= I2C_TIMEOUT_MS)
        {
            return I2C_TIMEOUT;
        }
    }

    if ((TWSR & 0xF8) != 0x58)
    {
        return I2C_RECEPTION_ERROR;
    }

    // byte received, NACK sent
    *data_ptr = TWDR;
    return I2C_OK;
}

i2c_status send_data_to_slave(uint8_t data, Led *l_error, uint8_t slave_address)
{

    if (i2c_start())
    {
        if (i2c_stop())
        {
            led_lightup(&l_error);
            return I2C_STOP_ERROR;
        }
        return I2C_START_ERROR;
    }

    if (connect_to_slave(slave_address, 'W'))
    {
        if (i2c_stop())
        {
            led_lightup(&l_error);
            return I2C_STOP_ERROR;
        }
        return I2C_CONNECTION_MODE_ERROR;
    }

    if (transmit_data(data))
    {
        if (i2c_stop())
        {
            led_lightup(&l_error);
            return I2C_STOP_ERROR;
        }
        return I2C_TRANSMITTION_ERROR;
    }

    if (i2c_stop())
    {
        led_lightup(&l_error);
        return I2C_STOP_ERROR;
    }

    return I2C_OK;
}