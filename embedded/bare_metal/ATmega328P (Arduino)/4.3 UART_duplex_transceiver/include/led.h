#ifndef LED_H
#define LED_H

#include <stdint.h>

typedef struct
{
    volatile uint8_t *port;
    uint8_t pin;
    uint32_t last_lightup_time;
} Led;

void led_init(Led *l, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin, uint32_t last_lightup_time);
void led_lightup(Led *l, uint32_t time);
void led_update(Led *l, uint32_t time);

#endif