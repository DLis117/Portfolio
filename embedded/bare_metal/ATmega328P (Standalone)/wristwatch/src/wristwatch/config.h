#ifndef CONFIG_H
#define CONFIG_H

#ifndef F_CPU
#define F_CPU 2000000UL
#endif

#include <stdint.h>
#include <DS3231.h>

extern volatile uint8_t dot_state;
extern volatile uint8_t active_display;

#endif