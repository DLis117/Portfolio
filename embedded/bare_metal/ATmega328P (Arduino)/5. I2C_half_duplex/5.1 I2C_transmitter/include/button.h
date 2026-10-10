#ifndef BUTTON_H
#define BUTTON_H

#include <stdint.h>

typedef struct
{
    volatile uint8_t *port;
    uint8_t pin;
    uint32_t last_state_change_time;
    uint8_t last_raw_state;
    uint8_t current_raw_state;
    uint8_t current_stable_state;
} Button;

void button_init(Button *b, volatile uint8_t *ddr, volatile uint8_t *port, uint8_t pin);
void update_button_state(Button *b, volatile uint8_t *read_port);
uint8_t get_stable_button_state(Button *b);

#endif