#ifndef MY_MILLIS_H
#define MY_MILLIS_H

#include <stdint.h>
void my_millis_init();
uint32_t my_millis();
void wait_n_ms(uint8_t n);

#endif