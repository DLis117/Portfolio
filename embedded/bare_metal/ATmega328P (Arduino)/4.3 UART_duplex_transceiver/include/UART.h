#ifndef UART_H
#define UART_H

#include <stdint.h>
void UART_init(uint32_t baud);
void UART_send_byte(uint8_t byte);
uint8_t return_received_byte();
#endif