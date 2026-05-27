
#include <avr/io.h>
#include "button.h"

#define BUTTON_DEBOUNCE_DURATION 20 //ms

void button_init(Button *b, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin, uint32_t last_state_change_time)
{
    *ddr &= ~(1 << pin); // button input
    *port |= (1 << pin); // input_pullup, idle state high
    b->port = port;
    b->pin = pin;
    b->last_raw_state = 1;       // idle state high
    b->current_raw_state = 1;    // idle state high
    b->current_stable_state = 1; // idle state high
    b->last_state_change_time = last_state_change_time;
}

void update_button_state(Button *b, volatile uint8_t *read_port, uint32_t time)
{
    b->current_raw_state = (*read_port & (1 << b->pin)) ? 1 : 0;
    if (b->current_raw_state != b->last_raw_state)
    {
        b->last_state_change_time = time;
        b->last_raw_state = b->current_raw_state;
    }
}

uint8_t get_stable_button_state(Button *b, uint32_t time)
{
    if ((time - b->last_state_change_time) >= BUTTON_DEBOUNCE_DURATION)
    {
        // we assume that current state is the opposite of last one
        if (b->current_stable_state != b->current_raw_state)
        {
            b->current_stable_state = b->current_raw_state;
            return b->current_stable_state;
        }
    }

    // since we only care about button being pressed we do not have to track other events.
    // so if any other event occurs we assume button is not pressed
    return 1;
}
