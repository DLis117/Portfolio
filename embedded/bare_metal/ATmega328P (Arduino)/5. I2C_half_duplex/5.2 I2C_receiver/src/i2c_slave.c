#define I2C_TIMEOUT_MS 10

#include <avr/io.h>
#include "i2c_slave.h"
#include "my_millis.h"
#include "i2c_status.h"

void i2c_init(void)
{
    //activation of pull up resistors for SCL & SDA
    DDRC &= ~((1 << DDC4) | (1 << DDC5));
    PORTC |= (1 << PORTC4) | (1 << PORTC5);
}

void i2c_set_slave_address(uint8_t address)
{
    TWAR = (address << 1); // 7 bit address
}

i2c_status connect_to_master(void)
{
    TWCR = (1 << TWINT) |
           (1 << TWEN) |
           // allow sending ACK
           (1 << TWEA);

    uint32_t timestamp = my_millis();
    // wait for start reception and slave response
    while (!(TWCR & (1 << TWINT)))
    {
        if (my_millis() - timestamp >= I2C_TIMEOUT_MS)
        {
            return I2C_TIMEOUT;
        }
    }

    // 0x60 means SLA + W received ACK returned
    // 0xA8 means SLA + R received ACK returned

    if (((TWSR & 0xF8) != 0x60) && ((TWSR & 0xF8) != 0xA8))
    {
        return I2C_CONNECTION_ERROR;
    }

    return I2C_OK;
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

    // 0xC0 means byte sent, NACK returned
    // (Master will return NACK to indicate byte received, no more data transmittion needed)
    if ((TWSR & 0xF8) != 0xC0)
    {
        return I2C_TRANSMITTION_ERROR;
    }

    // byte sent, NACK received
    return I2C_OK;
}

i2c_status receive_data(uint8_t *data_ptr)
{
    // receive data from slave
    TWCR = (1 << TWINT) |
           (1 << TWEN) |
           // allow ACK to be transmitted
           (1 << TWEA);

    uint32_t timestamp = my_millis();
    // wait for master's reception and response
    while (!(TWCR & (1 << TWINT)))
    {
        if (my_millis() - timestamp >= I2C_TIMEOUT_MS)
        {
            return I2C_TIMEOUT;
        }
    }

    if ((TWSR & 0xF8) != 0x80)
    {
        return I2C_RECEPTION_ERROR;
    }

    // byte received, ACK returned
    *data_ptr = TWDR;
    return I2C_OK;
}