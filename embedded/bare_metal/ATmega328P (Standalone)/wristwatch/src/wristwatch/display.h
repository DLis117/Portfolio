#ifndef DISPLAY_H
#define DISPLAY_H

#include <DS3231.h>
#include <stdint.h>

void display_init();
void set_displays(uint8_t h, uint8_t m, uint8_t s);
void disable_displays();
void light_up_segments(uint8_t segments, uint8_t dot);
void increment_active_display();

#endif