#include <avr/io.h>
#include <DS3231.h>
#include <util/atomic.h>
#include "config.h"

static const uint8_t DIGITS[10] = {63, 6, 91, 79, 102, 109, 125, 39, 127, 111}; // segments converted to digits for display
static volatile uint8_t displays[4]; // each display will store a single digit

void display_init()
{
    DDRD = 0xFF;                       // display segments driving pins as OUTPUT (A-G + DP)
    DDRC |= ((1 << PC0) | (1 << PC1)); // displays 3 & 4 as OUTPUT
    DDRB |= ((1 << PB0) | (1 << PB1)); // displays 1 & 2 as OUTPUT
}

void set_displays(uint8_t h, uint8_t m, uint8_t s)
{
    ATOMIC_BLOCK(ATOMIC_RESTORESTATE)
    {
        displays[3] = h / 10;
        displays[2] = h % 10;
        displays[1] = m / 10;
        displays[0] = m % 10;
        dot_state = (s & 1) ? 0 : (1 << 7);
    }
}

void disable_displays()
{
    PORTC |= (1 << PC0) | (1 << PC1);
    PORTB |= (1 << PB0) | (1 << PB1);
}

void light_up_segments(uint8_t segments, uint8_t dot)
{
    PORTD = DIGITS[displays[segments]] | dot;
}

void increment_active_display()
{
    active_display = ((active_display + 1) % 4);
}