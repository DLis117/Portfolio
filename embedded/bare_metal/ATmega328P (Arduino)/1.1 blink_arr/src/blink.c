#include <avr/io.h>
#include "blink.h"

void blink_init(Blink *b, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin, uint32_t time, uint32_t interval)
{
    b->port = port;
    b->pin = pin;
    b->last_blink_time = time;
    b->interval = interval;

    *ddr |= (1 << pin);
}

void blink_update(Blink *b, uint32_t time)
{
    if (time - b->last_blink_time >= b->interval)
    {
        *b->port ^= (1 << b->pin);
        b->last_blink_time = time;
    }
}