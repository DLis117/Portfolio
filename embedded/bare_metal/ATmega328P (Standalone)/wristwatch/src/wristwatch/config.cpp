#include <stdint.h>
#include <DS3231.h>

volatile uint8_t active_display = 0;
volatile uint8_t dot_state = 0;