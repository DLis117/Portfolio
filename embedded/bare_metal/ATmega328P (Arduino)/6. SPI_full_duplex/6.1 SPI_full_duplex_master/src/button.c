
#include "button.h"
#include "my_millis.h"

#define BUTTON_DEBOUNCE_DURATION_MS 20

void button_init(Button *b, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin)
{
    *ddr &= ~(1 << pin); // button input
    *port |= (1 << pin); // input_pullup, idle state high
    b->port = port;
    b->pin = pin;
    b->last_raw_state = 1;       // idle state high
    b->current_raw_state = 1;    // idle state high
    b->current_stable_state = 1; // idle state high
    b->last_state_change_time = my_millis(); //initialization time
}

void update_button_state(Button *b, volatile uint8_t *read_port)
{
    b->current_raw_state = (*read_port & (1 << b->pin)) ? 1 : 0;
    if (b->current_raw_state != b->last_raw_state)
    {
        b->last_state_change_time = my_millis();
        b->last_raw_state = b->current_raw_state;
    }
}

uint8_t get_stable_button_state(Button *b)
{
    if ((my_millis() - b->last_state_change_time) >= BUTTON_DEBOUNCE_DURATION_MS)
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
