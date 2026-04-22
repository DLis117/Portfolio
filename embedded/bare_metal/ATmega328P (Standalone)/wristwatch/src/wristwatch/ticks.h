#ifndef TICKS_H
#define TICKS_H

#include <stdint.h>

uint16_t get_ticks_counter();
void increment_ticks_counter();
void reset_ticks_counter();

#endif