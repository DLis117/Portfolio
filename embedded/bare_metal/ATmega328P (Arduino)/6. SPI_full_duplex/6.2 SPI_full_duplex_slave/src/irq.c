#include <stdint.h>
#include "irq.h"

void irq_init(Irq *i, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin)
{
    *ddr |= (1 << pin);   // IRQ OUTPUT
    *port |= (1 << pin);  // DEFAULT STATE HIGH;

    i->port = port;
    i->pin = pin;
}

void irq_set(Irq *i)
{
    //pull irq low
    *i->port &= ~(1 << i->pin);
}

void irq_reset(Irq *i)
{
    //irq back to high
    *i->port |= (1 << i->pin);
}