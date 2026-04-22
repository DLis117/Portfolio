#include <avr/io.h>
#include <avr/interrupt.h>
#include "display.h"
#include "ticks.h"
#include "config.h"

ISR(TIMER0_COMPA_vect)
{
    disable_displays();

    switch (active_display)
    {
    case 3:
        PORTC &= ~(1 << PC0);
        light_up_segments(3, 0);
        break;
    case 2:
        PORTC &= ~(1 << PC1);
        light_up_segments(2, dot_state);
        break;
    case 1:
        PORTB &= ~(1 << PB1);
        light_up_segments(1, 0);
        break;
    case 0:
        PORTB &= ~(1 << PB0);
        light_up_segments(0, 0);
        break;
    }

    increment_active_display();
    increment_ticks_counter();
}