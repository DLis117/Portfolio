#ifndef BLINK_H
#define BLINK_H

#include <stdint.h>

typedef struct
{
    // volatile uint8_t *ddr; outside of struct not to occupy RAM
    volatile uint8_t *port;
    uint8_t pin;
    uint32_t last_blink_time;
    uint32_t interval;
} Blink;

void blink_init(Blink *b, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin, uint32_t time, uint32_t interval);
void blink_update(Blink *b, uint32_t time);

#endif