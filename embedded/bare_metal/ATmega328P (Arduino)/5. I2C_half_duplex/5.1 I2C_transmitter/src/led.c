#include <stdint.h>
#include "led.h"
#include "my_millis.h"

#define LED_LIGHTUP_DURATION 500 // ms

void led_init(Led *l, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin)
{
    *ddr |= (1 << pin);   // LED OUTPUT
    *port &= ~(1 << pin); // DEFAULT STATE OFF;

    l->port = port;
    l->pin = pin;
    l->last_lightup_time = my_millis();
}

void led_lightup(Led *l)
{
    l->last_lightup_time = my_millis();
    *l->port |= (1 << l->pin);
}

void led_update(Led *l)
{
    // time is up - then LED off
    if ((my_millis() - l->last_lightup_time) >= LED_LIGHTUP_DURATION)
    {
        *l->port &= ~(1 << l->pin);
    }

    // time is not up after lightup so we light up the LED
    else
    {
        *l->port |= (1 << l->pin);
    }
}