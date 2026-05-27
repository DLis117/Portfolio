#include <stdint.h>
#include "led.h"

#define LED_LIGHTUP_DURATION 20 // ms

void led_init(Led *l, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin, uint32_t last_lightup_time)
{
    *ddr |= (1 << pin);   // LED OUTPUT
    *port &= ~(1 << pin); // DEFAULT STATE OFF;

    l->port = port;
    l->pin = pin;
    l->last_lightup_time = last_lightup_time;
}

void led_lightup(Led *l, uint32_t time)
{
    l->last_lightup_time = time;
}

void led_update(Led *l, uint32_t time)
{
    // time is up - then LED off
    if ((time - l->last_lightup_time) >= LED_LIGHTUP_DURATION)
    {
        *l->port &= ~(1 << l->pin);
    }

    // time is not up after lightup so we light up the LED
    else
    {
        *l->port |= (1 << l->pin);
    }
}