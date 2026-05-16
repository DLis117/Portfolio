#ifndef UART_H
#define UART_H

#include <stdint.h>
void UART_init(uint32_t baud);
void UART_echo();
#endif