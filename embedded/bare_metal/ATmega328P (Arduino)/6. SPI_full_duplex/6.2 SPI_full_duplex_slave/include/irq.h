#ifndef IRQ_H
#define IRQ_H

#include <stdint.h>

typedef struct
{
    volatile uint8_t *port;
    uint8_t pin;
} Irq;

void irq_init(Irq *i, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin);
void irq_set(Irq *i);
void irq_reset(Irq *i);

#endif